const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "supportserver",
  async execute(client, message, args){
    try{
        return message.channel.send(new MessageEmbed().setDescription("We have moved this to `" + client.prefix + "invite`. \n \n All Important Links are grouped there! \n \n **Why Did We Move It?** \n \n We moved it to avoid confusion within users, and to make it easier for future guild owners that would enjoy ExFrame's presence within their guild. This is a defenetive change and most likely will not reverse. Also this message will be removed shortly.").setTitle("New Location"))
    }catch(error){
        return message.channel.send(":x: Unexpected Error Occiered!")
    }
    }
}