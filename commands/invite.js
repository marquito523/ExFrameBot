const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite the bot",

    execute(message, args) {
        var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("My friend click here to get the increadible bot, ExFrame ;D! Click on me I'm BLUE!")
            .setURL('https://discord.com/oauth2/authorize?client_id=733665360188014644&permissions=269298865&scope=bot')
        return message.channel.send(embed)
    }
}
