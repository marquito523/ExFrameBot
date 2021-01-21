const { execute } = require("../moderation/addrole");

const Discord = require("discord.js")

module.exports = {
    name: "data",
    async execute(client, message,args){

return message.channel.send(":soon:  Soon Available!")
    }
}