const Discord = require("discord.js")

module.exports = (client, message, query) => {
    message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - No results found on YouTube for ${query} !`));
};