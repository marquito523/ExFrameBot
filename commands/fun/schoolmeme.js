const Discord = require('discord.js')

module.exports = {
    name: 'school',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}
s

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        message.channel.send((new Discord.MessageEmbed().setDescription(`If you asked me the difference between school and life... \n I'd day in school you're taught a lesson and then given a test. \n And in life **you are given a test that teaches you a lesson**.`).setTitle("**True Facts**").setImage('https://cdn.discordapp.com/attachments/719203211134894151/782209853845536788/Capture_decran_2020-11-28_124157.png').setFooter("Reference: From Little Wonders")))
    }
}