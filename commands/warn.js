const Discord = require('discord.js');

module.exports = {
    name: "warn",
    execute ( message, args) {
        
    var missingPermissionsEmbed = new Discord.MessageEmbed() // Creates the embed thats sent if the user is missing permissions
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.MessageEmbed() // Creates the embed thats sent if the command isnt run right
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `warn + @User + Reason (reson required)')
        .setTimestamp();
        
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
   
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
   
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning
 
    var warningEmbed = new Discord.MessageEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    var warnSuccessfulEmbed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setTitle('User Successfully Warned!');
    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
    message.delete(); // Deletes the command
}

}