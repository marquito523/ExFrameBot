const Discord = require("discord.js");
var count = 0

module.exports = {
  name: 'count',
  description: 'gives Karlofs bot',
  async execute(client, message, args) {

    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

      count = count + 1
      message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} counted! Count is at ${count}`))
      if(count === 1000){
        message.channel.send(new Discord.MessageEmbed().setDescription(`:partying_face: ${message.author} sent the 1000th count! :partying_face: `))
      }
     }
}