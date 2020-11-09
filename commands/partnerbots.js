const prefix = "!"
const Discord = require('discord.js')


module.exports = {
    name: 'invites',
    description: 'gives Karlofs bot',
    execute(message, args) {
        var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("I'm in a comptetion with that bot. He is made by a friend. The bot is cool go invite him through this link! It's Exyno.")
        .setURL('https://discord.com/oauth2/authorize?client_id=689939340293701710&scope=bot&permissions=303557718')
    return message.channel.send(embed)
    }
}