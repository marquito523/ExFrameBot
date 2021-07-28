const { relativeTimeRounding } = require("moment");

const mongodb = require("mongoose");
  
const Guild = require("../commands/Models/Guild");

const { defaultprefix, Enable_Console_Write_Commmand, WebsiteURL } = require("../config.json");

const Throll = new Map();




module.exports = async (client, message) => {

    if(message.channel.type === 'dm')return

    if(message.guild === null) return 

    if(message.author.bot) return;

    if(message.author.id === client.user.id) return;

    if (message.author.bot || message.channel.type === 'dm') return;

    if(client.user.name === "Marq" && message.guild.id === 774018500330782722) return 

    let prefix

    let Pguild

    const settings = await Guild.findOne({

        guildID: message.guild.id

    }, (err, guild) => {

        Pguild = guild

        if (err) console.error(err)

    })
    
    let AllowSend = true
    if(settings){
    const IgnoredChannels = settings.IgnoredChannels || []


    for(var i = 0; i < IgnoredChannels.length; i++){
        const ChannelID = message.channel.id
        if(IgnoredChannels[i] === ChannelID.toString()){
            return AllowSend = false
        }
    }
}

if(AllowSend === false)return


   if (!Pguild)
   {
    prefix = defaultprefix

    }else if(!settings.prefix){

        prefix = defaultprefix

  }else{

        prefix = settings.prefix

   }

   client.prefix = prefix

   client.Website = WebsiteURL


    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd){ 
    if(Throll.get(message.author.id))return message.channel.send("You are executing commands too quicly! Wait a few seconds.")
    cmd.execute(client, message, args, settings)
    AddThroll(message.author.id, message.author)
    if(Enable_Console_Write_Commmand === true)console.log(`${message.author.username} has run ${cmd.name} command. => Id: ${message.author.id}`)  
    }
};





async function AddThroll(UserID, User){
    Throll.set(UserID, true)
    await Throll.get(UserID)
    setTimeout(() => {
    RemoveThroll(UserID, User)
    }, 3000);
}


async function RemoveThroll(UserID, User){
    try{
    return Throll.delete(UserID)
    }catch(e){
        if(!Throll.get(UserID)){
            return
        }else{
            try{
                User.send("If you're seeing this, an **important** bug occiered when executing our anti-spam. We were unable to remove your ID from our cooldown list. This might not affect you. But if your user ID was still inside of our anti-spam, you will not be able to use ExFrame. Please contact us, if this happens via our support server. [Click here](https://discord.gg/6zqN4pWpnm) to get invited to our support server.")
            }catch(e){
                return message.channel.send(`An error occiered with ${User}. We cannot remove him from our anti-spam. Screen shot this, and show it in our [support server](https://discord.gg/6zqN4pWpnm) for assistance.`)
            }
        }
    }
}
