const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite the bot",

    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
            .setTitle("Invite ExFrame")
            .setDescription("Different links: \n \n *This link does not contain all the permissions ExFrame requires to run fully every single command.* \n \n **Invite Link:** To invite ExFrame [click here](https://discord.com/api/oauth2/authorize?client_id=733665360188014644&permissions=275901542&scope=bot)  \n \n **Vote ExFrame:** To vote ExFrame on Top.gg [click here](https://top.gg/bot/733665360188014644) \n \n**ExFrame Support Guild:** To join ExFrame's Support Guild [click here](https://discord.gg/6zqN4pWpnm) \n \n **ExFrame Support Website:** To visit ExFrame's Website [click here](https://marquito523.github.io/ExFrame-Website/)")
        return message.channel.send(embed)
    }
}
