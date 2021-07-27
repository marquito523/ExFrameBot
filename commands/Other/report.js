const Discord = require("discord.js")

module.exports = {
    name: "report",
    async execute(client, message, args){

        const prefix = client.prefix
        
        const Command = prefix + "report"

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!args[0]) return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: The report needs to contain a cause/reason/bug`).setTitle("**Missing Arguments**")))


        const Rchannel = client.channels.cache.find(channel => channel.id === '777795461720309761')


        var Report = message.content.substring(Command.length)


        var member = message.author


        message.channel.send((new Discord.MessageEmbed().setTitle("Report Sent!").setDescription("Check your DMs for further information. \n \n If you have no received any DMs, this means your report hasn't been send, or has been blocked!")))
        member.send((new Discord.MessageEmbed().setDescription("Your report has **succesfully** been sent to **ExFrame's support server**. If developpers need more information, you will receive a DM. Thanks for Reporting! \n \n **Report Contains**: `" + Report + "`\n Report sent by " + member.username).setFooter("Report sent at").setTimestamp()))
        try {


            return Rchannel.send((new Discord.MessageEmbed().setDescription(`The sugestion has been sent by: ${message.author}\n \n**The report was sent from**: ${message.channel.guild.name}\n  \n**report**: \n\n ${Report}`).setTitle("**New Report**")))


        } catch (e) {


            return message.channel.send((new Discord.MessageEmbed().setDescription(`An error happened`)))
        }
    }
}