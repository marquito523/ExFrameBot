const moment = require('moment')
const Discord = require('discord.js')

module.exports = {
    name: 'memberinfo',
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You need to provide a user!"))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No members found!"))



    

        var embed = new Discord.MessageEmbed()
            .setTitle('**Member Information**')
            .setTimestamp()
            .addFields(


                { name: '**User Ping**', value: `<@${member.id}>`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '**User ID**', value: `${member.id}`, inline: true },

                { name: '**User Username**', value: `${member.user.username}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '**User Online Status**', value: `${member.presence.status}`, inline: true },

                { name: '** Joined Discord At **', value:   moment(member.user.createdAt), inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: ' ** Joined Server At**', value: moment(member.joinedAt).format('LLLL'), inline: true },
            )
            .setFooter("For anymore help, click the title.")
        try {
            return message.channel.send(embed)
        } catch (e) {
            return channel.send((new Discord.MessageEmbed().setDescription(` :x: ${message.author}, we are sorry but seems like there was an error when executing the command!`)))
        }


    }
}


