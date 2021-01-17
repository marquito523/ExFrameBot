const Discord = require('discord.js')

module.exports = {
    name: '485047',
    description: 'I need **help bri** :(',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        message.delete();
        var embed = new Discord.MessageEmbed()
        .setTitle('**I need **help bri** :(')
        .setURL("https://marquito523.github.io/ExFrame-Website/")
        .setDescription('So, when I run myself on the website, I get an error that mkes that I cannot play any musics. So marquito will send you the error')
        .setTimestamp()
    return message.channel.send(embed)

    }

}