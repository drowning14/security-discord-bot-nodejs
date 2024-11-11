import{createRequire}from'module';
import{checkIfUserIsWhitelist}from"./checkIfUserIsWhitelist.mjs";
import{getAuditLogs}from'./getAuditLogs.mjs';
import{ban}from"./ban.mjs";
const require = createRequire(import.meta.url);
const okRolesId = require('./json/okRolesId.json').ids;
export async function guildMemberUpdate(oldMember,newMember) {
  try{
    if(oldMember.nickname!==newMember.nickname){console.log(`[INFO] Member ${newMember.user.tag} changed nickname from ${oldMember.nickname||newMember.user.tag} to ${newMember.nickname||newMember.user.displayName}`);return;}
    const auditLogData = await getAuditLogs(newMember.guild);
    if(!auditLogData||!auditLogData.executor){console.log(`[WARN] No executor found for the audit log.`);return;}
    const {target,executor} = auditLogData;
    let executorMember;
    try{
      executorMember = await newMember.guild.members.fetch(executor.id);
      console.log(`[INFO] Executor: ${executorMember.user.tag}, Target: ${target?.username}`);
    }catch(error){
      console.error(`[ERROR] Could not fetch the executor: ${executor?.username} (ID: ${executor?.id}). Error: ${error.message}`);
      return;
    }
    const hasWhitelistRole = checkIfUserIsWhitelist(executorMember);
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    addedRoles.forEach(role=>{console.log(`[INFO] Role added to ${newMember.user.tag}: ${role.name} (ID: ${role.id}) by: ${executorMember.user.tag} (ID: ${executorMember.id})`);});
    removedRoles.forEach(role=>{console.log(`[INFO] Role removed from ${newMember.user.tag}: ${role.name} (ID: ${role.id}) by: ${executorMember.user.tag} (ID: ${executorMember.id})`);});
    if(hasWhitelistRole){console.log(`[INFO] Executor ${executorMember.user.tag} has a whitelist role, not banning.`);return;}
    const shouldBanAdd = addedRoles.some(role=>!okRolesId.includes(role.id));
    const shouldBanRemove = removedRoles.some(role=>!okRolesId.includes(role.id));
    if(shouldBanAdd||shouldBanRemove) {
      console.log(`[INFO] shouldBanAdd: ${shouldBanAdd}, shouldBanRemove: ${shouldBanRemove}`);
      await ban(newMember.guild, executorMember);
    }else{console.log(`[INFO] Role is OK, not banning.`);return;}
  }catch(error){
    console.error(`[ERROR] Error in guildMemberUpdate: ${error.message}`);
  }
}