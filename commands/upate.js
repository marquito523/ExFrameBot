const Discord = require('discord.js')

module.exports = {
    name: '485047',
    description: 'I need **help bri** :(',
    execute(message, args) {
        message.delete();
        var embed = new Discord.MessageEmbed()
        .setTitle('**I need **help bri** :(')
        .setDescription('So, when I run myself on the website, I get an error that mkes that I cannot play any musics. So marquito will send you the error')
        .setTimestamp()
    return message.channel.send(embed)

    }

}