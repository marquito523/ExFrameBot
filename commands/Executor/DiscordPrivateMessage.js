const { defaultprefix } = require("../../config.json")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const { Version } = require("../../config.json")
const pagination = require("discord.js-pagination")

module.exports = {
    async execute(message, client){

        const prefix = defaultprefix

        if(message.content.startsWith(defaultprefix)){
            return message.reply("You do not need to use prefix in DMs.")
        }else{
            if(message.content === "botinfo"){
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
        
                    return message.reply(embed)
                } catch (e) {
                    return message.reply(new Discord.MessageEmbed().setDescription("Unexpected error occiered. Please try again"))
                }   
            }else if(message.content === "help"){

                const Embed = new MessageEmbed()
                .setDescription("ExFrames' commands are available at [our website](https://marquito523.github.io/ExFrame-Website/generic.html).")
                message.reply(Embed)
            }else{
                return message.channel.send("This command wasn't recognized or isn't executable in DMs.")
            }
        }
    }
}