const Discord = require("discord.js")

module.exports = (client, message, queue) => {
    message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - Music stopped as there is no more member in the voice channel !`));
};