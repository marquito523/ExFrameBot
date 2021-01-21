module.exports = {
    name: 'maybe',
    description: 'Rates a user',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        message.channel.send("yes ofc")

    }
    }