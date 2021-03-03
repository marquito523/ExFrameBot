const Discord = require("discord.js")

module.exports = {
    name: "botinfo",
    async execute(client, message, args){

        const Version = client.Version

        const prefix = client.prefix

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")
        try {
            var embed = new Discord.MessageEmbed()
                .setTitle('** ExFrame Help Information**')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                .addFields({
                    name: '**Bot Name**',
                    value: "ExFrame",
                    inline: true
                }, {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true
                }, {
                    name: '**Bot Users**',
                    value: `${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)}`,
                    inline: true
                },

                    {
                        name: ' **Guilds**',
                        value: `${client.guilds.cache.size}`,
                        inline: true
                    }, {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true
                }, {
                    name: '**Partners**',
                    value: `Exyno by <@334297339831255040>`,
                    inline: true
                },

                    {
                        name: '**Library**',
                        value: `Discord.js`,
                        inline: true
                    }, {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true
                }, {
                    name: `Bot Music Package`,
                    value: "Discord-Player",
                    inline: true
                },

                    {
                        name: '**Bot Status**',
                        value: `No bugs found`,
                        inline: true
                    }, {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true
                }, {
                    name: '**Version**',
                    value: Version,
                    inline: true
                },

                    {
                        name: '**Bot Owner**',
                        value: `<@546284284713893889>`,
                        inline: true
                    }, {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true
                }, {
                    name: '**Channels**',
                    value: `${client.channels.cache.size}`,
                    inline: true
                },
                )
                .setFooter("For anymore help, click the title.")

            return message.channel.send(embed)
        } catch (e) {
            return message.channel.send(new Discord.MessageEmbed().setDescription("Unexpected error occiered. Please try again"))
        }      
    }
}