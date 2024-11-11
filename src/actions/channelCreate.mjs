import{handleEvent}from"./handleEvent.mjs";
import{AuditLogEvent}from"discord.js";
export async function channelCreate(channel) {
  await handleEvent(channel.guild,AuditLogEvent.ChannelCreate,channel);
}