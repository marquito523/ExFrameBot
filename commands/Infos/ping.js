const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping', 

    execute(client, message) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const ping = client.ws.ping

        let emoji

        if(ping < 150){
            emoji = "🌐"
        }else if(ping > 150 && ping < 200){
            emoji = client.emoji.error
        }else{
            emoji = "🚫"
        }

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")
        return message.channel.send(new MessageEmbed().setDescription(`${emoji} - Ping : \`${ping}\` ms`));
    },
};