const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")

module.exports = {
    name: "suggest",
    async execute(client, message, args) {

        const prefix = client.prefix

        let SuggestionChannelGuild

        const settings = await Guild.findOne({
    
            guildID: message.guild.id
    
        }, (err, guild) => {
    
            Pguild = guild
    
            if (err) console.error(err)
    
        })
    
        if (!Pguild) {
         SuggestionChannelGuild = "None"
        } else {
    
            if (!settings.SuggestionChannel) {
    
                SuggestionChannelGuild = "None"
    
            } else {
    
                SuggestionChannelGuild = settings.SuggestionChannel
            }
        }

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!args[0]) return message.channel.send((new Discord.MessageEmbed().setDescription(`The suggestion needs to contain a **suggestion** ;D`).setTitle("**An empty suggestion lol**")))

        if (SuggestionChannelGuild === "None") {

            if (!message.guild.channels.cache.find(channel => channel.name === 'suggestions')) return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: **No suggestion channel preset**, and no channels name "suggestions" within this guild! To preset suggestion, run ${prefix}setup-suggestion`)))


            const suggestionchannel = message.guild.channels.cache.find(channel => channel.name === 'suggestions')


            var suggestionguild = message.content.substring(`${prefix}suggest`.length)


            message.channel.send((new Discord.MessageEmbed().setTitle("**Your suggestion has been sent, thank you for suggesting!**")))
        } else {

            const UsedChannel = message.guild.channels.cache.get(SuggestionChannelGuild)

            if (!UsedChannel) return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Channel no longer exists Error 404!"))

            const ToSend = UsedChannel

            var suggestionguild = message.content.substring(`${prefix}suggest`.length)
            message.channel.send((new Discord.MessageEmbed().setTitle("**Your suggestion has been sent, thank you for suggesting!**")))

            try {
                return ToSend.send((new Discord.MessageEmbed().setDescription(`The sugestion has been sent by: ${message.author}\n **Suggestion**: \n\n ${suggestionguild}`).setTitle("**New Suggestion**")))
            } catch (e) {
                return message.channel.send((new Discord.MessageEmbed().setDescription(`An error happened`)))
            }
        }
    }
}