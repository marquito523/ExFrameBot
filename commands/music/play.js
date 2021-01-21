const Discord = require("discord.js")

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You're not in a voice channel !`));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not in the same voice channel !`));

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - Please indicate the title of a song !`));

        try{

        client.player.play(message, args.join(" "));

        }catch(e){
            return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error occiered when executing the command"))
        }
    },
};