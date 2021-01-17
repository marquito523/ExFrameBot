
const Discord = require('discord.js')


module.exports = {
    name: 'partners',
    description: 'gives Karlofs bot',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Exyno")
        .setDescription("Bot created by karlof002, it's great for any types of moderation tasks, and is very easy to use. I recommend you invite him! Plus you can now vote for him and his bot on Top.gg!")
        .setURL('https://discord.com/oauth2/authorize?client_id=689939340293701710&scope=bot&permissions=303557718')
    return message.channel.send(embed)
    }
}