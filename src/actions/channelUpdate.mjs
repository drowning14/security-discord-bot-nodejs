import{AuditLogEvent}from"discord.js";
import{checkIfUserIsWhitelist}from"./checkIfUserIsWhitelist.mjs";
import{getAuditLogs}from"./getAuditLogs.mjs";
import{ban}from"./ban.mjs";
export async function channelUpdate(oldChannel,newChannel) {
  try{
    const {executor} = await getAuditLogs(newChannel.guild,1,AuditLogEvent.ChannelUpdate);
    if(oldChannel.name!==newChannel.name){console.log(`[INFO] Channel ${oldChannel.name} renamed to ${newChannel.name}`);}
    if(oldChannel.permissionOverwrites.cache!==newChannel.permissionOverwrites.cache){console.log(`[INFO] Permissions of channel ${newChannel.name} changed`);}
    if(!executor){console.log(`[WARN] No executor found in audit log.`);return;}
    let executorMember;
    try{
      executorMember = await newChannel.guild.members.fetch(executor.id);
    }catch(error){
      console.error(`[ERROR] Could not fetch the executor member: ${executor.tag} (ID: ${executor.id}). Error: ${error.message}`);
      return;
    }
    const hasWhitelistRole = checkIfUserIsWhitelist(executorMember);
    if(hasWhitelistRole){console.log(`[INFO] Executor ${executorMember.user.tag} has a whitelist role, not banning.`);return;}
    console.log(`[INFO] No whitelist role for executor ${executorMember.user.tag}, monitoring changes.`);
    await ban(newChannel.guild,executorMember);
  }catch(error){
    console.error(`[ERROR] Error fetching audit logs for ChannelUpdate: ${error.message}`);
  }
}