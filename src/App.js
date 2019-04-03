import React, { useState } from 'react';
import './App.css';

let id = 1;
const NONE = 'NONE';
const getId = () => id++;
const roles = [
  'villager',
  'werewolf',
  'seer',
  'detective',
  'my bff phil',
];

export default function App() {
  const [players, setPlayers] = useState([]);

  function handleAddPlayer() {
    setPlayers(players.concat({
      id: getId(),
      name: '',
      role: NONE,
      status: '',
      evil: false,
      dead: false,
    }));
  }

  function handleDeletePlayer(player) {
    if(window.confirm('They die now?')) {
      setPlayers(players.filter(other => other.id !== player.id));
    }
  }

  function handlePlayerChange(player) {
    setPlayers(
      players.map(other => other.id === player.id 
        ? player
        : other
      )
    );
  }

  return (
    <div className="App">
      <Header class="row" onAddPlayer={handleAddPlayer}/>
      <PlayerList>
        {players.map(player =>
          <PlayerListItem key={player.id} player={player} onChange={handlePlayerChange} onDelete={handleDeletePlayer}/>  
        )}
      </PlayerList>
    </div>
  );
};

function PlayerListItem({ player, onChange, onDelete, ...rest }) {
  const {
    name,
    role,
    status,
    dead,
    evil,
  } = player;

  const handleChange = (key, value) => onChange && onChange({ ...player, [key]: value });
  const handleNameChange = event => handleChange('name', event.currentTarget.value);
  const handleRoleChange = event => handleChange('role', event.currentTarget.value);
  const handleStatusChange = event => handleChange('status', event.currentTarget.value);
  const handleEvilChange = () => handleChange('evil', !evil);
  const handleDeadChange = () => handleChange('dead', !dead);

  return (
    <li {...rest} className="PlayerListItem row">
      <input placeholder="Name" value={name} onChange={handleNameChange}/>
      <select value={role || NONE} onChange={handleRoleChange}>
        <option disabled value={NONE}>Role</option>
        {roles.map(role =>
          <option key={role} value={role}>{role}</option>
        )}
      </select>
      <input placeholder="Status" value={status} onChange={handleStatusChange}/>
      <label>
        Dead:
        <input type="checkbox" checked={dead} onChange={handleDeadChange}/>
      </label>
      <label>
        Evil:
        <input type="checkbox" checked={evil} onChange={handleEvilChange}/>
      </label>
      <button onClick={() => onDelete(player)}>Delete</button>
    </li>
  );
}

function PlayerList(props) {
  return (
    <ul {...props} className="PlayerList col"/>
  );
}

function Header(props) {
  const { onAddPlayer, ...rest } = props;
  return (
    <div {...rest} class="Header">
      <button onClick={onAddPlayer}>Add Player</button>
    </div>
  );
}
