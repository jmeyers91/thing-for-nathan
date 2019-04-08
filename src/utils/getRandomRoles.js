import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import {
  townsfolkRoles,
  outsiderRoles,
  minionRoles,
  demonRoles
} from '../roles';

export default function getRandomRoles(playerCount) {
  switch (playerCount) {
    case 5:
      return shuffle([
        ...sampleSize(townsfolkRoles, 3),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ]);
    case 6:
      return shuffle([
        ...sampleSize(townsfolkRoles, 3),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ]);
    case 7:
      return shuffle([
        ...sampleSize(townsfolkRoles, 5),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ]);
    case 8:
      return shuffle([
        ...sampleSize(townsfolkRoles, 5),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ]);
    case 9:
      return shuffle([
        ...sampleSize(townsfolkRoles, 5),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 1),
        ...sampleSize(demonRoles, 1)
      ]);
    case 10:
      return shuffle([
        ...sampleSize(townsfolkRoles, 7),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 2),
        ...sampleSize(demonRoles, 1)
      ]);
    case 11:
      return shuffle([
        ...sampleSize(townsfolkRoles, 7),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 2),
        ...sampleSize(demonRoles, 1)
      ]);
    case 12:
      return shuffle([
        ...sampleSize(townsfolkRoles, 7),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 2),
        ...sampleSize(demonRoles, 1)
      ]);
    case 13:
      return shuffle([
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 0),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ]);
    case 14:
      return shuffle([
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 1),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ]);
    case 15:
      return shuffle([
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ]);
    default:
      return shuffle([
        ...sampleSize(townsfolkRoles, 9),
        ...sampleSize(outsiderRoles, 2),
        ...sampleSize(minionRoles, 3),
        ...sampleSize(demonRoles, 1)
      ]);
  }
}
