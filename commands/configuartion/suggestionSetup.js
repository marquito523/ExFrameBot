const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setupsuggestion",
    async execute(client, message, args){

        if(!message.member.hasPermission(`MANAGE_GUILD`))return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You do not have permission to run this command!"))

        const channel = message.mentions.channels.first();

        if(!channel)return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No channels given!"))

        try{
         db.set(`guild_${message.guild.id}_SuggestionChannel`, channel)

        return message.channel.send(new Discord.MessageEmbed().setDescription(":white_check_mark:  Succesfully set " + channel.name + " as suggestion channel!"))
        }catch(e){

            return message.channel.send(":x: Unexpected error happened!")

        }

        
    }
}