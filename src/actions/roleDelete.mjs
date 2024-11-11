import {handleEvent}from"./handleEvent.mjs";
import{AuditLogEvent} from "discord.js";
export async function roleDelete(role) {
  await handleEvent(role.guild,AuditLogEvent.RoleDelete,role);
}