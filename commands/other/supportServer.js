const Discord = require('discord.js')

module.exports = {
    name: 'supportserver',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
        .setTitle('**ExFrame Support Server**')
        .setURL('https://discord.gg/6zqN4pWpnm')
        .setDescription('Join our support server for **Updates**, **Bugs**, **Information on the bot** and some help if you get into a bug or an error.')
        .setTimestamp()
    return message.channel.send(embed)


    }

}