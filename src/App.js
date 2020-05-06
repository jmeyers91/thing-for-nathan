import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import debounce from "lodash/debounce";
import { FaTrash, FaDice, FaUserPlus, FaMoon } from "react-icons/fa";
import SA from "sweetalert2";
import nanoid from "nanoid";
import Column from "./components/Column";
import Row from "./components/Row";
import BlockButton from "./components/BlockButton";
import roles, { roleOrder } from "./roles";
import PlayerListItem from "./components/PlayerListItem";
import getAlignmentColor from "./utils/getAlignmentColor";
import getRandomRoles from "./utils/getRandomRoles";

const localStorageKey = "WEREWOLF_STATE";
const initialState = loadInitialState();

function loadInitialState() {
  const initialStateString = localStorage.getItem(localStorageKey);
  let initialState = { players: [] };

  try {
    Object.assign(initialState, JSON.parse(initialStateString));
  } catch (error) {
    console.error("Failed to load state", error);
  }

  for (const player of initialState.players) {
    if (player.role) {
      player.role = roles.find((other) => other.id === player.role.id);
    }
  }

  return initialState;
}

function saveState(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

const debouncedSaveState = debounce(saveState, 500);

export default function App() {
  const [players, setPlayers] = useState(initialState.players || []);
  const [changed, setChanged] = useState(false);
  const [helpRole, setHelpRole] = useState(null);
  const [showNightHelper, setShowNightHelper] = useState(false);

  const helpDrawerOpen = !!helpRole || showNightHelper;
  const canUseNightHelper =
    players.length > 0 &&
    players.every((player) => {
      return !!(player.role && player.name.length > 0);
    });

  useEffect(() => {
    debouncedSaveState({ players });
  }, [players]);

  async function handleResetClick() {
    const confirmResult = await SA.fire({
      title: "Are you sure?",
      text: "This will delete all players.",
      showCancelButton: true,
    });

    if (confirmResult.value) {
      setPlayers([]);
      setChanged(false);
    }
  }

  async function handleRandomizeClick() {
    if (changed) {
      const confirmResult = await SA.fire({
        title: "Are you sure?",
        text: "This will clear all your changes.",
        showCancelButton: true,
      });
      if (!confirmResult.value) {
        return;
      }
    }

    const playerRoles = getRandomRoles(players.length);
    const newPlayers = players.map((player, i) => ({
      ...player,
      role: playerRoles[i],
      dead: false,
      statuses: [],
    }));

    setPlayers(newPlayers);
    setChanged(false);
  }

  function handleAddUserClick() {
    setPlayers([
      ...players,
      {
        id: nanoid(),
        name: "",
        role: null,
        statuses: [],
        dead: false,
      },
    ]);
  }

  function handlePlayerChange(player) {
    setChanged(true);
    setPlayers(
      players.map((other) => (other.id === player.id ? player : other))
    );
  }

  async function handlePlayerDelete(player) {
    if (!changed) {
      setChanged(true);
    }
    const confirmResult = await SA.fire({
      title: "Are you sure?",
      text: `Delete player ${player.name}?`,
      showCancelButton: true,
    });
    if (!confirmResult.value) {
      return;
    }
    setPlayers(players.filter((other) => other.id !== player.id));
  }

  function handleNightClick() {
    setShowNightHelper(true);
  }

  function handleViewRoleClick(player) {
    setHelpRole(player.role);
  }

  function closeHelpDrawer() {
    setHelpRole(null);
    setShowNightHelper(false);
  }

  function renderHelpDrawer() {
    if (!helpDrawerOpen) return <HelpDrawer open={false} />;

    if (helpRole) {
      return (
        <HelpDrawer open>
          <HelpDrawerCloseButton onClick={closeHelpDrawer}>
            {"\u00D7"}
          </HelpDrawerCloseButton>
          <RoleHelp role={helpRole} />
        </HelpDrawer>
      );
    }

    if (showNightHelper) {
      return (
        <HelpDrawer open>
          <HelpDrawerCloseButton onClick={closeHelpDrawer}>
            {"\u00D7"}
          </HelpDrawerCloseButton>
          <NightHelperDrawer players={players} onClose={closeHelpDrawer} />
        </HelpDrawer>
      );
    }
  }

  return (
    <Root>
      {renderHelpDrawer()}
      {helpDrawerOpen && <HelpDrawerOverlay onClick={closeHelpDrawer} />}
      <Header>
        <BlockButton onClick={handleResetClick}>
          <FaTrash size={36} />
        </BlockButton>
        <BlockButton onClick={handleRandomizeClick}>
          <FaDice size={40} />
        </BlockButton>
        <BlockButton onClick={handleAddUserClick}>
          <FaUserPlus size={40} />
        </BlockButton>
        <BlockButton disabled={!canUseNightHelper} onClick={handleNightClick}>
          <FaMoon size={36} />
        </BlockButton>
      </Header>
      <Content>
        {players.map((player) => (
          <PlayerListItem
            key={player.id}
            player={player}
            onPlayerChange={handlePlayerChange}
            onPlayerDelete={handlePlayerDelete}
            onRoleClick={handleViewRoleClick}
          />
        ))}
      </Content>
    </Root>
  );
}

const Root = styled(Column)`
  height: 100vh;
  background-color: #333;
  color: white;
  overflow: hidden;
`;

const Header = styled(Row)`
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  ${BlockButton} {
    padding-top: 15px;
    padding-bottom: 15px;
    flex: 1;
  }
`;

const Content = styled(Column)`
  flex: 1;
  overflow: auto;
  padding: 20px 0 20px 0;
`;

const HelpDrawer = styled(Column)`
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 20px 0 20px;
  height: 100vh;
  overflow: auto;
  width: 80vw;
  max-width: 450px;
  background-color: #333;
  box-shadow: 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 3;
  transition: transform 0.4s;
  transform: ${(props) =>
    props.open ? `translate(0, 0)` : `translate(-100%, 0)`};

  h1 {
    text-align: center;
  }
`;

const HelpDrawerOverlay = styled("div")`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.3);
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  cursor: pointer;
  animation-name: ${keyframes`
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  `};
`;

const HelpDrawerCloseButton = styled(BlockButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0;
  width: 30px;
  height: 30px;
  font-size: 32px;
  line-height: 30px;
`;

const DarkBlockButton = styled(BlockButton)`
  background-color: ${(props) => (props.highlighted ? "#559" : "#555")};
  transition: background-color 0.2s;
  padding-top: 10px;
  padding-bottom: 10px;

  &:active {
    background-color: #222;
  }
`;

function NightHelperDrawer({ players, onClose }) {
  const [playerIndex, setPlayerIndex] = useState(0);
  const sortedPlayers = players
    .filter((player) => !player.dead && roleOrder.includes(player.role))
    .sort(sortPlayersByRoleOrder);
  const player = sortedPlayers[playerIndex];
  const isLastPlayer = playerIndex >= sortedPlayers.length - 1;

  function handleNextClick() {
    setPlayerIndex(playerIndex + 1);
  }

  return (
    <React.Fragment>
      {player && <h1 style={{ paddingTop: 10 }}>Wake up {player.name}</h1>}
      {player && player.role && <RoleHelp role={player.role} />}
      <div style={{ flex: 1 }} />
      <DarkBlockButton
        onClick={isLastPlayer ? onClose : handleNextClick}
        highlighted={isLastPlayer}
        style={{ marginBottom: 50 }}
      >
        {isLastPlayer ? "End Night" : "Next Player"}
      </DarkBlockButton>
    </React.Fragment>
  );
}

function RoleHelp({ role, hideName }) {
  return (
    <React.Fragment>
      {hideName ? "" : <h1 style={{ color: role.lightColor }}>{role.name}</h1>}
      <h2>Alignment</h2>
      <p style={{ color: getAlignmentColor(role.alignment) }}>
        {role.alignment}
      </p>
      <h2>Ability</h2>
      <p>{role.ability}</p>
      <h2>Example</h2>
      <p>{role.example}</p>
    </React.Fragment>
  );
}

function sortPlayersByRoleOrder(a, b) {
  return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
}
