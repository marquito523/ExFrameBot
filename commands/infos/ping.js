module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(client, message) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")
        message.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms**`);
    },
};