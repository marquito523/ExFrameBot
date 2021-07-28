const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const User = require("../Models/User")


const { DefaultJoinMessage } = require("../../config.json")

module.exports = {
    name: 'balance',
    description: 'show an example of ping command',
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        const prefix = client.prefix


        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})

        let UserC

        const UserSettings = await User.findOne({

            UserId: message.author.id
    
        }, (err, user) => {
    
            UserC = user
            
            if(!UserC) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You do not own any bank accounts! But that's fine, go creat one now by typing in \n `" + prefix + "bank-account`").setFooter("ExFrame Bank Services").setAuthor("ExFrame International Bank").setTitle("**ExFrame Offical Bank Message**"))
    
        })


   const  Currency = UserSettings.UserCurrency

      const  UserEntries = UserSettings.UserEntries

      try{

         message.author.send(new Discord.MessageEmbed().setDescription("Your balance is currently at `" +  Currency + "` Framits. \n You also have `" + UserEntries + "` Game Entries. (Currency games) For more information `" + prefix +  "help entries`.").setTitle(`**Balance**`).setAuthor("Balance in Framits", avatar))

         return message.react("👋")

      }catch(e){

        return message.author.send(new Discord.MessageEmbed().setDescription("Your balance is currently at `" +  Currency + "` Framits. \n You also have `" + UserEntries + "` Game Entries. (Currency games) For more information `" + prefix +  "help entries`.").setTitle(`**Balance**`).setAuthor("Balance in Framits", avatar))

      }
    }
}