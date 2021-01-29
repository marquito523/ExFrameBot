
const Discord = require('discord.js')


module.exports = {
    name: 'partners',
    description: 'gives Karlofs bot',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Exyno")
        .setDescription("Bot created by karlof002, it's great for any types of moderation tasks, and is very easy to use. I recommend you invite him! Plus you can now vote for him and his bot on Top.gg!")
        .setURL('https://discord.com/oauth2/authorize?client_id=689939340293701710&scope=bot&permissions=303557718')
    return message.channel.send(embed)
    }
}