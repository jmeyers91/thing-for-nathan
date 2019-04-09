import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import {
  townsfolkRoles,
  outsiderRoles,
  minionRoles,
  demonRoles,
  isBaron,
  isTownsfolk,
  isNotTownsfolk,
  isRoleInArray
} from '../roles';

export default function getRandomRoles(playerCount) {
  let playerRoles;

  switch (playerCount) {
    case 5:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 3),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 6:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 3),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 7:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 5),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 8:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 5),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 9:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 5),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 10:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 7),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 2),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 11:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 7),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 2),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 12:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 7),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 2),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 13:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 14:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    case 15:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ];
      break;
    default:
      playerRoles = [
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ];
      break;
  }

  // If the baron was picked, replace 2 townsfolk with 2 outsiders
  if (playerRoles.some(isBaron)) {
    const townsfolk = playerRoles.filter(isTownsfolk);
    const nonTownsfolk = playerRoles.filter(isNotTownsfolk);

    // Pick 2 random outsiders
    const outsiders = sampleSize(
      // Make sure not to pick an outsider that's already picked
      outsiderRoles.filter(role => !isRoleInArray(nonTownsfolk, role)),
      2
    );

    // Pick 2 random townsfolk to replace
    const townsfolkToRemove = sampleSize(townsfolk, 2);

    // Get all the townsfolk that aren't being replaced
    const remainingTownsfolk = townsfolk.filter(
      role => !isRoleInArray(townsfolkToRemove, role)
    );

    // Combine the surviving townsfolk, the outsiders, and any other non-townsfolk
    playerRoles = [...remainingTownsfolk, ...outsiders, ...nonTownsfolk];
  }

  return shuffle(playerRoles);
}
