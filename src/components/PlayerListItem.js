import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa';
import Column from './Column';
import Row from './Row';
import roles from '../roles';
import BlockButton from './BlockButton';
import getRoleById from '../utils/getRoleById';
import getAlignmentColor from '../utils/getAlignmentColor';

export default function PlayerListItem(props) {
  const {
    player,
    onPlayerChange,
    onPlayerDelete,
    onRoleClick,
    ...rest
  } = props;
  const [status, setStatus] = useState('');

  function handleNameChange(event) {
    onPlayerChange({ ...player, name: event.currentTarget.value });
  }

  function handleRoleChange(event) {
    onPlayerChange({
      ...player,
      role: getRoleById(event.currentTarget.value)
    });
  }

  function handleStatusChange(event) {
    setStatus(event.currentTarget.value);
  }

  function handleStatusFormSubmit(event) {
    event.preventDefault();
    const trimmedStatus = status.trim();

    // ignore blanks
    if (!trimmedStatus.length) {
      return;
    }

    // ignore duplicates
    if (player.statuses.includes(trimmedStatus)) {
      return;
    }

    onPlayerChange({
      ...player,
      statuses: [...player.statuses, trimmedStatus]
    });
    setStatus('');
  }

  function handleDeadAliveClick() {
    onPlayerChange({ ...player, dead: !player.dead });
  }

  function handleStatusClick(status) {
    onPlayerChange({
      ...player,
      statuses: player.statuses.filter(other => other !== status)
    });
  }

  return (
    <Root {...rest} faded={player.dead}>
      <TopRow>
        <NameInput
          placeholder="name"
          value={player.name || ''}
          onChange={handleNameChange}
        />
        <RoleHelpButton
          disabled={!player.role}
          onClick={() => onRoleClick(player)}
        >
          <FaQuestionCircle
            size={24}
            color={player.role ? 'white' : 'rgba(255,255,255,0.2)'}
          />
        </RoleHelpButton>
        <RoleSelect
          value={player.role ? player.role.id : ''}
          onChange={handleRoleChange}
        >
          <option disabled value="">
            Role
          </option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </RoleSelect>
        {player.role && (
          <AlignmentLabel color={getAlignmentColor(player.role.alignment)}>
            {player.role.alignment}
          </AlignmentLabel>
        )}
      </TopRow>

      <SecondRow>
        <StatusForm onSubmit={handleStatusFormSubmit}>
          <StatusInput
            placeholder="Status"
            value={status}
            onChange={handleStatusChange}
          />
          <StatusAddButton>
            <FaPlus color="#333" />
          </StatusAddButton>
        </StatusForm>
        <DeathRow>
          <DeadAliveButton dead={player.dead} onClick={handleDeadAliveClick}>
            {player.dead ? 'DEAD' : 'ALIVE'}
          </DeadAliveButton>
          <DeleteButton onClick={() => onPlayerDelete(player)}>
            <FaTrash size={20} />
          </DeleteButton>
        </DeathRow>
      </SecondRow>

      <StatusRow>
        {player.statuses.map((status, i) => (
          <StatusPill
            key={i}
            color={getStatusColor(status)}
            onClick={() => handleStatusClick(status)}
          >
            {status}
            <span>{'\u00D7'}</span>
          </StatusPill>
        ))}
      </StatusRow>
    </Root>
  );
}

const Root = styled(Column)`
  padding: 20px 0 20px;
  margin: 0 20px 0 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.faded ? 0.5 : 1)};
  transition: opacity 0.5s;
`;

const TopRow = styled(Row)`
  margin-bottom: 20px;
  > svg {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
    pointer-events: none;
  }
`;

const SecondRow = styled(Row)`
  margin-bottom: 5px;
`;

const Input = styled('input')`
  flex: 1 1 auto;
  height: 40px;
  padding-left: 10px;
  font-size: 16px;
  min-width: 0;
  border: none;
`;

const Select = styled('select')`
  color: white;
  flex: 1;
`;

const NameInput = styled(Input)`
  flex: 1 1 120px;
`;

const RoleSelect = styled(Select)`
  flex: 1 0 160px;
  font-size: 16px;
  padding-left: 10px;
  background-color: transparent;
  border: none;
  ${props => {
    const role = props.value && getRoleById(props.value);
    if (!role) {
      return '';
    }
    return css`
      color: white;
      background-color: ${getAlignmentColor.dark(role.alignment)};
    `;
  }}
`;

const RoleHelpButton = styled(BlockButton)`
  padding: 0 10px 0 10px;
`;

const StatusForm = styled(Row).attrs({ as: 'form' })`
  height: 100%;
  /* flex: 1 1 auto; */
`;

const StatusAddButton = styled(BlockButton)`
  position: relative;
  background-color: white;
  left: -1px;
  width: 40px;
  padding: 0;
`;

const StatusInput = styled(Input)`
  max-width: 120px;
`;

const DeadAliveButton = styled(BlockButton)`
  font-weight: bold;
  font-size: 18px;
  background-color: ${props => (props.dead ? '#222' : '#080')};
  margin-left: 10px;
  transition: background-color 0.1s;
  max-width: 100px;
`;

const StatusRow = styled(Row)`
  flex-wrap: wrap;
`;

const StatusPill = styled(BlockButton)`
  align-items: center;
  height: 30px;
  border-radius: 15px;
  padding: 3px 10px 3px 10px;
  background-color: rgba(0, 0, 0, 0.8);
  margin-right: 10px;
  margin-top: 5px;
  color: ${props => props.color};
  span {
    margin-left: 5px;
  }
`;

const AlignmentLabel = styled(Row)`
  position: absolute;
  right: 80px;
  top: 100%;
  transform: translate(50%, 0);
  font-size: 10px;
  color: ${props => props.color};
`;

const DeleteButton = styled(BlockButton)`
  padding: 0;
  width: 60px;
`;

const DeathRow = styled(Row)`
  flex: 1 1 auto;
  justify-content: flex-end;
`;

function getStatusColor(status) {
  return `hsl(${stringToHue(status)}, 80%, 80%)`;
}

// From: https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
const stringToHueCache = new Map();
function stringToHue(str) {
  if (!stringToHueCache.has(str)) {
    const { length } = str;
    let hash = 0;
    if (length !== 0) {
      for (let i = 0; i < length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
      }
      hash = hash % 360;
    }
    stringToHueCache.set(str, hash);
    return hash;
  }
  return stringToHueCache.get(str);
}
