import{checkIfUserIsWhitelist}from"./checkIfUserIsWhitelist.mjs";
import{getAuditLogs}from"./getAuditLogs.mjs";
import{getAction}from'./getAction.mjs';
import{ban}from"./ban.mjs";
export async function handleEvent(guild,eventType,target){
  try{
    const {executor} = await getAuditLogs(guild,1,eventType);
    const action = getAction(eventType);
    const targetName = target.user ? target.user.tag : target.name || 'Unknown';
    console.log(`[INFO] ${action}: ${targetName} (ID: ${target.id}) by ${executor.tag} (ID: ${executor.id})`);
    const member = await guild.members.fetch(executor.id);
    const hasWhitelistRole = checkIfUserIsWhitelist(member);
    if(!hasWhitelistRole){
    await ban(guild,executor);
    }else{console.log(`[INFO] Executor ${executor.tag} has a whitelist role, not banning.`);return;}
  } catch (error) {
    console.error(`[ERROR] Error fetching audit logs for ${eventType}: ${error.message}`);
  }
}