const Discord = require("discord.js")

module.exports = (client, message, track) => {
    message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.music} - Now playing ${track.title} into ${message.member.voice.channel.name}`));
};