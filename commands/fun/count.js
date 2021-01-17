const Discord = require("discord.js");
var count = 0

module.exports = {
  name: 'count',
  description: 'gives Karlofs bot',
  async execute(client, message, args) {

    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

      count = count + 1
      message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} counted! Count is at ${count}`))
      if(count === 1000){
        message.channel.send(new Discord.MessageEmbed().setDescription(`:partying_face: ${message.author} sent the 1000th count! :partying_face: `))
      }
     }
}