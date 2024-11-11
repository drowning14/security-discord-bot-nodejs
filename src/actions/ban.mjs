export async function ban(guild,banningUser){
  try{
    if(banningUser.id === process.env.clientId){console.log("[WARN] Attempted to ban the bot itself. Action prevented.");return;}
    if(banningUser.id === guild.ownerId){console.log(`[WARN] Attempted to ban the server owner (${banningUser.username}). Action prevented.`);return;}
    if(banningUser.bannable === false){console.log(`[WARN] ${banningUser.username} isn't bannable.`);return;}
      await guild.bans.create(banningUser.id);
    }catch(error){
      console.error(`[ERROR] ${error.code === 50013 ? 'Missing permission: BAN_MEMBERS' : error.message}`);
    }
}