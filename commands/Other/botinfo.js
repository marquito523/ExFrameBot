const Discord = require("discord.js");

module.exports = {
    name: "botinfo",
    async execute(client, message, args){

        let SR

        const msg = client.channels.cache.find(channel => channel.id === '835607342371700757')

        msg.messages.fetch("835774403421143071").then(MSG => {


      console.log(SR)

        const Version = client.Version
        const prefix = client.prefix

        const Website = client.Website

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")
        try {
            var embed = new Discord.MessageEmbed()
                .setTitle('** ExFrame Help Information**')
                .setURL(Website)
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
                        
                        value: ` ${MSG}`,
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
                        value: `Shadow Studios`,
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
            return message.channel.send(new Discord.MessageEmbed().setDescription("Error 404 | Statuses Unavailable. Please try again."))
        }  
      })    
    }
}