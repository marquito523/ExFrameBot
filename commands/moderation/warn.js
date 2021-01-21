const Discord = require('discord.js');
module.exports = {
    name: 'warn',
    description: 'n',
     execute(client, message, args) {

        

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if(!args[2])return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: You need to provide a reason!"))

        
        var embedColor = '#ffffff' // Change this to change the color of the embeds!

        var missingPermissionsEmbed = new Discord.MessageEmbed() // Creates the embed thats sent if the user is missing permissions
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Insufficient Permissions!')
            .setDescription(' :x: You need the `MANAGE_MESSAGES` permission to use this command!')
            .setTimestamp();
        var missingArgsEmbed = new Discord.MessageEmbed() // Creates the embed thats sent if the command isnt run right
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Missing Arguments!')
            .setDescription(' :x: You have to submit a reason. For more information, m!infowarn')
            .setTimestamp();
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
        let mentioned = message.mentions.users.first(); // Gets the user mentioned
        if (!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
        let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if (!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

        var warningEmbed = new Discord.MessageEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been warned in ${message.guild.name}`)
            .addField('Warned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        mentioned.send(warningEmbed); // DMs the user the above embed!

            try{
                message.delete();          

             message.channel.send(new Discord.MessageEmbed().setDescription(`:white_check_mark: User was warned succesfully.`).setTitle("Succes"))
            
            }catch(e){

                return message.channel.send(":x: Unexpected error! Error 432 For more information m!help errors")

            }

    }
}
