const mongodb = require("mongoose")
const DeleteFile = require("../Executor/DeleteMessager");
const DiscordPrivateMessage = require('../Executor/DiscordPrivateMessage')
const Discord = require('discord.js');
const {
    defaultprefix,
    Enable_Console_Write_Commmand,
} = require("../../config.json")
const { MessageEmbed } = require("discord.js")
const Guild = require("../Models/Guild")
const SupportData = require("../Models/SupportData")


module.exports = {
    async execute(client, message) {
        if (message.author.id === client.user.id) return;
        if (message.author.bot) return;
        if (message.channel.type === 'dm') {
            return DiscordPrivateMessage.execute(message, client)
        }

        if (message.guild.id === "774018500330782722") {

            if (client.users.cache.find(user => user.id === message.channel.name)) {

                if(message.member.hasPermission('ADMINISTRATOR') && message.content === `${defaultprefix}close-ticket`){

                    let REV = false

                    const settings = await SupportData.findOne ({

                        Owner: message.channel.name
            
                    }, (err, Data) => {
                        if (err) console.error(err)
            
                        if (!Data) {
                            try{
                                 message.channel.delete(); 
                            }catch(err){

                                return console.log(err)

                            }
                        }else{
                            REV = true
                        }
                    });

                    if(REV === true){
                        await settings.updateOne({

                            ListeningSend : false

                        })
                        const SibChannel = client.users.cache.find(user => user.id === message.channel.name)

                        SibChannel.send(new MessageEmbed().setDescription(`\n \n Your ticket has now been closed. We hope our Support Team has found a solution to your issue.  \n \n **Ticket Terminator**: ${message.author} \n \n **Ticket Status**: Close`).setTitle("Ticket Termination").setTimestamp())

                        try{

                          return message.channel.delete(); 

                        }catch(err){

                        }
                    }

                    if(REV === true)return 

                }
                const Content = message.content

                const SibChannel = client.users.cache.find(user => user.id === message.channel.name)

                let member = message.author

                let avatar = member.displayAvatarURL({ size: 1024 })

                SibChannel.send(new MessageEmbed().setDescription(`\n \n From: ${message.author} \n \n Solution(s): **${Content}** \n \n Additional Information: **No**`).setTitle(`Ticket Reponse From Admin`).setThumbnail(avatar).setTimestamp())

            }
        }
        if (client.user.name === "MarqTest" && !message.guild.id === 774018500330782722) return
        //DATA_START
        let prefix
        let Pguild
        let SuggestionChannelGuild
        let JoinNotif
        let Filter

        if (!message.guild) {
            return message.reply(new discord.MessageEmbed().setDescription("An error occiered when writing a command. Error type: \n \n `Seems like the message was sent through DMs but wasn't recognized as it.`"))
        }
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            Pguild = guild
            if (err) console.error(err)
        })


        let AllowSend = true
        if(settings){
        const IgnoredChannels = settings.IgnoredChannels || []
    
    
        for(var i = 0; i < IgnoredChannels.length; i++){
            const ChannelID = message.channel.id
            if(IgnoredChannels[i] === ChannelID.toString()){
                return AllowSend = false
            }
        }
    }
    
        if (!Pguild) {
            prefix = defaultprefix
            SuggestionChannelGuild = "None"
            JoinNotif = false
            Filter = false
        } else {
            if (!settings.prefix) {
                prefix = defaultprefix
            } else {
                prefix = settings.prefix
            }
            if (!settings.Filter) {
                Filter = false
            } else {
                Filter = settings.Filter
            }
            if (!settings.SuggestionChannel) {
                SuggestionChannelGuild = "None"
            } else {
                SuggestionChannelGuild = settings.SuggestionChannel
            }
            if (!settings.JoinNotif) {
                JoinNotif = false
            } else {
                JoinNotif = settings.JoinNotif
            }
        }
        //DATA_END
        if (!message.guild) return
        if (message.content === `${prefix}`) return
        const args = message.content.substring(prefix.length).split(" ")
        if (message.content === `<@!${client.user.id}>`) {
            if (Enable_Console_Write_Commmand === true) console.log(`${message.author.username} has pinged ExFrame. => Id: ${message.author.id}`)
            if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }
            if (!message.guild.me.hasPermission("EMBED_LINKS")) {
                try {
                    return message.channel.send("Hello, I'm ExFrame \n My prefix in this guild is: `" + prefix + "` \n To start using my functionalities:`" + prefix + "`help \n \n**Warning**: *I do not have `EMBED_LINKS` permission. Without me having it, you can not use any commands!*")

                } catch (e) {
                    return message.channel.send("Unexpected error happened!")
                }
            } else {
                try {
                    let ExFrame = client.user
                    let avatar = ExFrame.displayAvatarURL({
                        size: 1024
                    })
                    return message.channel.send(new Discord.MessageEmbed().setDescription("Hello, I'm ExFrame \n My prefix in this guild is: `" + prefix + "` \n To start using my functionalities: `" + prefix + "help`.").setTitle("ExFrame").setTimestamp().setThumbnail(avatar))
                } catch (e) {
                    return message.channel.send(":x: Unexpected error happened when running the command!")
                }
            }
        }

        let FilterTextMessage = message.content.toLowerCase()
        if (FilterTextMessage.includes("fuck") || FilterTextMessage.includes("shit") || FilterTextMessage.includes("fock") || FilterTextMessage.includes("nerd") || FilterTextMessage.includes("nigger") || FilterTextMessage.includes("niggor") || FilterTextMessage.includes("nigar") || FilterTextMessage.includes("nig") || FilterTextMessage.includes("mdafucker") || FilterTextMessage.includes("fuckyou") || FilterTextMessage.includes("nigeria") || FilterTextMessage.includes("bitch") || FilterTextMessage.includes("bich") || FilterTextMessage.includes("b***") || FilterTextMessage.includes("f***") || FilterTextMessage.includes("putain") || FilterTextMessage.includes("ta mere") || FilterTextMessage.includes("Ta mere") || FilterTextMessage.includes("ta mère") || FilterTextMessage.includes("Ta mère") || FilterTextMessage.includes("nique") || FilterTextMessage.includes("wtf")) {
            if (Filter === true) {
                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have permissions to delete messages.")

                DeleteFile.execute(message)
            }
        }
    }
}
