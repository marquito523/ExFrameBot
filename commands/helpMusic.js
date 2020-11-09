const Discord = require('discord.js')
module.exports = {
    name: 'infomusic',
    description: 'show an example of ping command',
    execute(message, args) {
        var embed = new Discord.MessageEmbed()
        .setTitle('**🔊 ExFrame Help 🔊 **')
        .setColor('RANDOM')
        .setDescription('**ExFrame Music Commands Helper**\n\n**music commands**: \n play, skip, queue, np, stop, pause, resume. To use them use the prefix plus any of these. If it is play, do !play + Youtube URL OR !play + musicName ')
        .setTimestamp()
    return message.channel.send(embed)

    }
}