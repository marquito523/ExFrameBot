const mongodb = require("mongoose")
  
const Guild = require("../commands/Models/Guild")

const { defaultprefix, Enable_Console_Write_Commmand } = require("../config.json")

module.exports = async (client, message) => {

    if(message.channel.type === 'dm')return

    if(message.guild === null) return 

    if(message.author.bot) return;

    if(message.author.id === client.user.id) return;

    if (message.author.bot || message.channel.type === 'dm') return;
    

   let prefix

    let Pguild


    const settings = await Guild.findOne({

        guildID: message.guild.id

    }, (err, guild) => {

        Pguild = guild

        if (err) console.error(err)

    })

   if (!Pguild)
   {
    prefix = defaultprefix

    }else if(!settings.prefix){

        prefix = defaultprefix

  }else{

        prefix = settings.prefix

   }

   client.prefix = prefix


    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd){ 
    cmd.execute(client, message, args)
    if(Enable_Console_Write_Commmand === true)console.log(`${message.author.username} has run ${cmd.name} command. => Id: ${message.author.id}`)  
    }
};