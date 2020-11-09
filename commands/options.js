const prefix = "!"
const Discord = require('discord.js')

module.exports = {
    name: 'options',
    description: 'Displays options on a panel.',
    execute(message, args) {

        var embed = new Discord.MessageEmbed()
        .setTitle('**ExFrame help**')
        .setTimestamp()
        .addFields(

        
            { name: ':tools: **Moderation**', value: 'Do: ``!infomoderation``', inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: ' :rofl:   **Fun**', value: 'More info  :  ``!infofun``', inline: true },
            
            { name: ' 🔊 ** Music**', value: 'More info :  ``!infomusic`` ', inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: ':gear:** Useful**', value: 'More info :  ``!infoutilities``', inline: true },
            
        )
        .setFooter("Developed by marquito523")
    return message.channel.send(embed)


    }
}