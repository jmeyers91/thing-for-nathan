const roles = [
  {
    name: 'Washerwoman',
    alignment: 'Townsfolk',
    ability:
      'You start knowing that 1 of 2 players are a particular townsfolk role.',
    example:
      'The Washerwoman wakes up and learns that either Evan or Rachael are the Chef.'
  },
  {
    name: 'Librarian',
    alignment: 'Townsfolk',
    ability:
      'You start knowing that 1 of 2 players are a particular outsider role.',
    example:
      'The Librarian wakes up and learns that either Evan or Rachael are the Saint.'
  },
  {
    name: 'Investigator',
    alignment: 'Townsfolk',
    ability:
      'You start knowing that 1 of 2 players are a particular minion role.',
    example:
      'The Investigator wakes up and learns that either Evan or Rachael are the Baron.'
  },
  {
    name: 'Chef',
    alignment: 'Townsfolk',
    ability:
      'You start knowing how many pairs of evil players are sat next to eachother.',
    example:
      'The Demon is sitting next to the Baron. The chef wakes up and hears "1".'
  },
  {
    name: 'Empath',
    alignment: 'Townsfolk',
    ability:
      'Each night you are told how many of your living neighbors are Evil.',
    example:
      'The Empath is sitting next to the Gunslinger and the Librarian. They hear "1". '
  },
  {
    name: 'Fortune Teller',
    alignment: 'Townsfolk',
    ability:
      'Each night choose 2 players and learn if one of them is the Demon. There is one good player that registers falsely to you.',
    example:
      'The Fortune Teller chooses the Demon and the Librarian and receives a "Yes".'
  },
  {
    name: 'Undertaker',
    alignment: 'Townsfolk',
    ability:
      'Each night, you learn the role of the person who was executed that day.',
    example:
      'The Mayor is executed. That night, the Undertaker is shown the Mayor token.'
  },
  {
    name: 'Monk',
    alignment: 'Townsfolk',
    ability:
      'Each night, choose another player. They are safe from the Demon that night.',
    example:
      'The Monk chooses the Fortune Teller. The Demon attacks the Fortune Teller. The Fortune Teller survives.'
  },
  {
    name: 'Ravenkeeper',
    alignment: 'Townsfolk',
    ability:
      'If you are killed at night, you may learn the role of another player.',
    example:
      'The Demon kills the Ravenkeeper. They choose Ethan, and learn he is the Empath.'
  },
  {
    name: 'Virgin',
    alignment: 'Townsfolk',
    ability:
      'The first time you are nominated for execution, if the person nominating you is a Townsfolk, they are executed immediately.',
    example:
      'The Washerwoman nominates the Virgin. The Washerwoman is immediately executed.'
  },
  {
    name: 'Slayer',
    alignment: 'Townsfolk',
    ability:
      'Once per game, during the day, publicly nominate a player. If they are the Demon, they die.',
    example: 'The Slayer chooses the Imp, the Good team wins.'
  },
  {
    name: 'Soldier',
    alignment: 'Townsfolk',
    ability: 'You are safe from the Demon.',
    example: 'The Demon attacks the Soldier, who does not die.'
  },
  {
    name: 'Mayor',
    alignment: 'Townsfolk',
    ability:
      'If only 3 players are alive, and no execution happens, you win. If you die at night, another player might die instead.',
    example:
      'There are three players alive and no executions happen. The Good team wins.'
  },
  {
    name: 'Butler',
    alignment: 'Outsider',
    ability:
      'Each night, choose another player. During the day, you may only vote if they do.',
    example:
      'The Butler choose Ethan at night. During the day, Ethan decides not to vote, so the Butler cannot vote either.'
  },
  {
    name: 'Drunk',
    alignment: 'Outsider',
    ability:
      'You do not know you are the Drunk. You think you are a Townsfolk, but your ability misfires.',
    example:
      'The Drunk thinks they are the Empath. They wake up and get a "0", even though they are sitting next to an Evil player.'
  },
  {
    name: 'Recluse',
    alignment: 'Outsider',
    ability: 'You might register as Evil, even if dead.',
    example:
      'The Recluse is killed. That night, the Undertaker is told that they were the Imp.'
  },
  {
    name: 'Saint',
    alignment: 'Outsider',
    ability: 'If you die by execution, the Good team loses.',
    example:
      'The Saint is nominated and receives enough votes to be executed. They die, and the game ends with Evil winning.'
  },
  {
    name: 'Poisoner',
    alignment: 'Minion',
    ability:
      'At night, choose a player: Their ability malfunctions that night and during the day.',
    example:
      'The Investigator is poisoned. They learn that either Evan or Rachael are the Baron, even though neither of them are.'
  },
  {
    name: 'Spy',
    alignment: 'Minion',
    ability:
      'You might register as a Townsfolk or Outsider, even while dead. At night, you may see the Grimoire.',
    example:
      'The Washerwoman learns that either Ethan or Rachael is the Ravenkeeper, even though Ethan is the Monk and Rachael is the Spy.'
  },
  {
    name: 'Scarlet Woman',
    alignment: 'Minion',
    ability:
      'If there are 5 or more players left alive and the Demon dies, you become the Demon.',
    example:
      'The Imp is executed, however there are 5 players left alive. The Scarlet Woman becomes the Imp.'
  },
  {
    name: 'Baron',
    alignment: 'Minion',
    ability: 'There are two more Outsiders in play.',
    example:
      'At the start of the game, if the Baron is in play, remove two Townsfolk tokens and replace them with Outsider tokens.'
  },
  {
    name: 'Imp',
    alignment: 'Demon',
    ability:
      'At night choose a player and they die. If you choose yourself, one of your Minions becomes the new Imp.',
    example:
      'The Imp chooses to kill Ethan during the night, who was an Undertaker.'
  }
].map((role, i, { length }) => ({
  id: i + 1,
  lightColor: getLightColor(i, length),
  darkColor: getDarkColor(i, length),
  ...role
}));

export default roles;

export const townsfolkRoles = roles.filter(
  role => role.alignment === 'Townsfolk'
);
export const outsiderRoles = roles.filter(
  role => role.alignment === 'Outsider'
);
export const minionRoles = roles.filter(role => role.alignment === 'Minion');
export const demonRoles = roles.filter(role => role.alignment === 'Demon');

function getLightColor(index, length) {
  const hue = (360 * index) / length;
  const sat = 80;
  const lum = 70;
  return `hsl(${hue},${sat}%,${lum}%)`;
}

function getDarkColor(index, length) {
  const hue = (360 * index) / length;
  const sat = 80;
  const lum = 50;
  return `hsl(${hue},${sat}%,${lum}%)`;
}
