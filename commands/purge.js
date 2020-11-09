const prefix = "!"
const Discord = require('discord.js')
purgeLimit = 100



module.exports = {
    name: 'purge',
    description: 'show an example of ping command',
    execute(message, args) {

        var Error = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge error**')
        .setColor('RANDOM')
        .setDescription(`There was an error when deleting the messages!`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var NotNumber = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge error**')
        .setColor('RANDOM')
        .setDescription(`${args[0]} is not a number. Please try entering a valid number.`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var OverLimit = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge error**')
        .setColor('RANDOM')
        .setDescription(`${args[0]} is over the limit which is set to ${purgeLimit}`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var SuccesPurge = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge succes**')
        .setColor('RANDOM')
        .setDescription(`**Succesfully** deleted ${args[0]} message!`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var MissingPerm = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("You **don't** have permission to do that.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("I **don't** have permission to do that.")

        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(MissingPerm)


        if (!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.channel.send(BotWithoutPerms)

        if(isNaN(args[0])) return message.channel.send(NotNumber)

        if(args[0] > purgeLimit) return message.channel.send(OverLimit)

        message.channel.bulkDelete(args[0])

        .then(message.channel.send(SuccesPurge).then(
             message.delete({ timeout: 10000})))

            .catch(error => message.channel.send(Error))
        
            
        
    },

}