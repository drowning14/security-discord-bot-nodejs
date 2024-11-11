export async function getAuditLogs(guild, limit, type) {
  try{
    if(!guild){console.log(`[ERROR] Guild is not provided.`);return null;}
    let auditLogs;
    if(limit && type){
      auditLogs = await guild.fetchAuditLogs({ limit: Number(limit), type });
    }else{
      auditLogs = await guild.fetchAuditLogs();
    }
    const logEntry = auditLogs?.entries?.first();
    if(!logEntry){console.log(`[WARN] No relevant audit log found.`);return null;}
    const {executor,target} = logEntry;
    if(!executor){console.log(`[WARN] No executor found in the audit log entry.`);return null;}
    return {auditLogs,logEntry,executor,target};
  }catch(error){
    console.error(`[ERROR] Failed to fetch audit logs: ${error.message}`);
    return null;
  }
}
