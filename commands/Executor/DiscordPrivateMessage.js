const { defaultprefix } = require("../../config.json")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const { Version } = require("../../config.json")
const pagination = require("discord.js-pagination")
const AI = require("./ArtificialIntelligence.json")
const SupportData = require("../Models/SupportData")


function GetRandomReply(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const Chosen = Math.ceil((Math.random() * (max - min)) + min);
    return Chosen
}

module.exports = {
    async execute(message, client) {

        const settings = await SupportData.findOne({

            Owner: message.author.id

        }, (err, Data) => {
            if (err) console.error(err)

            if (!Data) {
                return
            }
        });

        if (!settings)return 

        if(message.content === `${defaultprefix}start`){
            try{
                await settings.updateOne({
                ListeningSend : true
            })
            return message.channel.send("You ticket is now active. Anything you'll type here will be sent.");
        }catch(err){
            return message.reply(new MessageEmbed().setDescription("An error ocierred. Please retype the command."))
        }
        }

            if (settings.ListeningSend === false) return

            if(message.content === `${defaultprefix}end`){
                try{
                await settings.updateOne({

                    ListeningSend : false

                })
                return message.channel.send("Your ticket is now in silence mode. You will receive the replies from Admins, although anything you type here will not be sent to your ticket. To disable silence mode: `m!start` in DMs");
            }catch(err){
                return message.reply(new MessageEmbed().setDescription("An error ocierred. Please retype the command."))
            }
            }

        if (settings.ListeningSend === true) {


            const Content = message.content


            const guild = client.guilds.cache.find(guild => guild.id === '774018500330782722')

            const SibChannel = guild.channels.cache.find(channel => channel.name === message.author.id)

            if (SibChannel) {

                try {

                    let member = message.author

                    let avatar = member.displayAvatarURL({ size: 1024 })

                    SibChannel.send(new MessageEmbed().setDescription(`\n \n From: ${message.author} \n \n Contains: **${Content}** \n \n Additional Information: **No**`).setTitle(`Information Ticket Support`).setThumbnail(avatar).setTimestamp())

                } catch (err) {

                }

            }

        }
    }
}

async function ReplyMessage(client, message) {
    return message.reply(new MessageEmbed().setDescription("Artificial Intelligence Is Currently Being Added! Although, ExFrame's DMs are keepen closed for now, till we're done."))

    const prefix = defaultprefix

    const Website = client.Website

    if (message.content.startsWith(defaultprefix)) {
        return message.reply("You do not need to use prefix in DMs.")
    } else {
        if (message.content === "botinfo") {
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
        } else if (message.content === "help") {

            const Embed = new MessageEmbed()
                .setDescription("ExFrames' commands are available at [our website](https://marquito523.github.io/ExFrame-Website/generic.html).")
            message.reply(Embed)
        } else {
            //Artifical Intelligence Taking Place

            let i = 0

            let timevar = 10000
            message.content = message.content.toLowerCase();

            console.log(AI.Polite.Receives.Hellos.length)

            for (i = 0; i < AI.Polite.Receives.Hellos.length; i++) {
                console.log(i)
                console.log(AI.Polite.Receives.Hellos[i])
                if (message.content.includes(AI.Polite.Receives.Hellos[i])) {
                    ReplyHello(message, timevar = 100000, i = 0);
                    return
                }
            }
        }
    }




    async function ReplyHello(message, timevar, i) {


        const x = await message.channel.send(`${AI.Polite.Replys.Hellos[GetRandomReply(0, AI.Polite.Replys.Hellos.length - 1)]}`);

        await x.channel.awaitMessages(m => m.author.id === message.author.id,
            { max: 1, time: timevar, errors: ["time"], }
        ).then(async collected => {

            timevar = collected.first().content;

        }).catch(() => { return i++ })

        if (i > 0) return message.channel.send("Oh... You fergot me ):")

        timevar.toLowerCase();



        if (timevar.includes("not fine") || timevar.includes("bad") || timevar.includes("sad") || timevar.includes("not too well") || timevar.includes("more less") || timevar.includes("better") || timevar.includes("could be better") || timevar.includes("depressed")) {
            const v = await message.channel.send("Hm, what's wrong?")
            timevar = 100000
            i = 0
            await v.channel.awaitMessages(m => m.author.id === message.author.id,
                { max: 1, time: timevar, errors: ["time"], }
            ).then(async collected => {

                timevar = collected.first().content;

            }).catch(() => { return i++ })

            if (i > 0) return message.channel.send("You fergot me ): Please comeback!!!");

            return message.channel.send("I see, hope you'll feel better tomorrow... Anyways, remember your a great person!")
        }





        if (timevar.includes("fine") || timevar.includes("great") || timevar.includes("happy") || timevar.includes("increadible") || timevar.includes("fantastic") || timevar.includes("okay") || timevar.includes("ok") || timevar.includes("satisfied")) {
            if (timevar.includes("wby") || timevar.includes("hay") || timevar.includes("how about you") || timevar.includes("hby") || timevar.includes("what about you") || timevar.includes("and you") || timevar.includes("and u")) {
                message.channel.send("That's great to hear, I'm fine, thank you for asking!")
            } else {
                message.channel.send(`${AI.Polite.Replys.Hello_Positive_Replys[GetRandomReply(0, AI.Polite.Replys.Hello_Positive_Replys.length - 1)]}`)

            }
        }
    }
}