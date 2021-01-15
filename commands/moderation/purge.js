
const Discord = require('discord.js')
purgeLimit = 100



module.exports = {
    name: 'purge',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        var Error = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge error**')
        .setColor('RANDOM')
        .setDescription(` :x: There was an error when deleting the messages!`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var NotNumber = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge error**')
        .setColor('RANDOM')
        .setDescription(` :x: ${args[0]} is not a number. Please try entering a valid number.`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var OverLimit = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge error**')
        .setColor('RANDOM')
        .setDescription(` :x: ${args[0]} is over the limit which is set to ${purgeLimit}`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var SuccesPurge = new Discord.MessageEmbed()
        .setTitle('**ExFrame Purge succes**')
        .setColor('RANDOM')
        .setDescription(` :white_check_mark: **Succesfully** deleted ${args[0]} message!`)
        .setFooter("ExFrame Purge command, developped by marquito523")
        .setTimestamp()

        var MissingPerm = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription(" :x: You **don't** have permission to do that. You need `MANAGE_MESSAGES` permission.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription(" :x: I **don't** have permission to do that. I need `MANAGE_MESSAGES` permission.")

        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(MissingPerm)


        if (!message.guild.me.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(BotWithoutPerms)

        if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: You need to specify an amount of messages to purge!"))

        if(isNaN(args[0])) return message.channel.send(NotNumber)

        if(args[0] > purgeLimit) return message.channel.send(OverLimit)

       try{
        message.channel.bulkDelete(args[0])

        message.channel.send(new Discord.MessageEmbed().setDescription(" :white_check_mark:  **Succesfully** deleted `" + args[0] + "` messages."))

       }catch(e){

        message.channel.send(new Discord.MessageEmbed().setDescription(" :x:  En error occiered. You may try again!"))

       }


            
        
    },

}