const Discord = require("discord.js");
const db = require('quick.db')
const {

    Client

} = require('discord.js');

const client = new Client({

    disableEveryone: true

})

module.exports = {
    name: 'help',
    async execute(client, message) {

        const prefix = db.get(`guild_${message.guild.id}_prefix`) || 'm!';

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")



        if (message.content === `${prefix}help`) {

            if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


            var embed = new Discord.MessageEmbed()
                .setTitle('**ExFrame help**')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .addFields(


                    { name: ':tools: **Moderation**', value: "`More info:  " + prefix + "help moderation`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: ' :rofl:   **Fun**', value: "`More info: " + prefix + "help fun`", inline: true },

                    { name: ' 🔊 ** Music**', value: "`More info: " + prefix + "help music`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: ':gear:** Other**', value: "`More info: " + prefix + "help other`", inline: true },

                )
                .setFooter(`For more information: ${prefix} + "help" + Category Name | example: ${prefix}help music`)

            try {

                return message.channel.send(embed)

            } catch (e) {

                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

            }

        } else if (message.content === `${prefix}help fun`) {

            var embed = new Discord.MessageEmbed()
                .setTitle('**:rofl: ExFrame Fun :rofl:**')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .setTimestamp()
                .addFields(


                    { name: '**Slap**', value: "`Do: " + prefix + "slap @user`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Rate**', value: "`Do: " + prefix + "rate @user`", inline: true },

                    { name: ' **rolldice**', value: "`Do: " + prefix + "rolldice + number`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**ID**', value: "`Do: " + prefix + "id @user`", inline: true },

                    { name: '**Meme**', value: "`Do: " + prefix + "meme or rocketleague/fortnite`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Weather**', value: "`Do: " + prefix + "weather + city`", inline: true },

                    { name: '**count**', value: "`Do: " + prefix + "count`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Money**', value: "`Do: " + prefix + "balance`", inline: true },

                    { name: '**Game**', value: "`Do: " + prefix + "game`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Soon**', value: "`Do: " + prefix + "Soon`", inline: true },


                )
                .setFooter("For anymore help, click the title.")
            try {
                return message.channel.send(embed)
            } catch (e) {
                return channel.send((new Discord.MessageEmbed().setDescription(` :x: ${message.author}, we are sorry but seems like there was an error when executing the command!`)))
            }


        } else if (message.content === `${prefix}help moderation`) {

            var embed = new Discord.MessageEmbed()
                .setTitle('**:tools: ExFrame Moderation :tools: **')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .setTimestamp()
                .addFields(


                    { name: '**Kick**', value: "`Do: " + prefix + "kick @user`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Ban**', value: "`Do: " + prefix + "ban @user`", inline: true },

                    { name: ' **Slow Mode**', value: "`Do: " + prefix + "slowmode +  Time`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '** AddRole/RemoveRole**', value: "`Do: " + prefix + "addrole/removerole + @user + @role`", inline: true },

                    { name: '**Warn **' + prefix + 'help warn', value: "`Do: " + prefix + "warn @user reason`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Purge**', value: "`Do: " + prefix + "purge + Amount of messages`", inline: true },

                    { name: '**Filter** ', value: "`Do: " + prefix + "enable/disable-filter`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Change Prefix**', value: "`Do: " + prefix + "prefix + new prefix`", inline: true },

                    { name: '**Join Message (DM)** ', value: "`Do: " + prefix + "join-message + [message]` more help " + prefix + "help join-message", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Join notif (guild)**', value: "`Do: " + prefix + "enable/disable-join-notif + channel`", inline: true },

                    { name: '**Default Role** ', value: "`Do: " + prefix + "set-default-role + [Role]/ disable-default-role`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Suggestion Setup**', value: "`Do: " + prefix + "setupsuggestion + [#Channel]`", inline: true },


                )
                .setFooter("For anymore help, click the title.")
            try {
                return message.channel.send(embed)
            } catch (e) {
                return channel.send((new Discord.MessageEmbed().setDescription(` :x: ${message.author}, we are sorry but seems like there was an error when executing the command!`)))
            }

        } else if (message.content === `${prefix}help other`) {

            var embed = new Discord.MessageEmbed()
                .setTitle('**:gear: Other :gear:**')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .setTimestamp()
                .addFields(


                    { name: '**Suggest**', value: "`Do: " + prefix + "suggest`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Report**', value: "`Do: " + prefix + "report [bug]`", inline: true },

                    { name: ' **Invite**', value: "`Do: " + prefix + "invite`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**InfoUser/Avatar**', value: "`Do: " + prefix + "id @user/avatar @user`", inline: true },

                    { name: '**Hello**', value: "`Do: " + prefix + "Hello + whatever`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Partner Bots**', value: "`Do: " + prefix + "Partners`", inline: true },

                    { name: '**weather**', value: "`Do: " + prefix + "weather + city`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Bot Information**', value: "`Do: " + prefix + "bot info`", inline: true },

                    { name: '**Buy**', value: "`Do: " + prefix + "buy + artricle`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Article List**', value: "`Do: " + prefix + "help article list`", inline: true },


                )
                .setFooter("For anymore help, click the title.")
            try {
                return message.channel.send(embed)
            } catch (e) {
                return channel.send((new Discord.MessageEmbed().setDescription(` :x: ${message.author}, we are sorry but seems like there was an error when executing the command!`)))
            }

        } else if (message.content === `${prefix}help music`) {

            var embed = new Discord.MessageEmbed()
                .setTitle('**🔊 ExFrame Help 🔊 **')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .setTimestamp()
                .addFields(


                    { name: '**Skip** Skips the current song', value: "`Do " + prefix + "skip`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Stop** Leaves VC', value: "`Do " + prefix + "stop`", inline: true },

                    { name: ' **Play** Plays the song you want', value: "`Do " + prefix + "play [song title]/ play [Youtube URL]`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Volume**', value: "`Do " + prefix + "volume [number]`", inline: true },

                    { name: '**Loop**loops through the song', value: "`Do " + prefix + "np`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Queue**=> Shows next musics', value: "`Do " + prefix + "queue`", inline: true },

                    { name: '**Resume** Unpauses the song', value: "`Do " + prefix + "resume`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Pause** pauses the music', value: "`Do " + prefix + "pause`", inline: true },

                    { name: '**Clear-queue** clears the queue', value: "`Do " + prefix + "clear-queue`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Debug** More info ' + prefix + 'help debug', value: "`Do " + prefix + "debug`", inline: true },

                    { name: '**Now Playing** shows current song', value: "`Do " + prefix + "np`", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**Suffle** Leaves VC', value: "`Do " + prefix + "shuffle`", inline: true },


                )
                .setFooter("For anymore help, click the title.")

            try {

                return message.channel.send(embed)

            } catch (e) {

                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

            }


        } else if (message.content === `${prefix}help debug`) {

            try {

                return message.channel.send((new Discord.MessageEmbed().setDescription("Debug is a tool that will allow you to fix music bugs. In fact music bugs can occire any time, and with debug you have chance of fixing it. \n \n **Usage**: You can only use it when you have a queue. No matter if the bot is playing any song. You only need a queue. Sometimes a queue will creat itself, as you asked it to, but the bot won't join, and you will be unable to use stop command. Debug will be very useful in this moment, since debug will remove the queue.").setTitle("**Debug**").setTimestamp()))

            } catch (e) {
                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))
            }

        } else if (message.content === `${prefix}help role`) {

            try {

                return message.channel.send((new Discord.MessageEmbed().setDescription("**Role Adding**: \n \n  `" + prefix + "addrole` + `Mention Member` + `Mention Role` \n **Example**: m!addrole @marquito523 @TestRole \n \n **Remove Role** \n \n `" + prefix + "removerole` + `Mention Member` + `Mention Role` \n **Example**: " + prefix + "removerole @marquito523 @TestRole").setTitle("**Role Adding and Role Removing**").setTimestamp()))

            } catch (e) {

                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

            }

        } else if (message.content === `${prefix}help warn`) {

            try {

                return message.channel.send(new Discord.MessageEmbed().setDescription("**Requirements:** \n \n In order to use this command you need to have ``MANAGE_MESSAGES`` permitions. \n \n **Usage**: In order to user this you need to provide the prefix, warn mention of the user, and a reason, if any of these is missing, you will have an error message returned and warn will not be sumbitted. \n\n `prefix + mute + mention of User + Reason`").setTitle(`Mute Usage`).setThumbnail().setTimestamp())

            } catch (e) {

                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

            }
        } else if (message.content === `${prefix}help join-message`) {

            try {

                message.channel.send(new Discord.MessageEmbed().setDescription("**For What?** \n \nThis feature will let you edit the message that is sent to a user when he join this guild. \n \n**requirements** \n \n In order to use this command you have to have at least `MANAGE_GUILD` permission. \n \n**Usage** \n \n `" + prefix + "join-message + [new join message]`").setTimestamp())

            } catch (e) {

                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

            }
        } else if (message.content === `${prefix}help entries`) {

            try {
                return message.channel.send(new Discord.MessageEmbed().setDescription("Entries will allow you to participate to games that will reward you Framits. With Framits you can unlock many different features of the bot. You can alos get to buy Entries with Framits.").setTitle("**Entries**").setTimestamp())

            } catch (e) {
                return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))
            }
        }
    }


}






