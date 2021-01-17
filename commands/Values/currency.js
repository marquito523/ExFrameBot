const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: 'balance',
    description: 'show an example of ping command',
    async execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        const prefix = db.get(`guild_${message.guild.id}_prefix`) || 'm!';


        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})



        const Currency = db.get(`User_${message.author.id}_Framits`) || 0

        const UserEntries = db.get(`User_${message.author.id}_GameEntries`) || 10


        message.channel.send(new Discord.MessageEmbed().setDescription("Your balance is currently at `" +  Currency + "` Framits. \n You also have `" + UserEntries + "` Game Entries. (Currency games) For more information `" + prefix +  "help entries`.").setTitle(`**Balance**`).setAuthor("Balance in Framits", avatar, 'https://discord.js.org'))

    }
}