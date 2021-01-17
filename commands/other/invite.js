const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite the bot",

    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Invite ExFrame")
            .setURL('https://discord.com/api/oauth2/authorize?client_id=733665360188014644&permissions=275901542&scope=bot')
            .setDescription("**IMPORTANT**: The link below will let you invite ExFrame with **low** permitions. If any permitions are missing, in order to let ExFrame work at 100%, edit his role perms to whatever you need him to do.")
        return message.channel.send(embed)
    }
}
