const Discord = require("discord.js");
const {

    Client

} = require('discord.js');
const pagination = require('discord.js-pagination');


module.exports = {
    name: 'help',
    async execute(client, message) {

        const Website = client.Website

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        const prefix = client.prefix

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")



        if (message.content === `${prefix}help`) {

            if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


            const moderation = new Discord.MessageEmbed()
            .setTitle(`Moderation`)
            .setURL(Website)
            .addField(`More information at ${prefix}help moderation`, "Moderation Help")
            .addField(`Kick`, `Kicks a member. Usage: ${prefix}kick <@user> [reason]`)
            .addField(`Ban`, `Bans a member. Usage: ${prefix}ban <@user> [reason]`)
            .addField(`Purge`, `Clear messages. Usage:${prefix}purge <message count>`)
            .addField(`Slowmode`, `Adjusts slowmode. Usage: ${prefix}slowmode <time> (seconds)`)
            .addField(`Setprefix`, `Sets the bot prefix. Usage: ${prefix}prefix <new prefix>`)
            .addField(`Warn`, `Warns a user. Usage: ${prefix}warn <reason>`)
            .addField("React below to change the pages!", "React with a reaction to skip or go to the previous page")
            .setTimestamp()

        const fun = new Discord.MessageEmbed()
            .setTitle(`Fun`)
            .setURL(Website)
            .addField(`More information at ${prefix}help fun`, "Fun Help")
            .addField(`[NEW] Rocket League Commands!`, `${prefix}help rocket league`)
            .addField(`Meme`, `Generates a random meme. Usage: ${prefix}meme`)
            .addField(`Slap`, `Slaps a user. Usage: ${prefix}slap <@user>`)
            .addField(`avatar`, `Disaplayes the avatar of a user. Usage: ${prefix}avatar`)
            .addField(`Rocket League`, `Generates a random rocket league meme. Usage: ${prefix}rocketleague`)
            .addField(`Fortnite`, `Generates a random fortnite meme. Usage: ${prefix}fortnite`)
            .addField(`Game`, `Starts a fast type game. Usage${prefix}game`)
            .addField(`ID`, `Gives the user's id. ${prefix}id <@user>`)
            .addField(`Record`, `[BETA]Go into a VC Chat and record your voice. ${prefix}record`)
            .addField(`Play Recording`, `[BETA]Listen to your recording! ${prefix}listen-audio`)
            .addField("Covid", `Gives the Covid Amount in a country. Usage: ${prefix}covid <country>`)
            .addField("Rocket Leauge Trade Set", `Sets your 3 items on rocket league that you offer. Usage: ${prefix}trade`)
            .addField("Rocket Leauge Trade Find", `Finds a trade for you. Usage: ${prefix}find-trade`)
            .addField("Rocket League Rank", `Set your Rocket League Rank. Usage: ${prefix}rank`)
            .addField("React below to change the pages!", "React with a reaction to skip or go to the previous page")
            .setTimestamp()

        const utility = new Discord.MessageEmbed()
            .setTitle(`Utlity`)
            .setURL(Website)
            .addField(`More information at ${prefix}help other`, "Utility Help")
            .addField(`Help`, `Shows this menu. Usage: ${prefix}help`)
            .addField(`Bot Information`, `Gives you information about ExFrame. Usage: ${prefix}botinfo`)
            .addField(`Ping`, `Get your latency. Usage: ping`)
            .addField(`Weather`, `See how is weather going in any location. Usage: ${prefix}weather <city>`)
            .addField(`Avatar`, `Shows your avatar, good if you lost it. Usage: ${prefix}avatar <@user>`)
            .addField(`Calculator`, `Calculates an expression. Usage: ${prefix}calculate <expression>`)
            .addField(`Support`, `Contact Support. Usage: ${prefix}support (proceeds to DMs)`)
            .addField("React below to change the pages!", "React with a reaction to skip or go to the previous page")
            .setTimestamp()

            const configuration = new Discord.MessageEmbed()
            .setTitle(`Configuration`)
            .setURL(Website)
            .addField(`More information at ${prefix}help moderation`, "Configuration Help")
            .addField(`Default Role`, `Adds the role to a new member.. Usage: ${prefix}set-default-role <@role>`)
            .addField(`Filter Text`, `Filters Message and tracks swears. Usage: ${prefix}enable-filter/disable-filter`)
            .addField(`Join Notification`, `Sends a notification on a channel on join!. Usage: ${prefix}enable/disable-join-notif <channel>`)
            .addField(`Suggestion-Setup`, `Defines the channel for suggestions. Usage: ${prefix}setupsuggestion <channel>`)
            .addField(`Join Private Message`, `Sets a custom message and sends it to a member. Usage: ${prefix}join-message <text>`)
            .addField("React below to change the pages!", "React with a reaction to skip or go to the previous page")
            .setTimestamp()

            const music = new Discord.MessageEmbed()
            .setTitle(`Music`)
            .setURL(Website)
            .addField(`More information at ${prefix}help music`, "Music Help")
            .addField(`Play`, `Adds or plays a music in VC. Usage: ${prefix}play <url/song titile>`)
            .addField(`Stop`, `Ends the queue. Usage: ${prefix}stop`)
            .addField(`Skip`, `Skips the current song and plays the next.. Usage: ${prefix}skip`)
            .addField(`Shuffle`, `Shuffles the song. Usage: ${prefix}shuffle`)
            .addField(`Queue`, `Shows the song within the queue. Usage: ${prefix}queue`)
            .addField(`np`, `Gives all the information about the song playing. Usage: ${prefix}np`)
            .addField(`Pause`, `Pauses the current song. Usage: ${prefix}pause`)
            .addField(`Resume`, `Resumes the current song. Usage: ${prefix}np`)
            .addField(`Volume`, `Sets a volume 0-250. Usage: ${prefix}volume <intensity>`)
            .addField("React below to change the pages!", "React with a reaction to skip or go to the previous page")
            .setTimestamp()


        const pages = [
            utility,
            fun,
            moderation,
            configuration,
            music
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = `100000`;

        pagination(message, pages, emojiList, timeout)


        } else if (message.content === `${prefix}help fun`) {

            var embed = new Discord.MessageEmbed()
                .setTitle('**:rofl: ExFrame Fun :rofl:**')
                .setURL(Website)
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
                    { name: '**Covid**', value: "`Do: " + prefix + "covid <country>`", inline: true },

                    { name: '**Trade (rocket league)**', value: "`Do: " + prefix + "trade`(more information at " + prefix + "help-find-trade)", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '**find-trade (rocket league)**', value: "`Do: " + prefix + "find-trade` (more information at " + prefix + "help-find-trade)", inline: true },


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
                .setURL(Website)
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
                    { name: '**Suggestion Setup**', value: "`Do: " + prefix + "setupsuggestion + <#Channel>`", inline: true },


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
                .setURL(Website)
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
                .setURL(Website)
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
        }else if(message.content === `${prefix}help rocket league`){
            const RocketLeagueMessage1 = new Discord.MessageEmbed().setDescription('\n Welcome to ExFrame\'s Rocket League® Commands! \n \n Any commands specified here are Rocket League® related. \n \n [Join Rocket League® Support Server Using This Link](https://discord.gg/gaAhfuMUX3)\n \n [Visit Rocket League®\'s Official Website](https://www.rocketleague.com/fr/) \n \n **Trading System** \n \n Within our trading system, we have a few rules, in addition to Rocket League®\'s Trading Rules. Scams will be taken in count, but we do not take any responsabitily within lose of item. Any Profile getting reported for a scam will be inspected. ExFrame\'s Rocket League Trading uses Rocket League\'s TOS. Please Respect any of does when using ExFrame. Rocket League Trading System will find you a user to trade with depending on what item you want to trade and you want to gain. \n \n **Set Items To Trade** \n \n To set items to trae (meximum 3 at a time) you need to type in `' + prefix + 'trade` and select the slot you would like to set an item to. Remember that the spelling counts in our algorythem. Once you have done that, <users on the same plateform as you, and looking for the same item(s) that you are offering will find your profile. He will then be able to contact you. Remember to keep your DMs open. \n \n **Find Trade** \n \n Find Trade feature is the actually time where you get to proceed to find a trader trading items that you are searching for. The algorythem will try and drag you to the most optimized trade. 3 results will be sent back. Each result are from one different slot. This makes it the most probably to find a trade. Remember, this feature is quite new, you might not find any traders yet. Please be patient.')
            .setTitle('**Rocket League Commands**')
            .setThumbnail('https://cdn.discordapp.com/attachments/774018501026643990/834065842517704714/Capture_decran_2021-04-20_155859.png')
            .setFooter('Page 1/2')
            const RocketLeagueMessage2 = new Discord.MessageEmbed().setDescription('\n **Rocket League Rank** \n \n Rocket League Rank is a feature that will allow you to display your rank on your profile, allowing other users to see it, and possibly, to find teammates. To set your rank type `' + prefix + 'rank` \n \n **Rocket League Memes** \n \n Rocket League Memes is feature that will allow you to access RL memes via Discord. **These memes do not belong to us** and can be found [here](https://www.reddit.com/r/RLEmemes/). To display these memes use the command `' + prefix + 'rocketleague`. \n \n *Rocket League Developpped By Psyonix* \n \n *ExFrame Policy* \n \n *ExFrame & Psyonix Terms Of Service (TOS)* \n \n *Command Credits: marquito523* \n \n *Command Target: Rocket League Psyonix*')
            .setTitle('**Rocket League Commands**').setThumbnail('https://cdn.discordapp.com/attachments/774018501026643990/834065842517704714/Capture_decran_2021-04-20_155859.png')
            .setFooter('Page 1/2')


            const pages = [
                RocketLeagueMessage1,
                RocketLeagueMessage2,
            ]
    
            const emojiList = ["⏪", "⏩"];
    
            const timeout = `100000`;
    
            pagination(message, pages, emojiList, timeout)
        }
    }


}






