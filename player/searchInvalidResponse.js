const Discord = require("discord.js")

module.exports = (client, message, query, tracks, content, collector) => {
    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

    message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`));
};