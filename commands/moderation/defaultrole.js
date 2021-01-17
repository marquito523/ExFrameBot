const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: 'set-default-role',
    async execute(client, message, args){

        
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.permissions.has(["MANAGE_ROLES"])) return message.channel.send(new Discord.MessageEmbed().setDescription(' :x: You do not have permission to run this command'))

      let role =
        message.guild.roles.cache.find((r) => r.name == args[1]) ||
        message.guild.roles.cache.find((r) => r.id == args[1]) ||
        message.mentions.roles.first();

        if(!role) return message.channel.send(new Discord.MessageEmbed().setDescription(':x: You need to provide a start role/ default role'))

        if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send(new Discord.MessageEmbed().setDescription('I do own the required permission for me to run this command'))

        let member =  message.author

        let avatar = member.displayAvatarURL({size: 1024})
        try{
            db.set(`guild_${message.guild.id}_defaultRole`, role.id)
            return message.channel.send(new Discord.MessageEmbed().setDescription(":white_check_mark:  Succesfully set `" + role.name + "`as deault role in `" + message.guild.name + "`.").setAuthor("Succes", avatar))
        }catch(e){
            console.log(e)
            return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error happened with our Data Stores"))
        }

  
        

  
      
  
  
    }
  }
    
