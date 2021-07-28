const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
module.exports = {
    name: "join",
    async execute(client, message, args){
        if (message.guild.me.voice.channel)return message.channel.send(new MessageEmbed().setDescription("Seems like I already am connected to a voice channel at the moment."))

        if(!message.member.voice.channel)return message.channel.send(new MessageEmbed().setDescription("You are not in any voice channels!"));

        try{

            var connection = await message.member.voice.channel.join();
            
            return message.channel.send(new Discord.MessageEmbed().setDescription(":white_check_mark: Succes!"));

        }catch(e){

            return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: There was an error when joining VC."));

        }
    }
}