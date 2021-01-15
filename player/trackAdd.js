const Discord = require("discord.js")

module.exports = (client, message, queue, track) => {
    message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.music} - ${track.title} has been added to the queue !`));
};