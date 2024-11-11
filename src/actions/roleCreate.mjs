import{handleEvent}from"./handleEvent.mjs";
import{AuditLogEvent}from"discord.js";
export async function roleCreate(role) {
  await handleEvent(role.guild,AuditLogEvent.RoleCreate,role);
}