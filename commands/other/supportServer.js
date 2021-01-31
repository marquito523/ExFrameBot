const Discord = require('discord.js')

module.exports = {
    name: 'supportserver',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        var embed = new Discord.MessageEmbed()
        .setTitle('**ExFrame Support Server**')
        .setURL('https://discord.gg/6zqN4pWpnm')
        .setDescription('Join our support server for **Updates**, **Bugs**, **Information on the bot** and some help if you get into a bug or an error.')
        .setTimestamp()
    return message.channel.send(embed)


    }

}