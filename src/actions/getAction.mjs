import{AuditLogEvent}from"discord.js";
export function getAction(eventType) {
  switch (eventType) {
    case AuditLogEvent.ChannelCreate:
      return 'Channel created';
    case AuditLogEvent.ChannelDelete:
      return 'Channel deleted';
    case AuditLogEvent.RoleCreate:
      return 'Role created';
    case AuditLogEvent.RoleDelete:
      return 'Role deleted';
    case AuditLogEvent.MemberUpdate:
      return 'Member updated';
    default:
      return 'Unknown event';
  }
}