const Discord = require("discord.js")

module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You're not in a voice channel !`));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not in the same voice channel !`));

        if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - No music currently playing !`));

        if (!args[0] || isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - Please enter a valid number !`));

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 300) return message.channel.send(new Discord.MessageEmbed().setDescription(client.emotes.error + " - Please enter a valid number between `1` and `300` !"));

        try{

        client.player.setVolume(message, args[0]);

        message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.success} - Volume set to **${parseInt(args[0])}%** !`));

        }catch(e){

            return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error occiered when executing the command"))


        }
    },
};