import{AuditLogEvent}from"discord.js";
import{checkIfUserIsWhitelist}from"./checkIfUserIsWhitelist.mjs";
import{getAuditLogs}from"./getAuditLogs.mjs";
import{ban}from"./ban.mjs";
export async function roleUpdate(oldRole,newRole) {
  try {
    const {executor,target} = await getAuditLogs(newRole.guild,1,AuditLogEvent.RoleUpdate);
    if(target.id !== newRole.id){console.log(`[WARN] Audit log target does not match the updated role. Skipping.`);return;}
    console.log(`[INFO] Role updated: ${newRole.name} (ID: ${newRole.id}) by ${executor.tag} (ID: ${executor.id})`);
    if(oldRole.name !== newRole.name){console.log(`[INFO] Role name changed from '${oldRole.name}' to '${newRole.name}'`);}
    if(!oldRole.permissions.equals(newRole.permissions)){
      console.log(`[INFO] Role permissions updated for '${newRole.name}'.`);
      console.log(`[DEBUG] Old Permissions: ${oldRole.permissions.bitfield}`);
      console.log(`[DEBUG] New Permissions: ${newRole.permissions.bitfield}`);
    }
    const executorMember = await newRole.guild.members.fetch(executor.id);
    const hasWhitelistRole = checkIfUserIsWhitelist(executorMember);
    if(hasWhitelistRole){console.log(`[INFO] Executor ${executor.tag} has a whitelist role, not banning.`);return;}
    console.log(`[INFO] No whitelist role for executor, monitoring changes.`);
    await ban(newRole.guild,executorMember);
  }catch(error){
    console.error(`[ERROR] Error fetching audit logs for RoleUpdate: ${error.message}`);
  }
}