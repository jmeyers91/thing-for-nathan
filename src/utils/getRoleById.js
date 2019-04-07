import roles from '../roles';

const roleIdMap = roles.reduce((map, role) => {
  map.set(role.id, role);
  return map;
}, new Map());

export default function getRoleById(roleId) {
  return roleIdMap.get(+roleId);
}
