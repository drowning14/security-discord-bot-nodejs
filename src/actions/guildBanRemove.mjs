import{AuditLogEvent}from"discord.js";
import{getAuditLogs}from"./getAuditLogs.mjs";
import{checkIfUserIsWhitelist}from"./checkIfUserIsWhitelist.mjs";
import{ban}from"./ban.mjs";
export async function guildBanRemove(unbanInfo){
  try{
    console.log(`[INFO] UnBanned ${unbanInfo.user?.tag ?? 'unknown user'} (ID: ${unbanInfo.user?.id ?? 'unknown ID'})`);
    const {executor} = await getAuditLogs(unbanInfo.guild,1,AuditLogEvent.MemberBanRemove);
    if(!executor){console.log(`[WARN] No executor found in audit log.`);return;}
    let executorMember;
    try{
      executorMember = await unbanInfo.guild.members.fetch(executor.id);
    }catch(error){
      console.error(`[ERROR] Could not fetch the executor member: ${executor.tag} (ID: ${executor.id}). Error: ${error.message}`);
      return;
    }
    const hasWhitelistRole = checkIfUserIsWhitelist(executorMember);
    if(hasWhitelistRole){console.log(`[INFO] Executor ${executorMember.user.tag} has a whitelist role, not banning.`);return;}
    console.log(`[INFO] No whitelist role for executor ${executorMember.user.tag}, monitoring changes.`);
    await ban(unbanInfo.guild,executorMember);
  }catch(error){
    console.error(`[ERROR] Error fetching audit logs for MemberBanAdd: ${error.message}`);
  }
}