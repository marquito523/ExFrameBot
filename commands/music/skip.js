const Discord = require("discord.js")

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',

    execute(client, message) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You're not in a voice channel !`));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not in the same voice channel !`));

        if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - No music currently playing !`));

        try{

        client.player.skip(message);

        message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.success} - The current music has just been **skipped** !`));

        }catch(e){

            return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error occiered when executing the command"))


        }
    },
};