const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite the bot",

    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Invite ExFrame")
            .setURL('https://discord.com/api/oauth2/authorize?client_id=733665360188014644&permissions=275901542&scope=bot')
            .setDescription("**IMPORTANT**: The link below will let you invite ExFrame with **low** permitions. If any permitions are missing, in order to let ExFrame work at 100%, edit his role perms to whatever you need him to do.")
        return message.channel.send(embed)
    }
}
