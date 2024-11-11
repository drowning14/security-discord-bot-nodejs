import{createRequire}from'module';
const require = createRequire(import.meta.url);
const whitelistRolesId = require('./json/whitelistRolesId.json').ids;
export function checkIfUserIsWhitelist(executorMember){
  const hasWhitelistRole = whitelistRolesId.some(roleId => executorMember.roles.cache.has(roleId));
  if(hasWhitelistRole){return true;} else{return false}
}