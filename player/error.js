const Discord = require("discord.js")

module.exports = (client, error, message) => {
    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

    switch (error) {
        case 'NotPlaying':
            message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - There is no music being played on this server !`));
            break;
        case 'NotConnected':
            message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not connected in any voice channel !`));
            break;
        case 'UnableToJoin':
            message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - I am not able to join your voice channel, please check my permissions !`));
            break;
        default:
            message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - Something went wrong ... Error : ${error}`));
    };
};
