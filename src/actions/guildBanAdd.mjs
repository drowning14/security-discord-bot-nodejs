import{AuditLogEvent}from"discord.js";
import{checkIfUserIsWhitelist}from"./checkIfUserIsWhitelist.mjs";
import{getAuditLogs}from"./getAuditLogs.mjs";
import{ban}from"./ban.mjs";
export async function guildBanAdd(banInfo) {
  try {
    const {executor} = await getAuditLogs(banInfo.guild,1,AuditLogEvent.MemberBanAdd);
    console.log(`[INFO] Banned ${banInfo.user?.tag ?? 'unknown user'} (ID: ${banInfo.user?.id ?? 'unknown ID'}) by ${executor.username ?? 'unknown executor'} (ID: ${executor.id ?? 'unknown executor ID'})`);
    if(!executor){console.log(`[WARN] No executor found in audit log.`);return;}
    let executorMember;
    try{
      executorMember = await banInfo.guild.members.fetch(executor.id);
    }catch(error){
      console.error(`[ERROR] Could not fetch the executor member: ${executor.tag} (ID: ${executor.id}). Error: ${error.message}`);
      return;
    }
    const hasWhitelistRole = checkIfUserIsWhitelist(executorMember);
    if(hasWhitelistRole){console.log(`[INFO] Executor ${executorMember.user.tag} has a whitelist role, not banning.`);return;}
    console.log(`[INFO] No whitelist role for executor ${executorMember.user.tag}, monitoring changes.`);
    await ban(banInfo.guild,executorMember);
  }catch(error){
    console.error(`[ERROR] Error fetching audit logs for MemberBanAdd: ${error.message}`);
  }
}