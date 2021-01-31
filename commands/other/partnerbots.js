const Discord = require('discord.js')


module.exports = {
    name: 'partners',
    description: 'gives Karlofs bot',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

       return message.channel.send(new Discord.MessageEmbed().setDescription().setTitle("Exyno").setThumbnail("https://marquito523.github.io/ExFrame-Website/images/Exyno.jpg").setDescription("**Short Description:** \n \n Exyno is a very useful bot made by karlof002. Exyno can complete any kind of tasks that a server would require, and also meets features such as auto adding role, or sending a message on a required channel when a member joins. Exyno now has over 35k users and over 500 guilds. Exyno has been proved secure, and soon is going to have a language option. So what are you waiting for? \n Invite Exyno! \n \n **A few useful links:** \n \n **To invite Exyno** to your server [click here](https://discordapp.com/oauth2/authorize?client_id=689939340293701710&scope=bot&permissions=1983381367) \n \n **To vote Exyno** on Top.gg [click here](https://top.gg/bot/689939340293701710/vote) \n \n **To join Exyno's Support Server** [click here](https://discord.gg/bknyd5q) \n \n **To Visit Exyno's** Support Website [click here](https://exyno.ml/)").setFooter("Exyno made by karlof002"))

    }
}