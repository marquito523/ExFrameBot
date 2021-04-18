const Discord = require("discord.js")
module.exports = {
    name: "jonas",
    async execute(client, message, args){
        const prefix = client.prefix
        return message.channel.send(new Discord.MessageEmbed().setDescription("Hello jonas!"))
    }
}