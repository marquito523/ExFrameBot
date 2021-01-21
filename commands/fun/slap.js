
const Discord = require('discord.js')
ChosenImage = 1


module.exports = {
    name: 'slap',
    description: 'slaps someone',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        const user = message.mentions.users.first(); // This says if you mention this user, it is talking about that user

        if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You have not provided a valid user to slap!"))

            const member = message.guild.member(user);

            if (member) {
                if (ChosenImage === 1) {
                    ChosenImage = 2
                    var embed = new Discord.MessageEmbed()
                        .setTitle('**ExFrame Slaping**')
                        .setDescription(`${member}, you have been slapped by ${message.author} \n You should probably get **revenge** on him, don't you think so? : )`)
                        .setTimestamp()
                        .setImage('https://cdn.discordapp.com/attachments/774931587179085824/774931870189486090/Capture_decran_2020-11-02_114651.png')
                        .setFooter("Slap panel, developed by marquito523")
                    return message.channel.send(embed)
                } else {
                    ChosenImage = 1
                    var embed = new Discord.MessageEmbed()
                        .setTitle('**ExFrame Slaping**')
                        .setDescription(`${member}, you have been slapped by ${message.author} \n You should probably get **revenge** on him, don't you think so? : )`)
                        .setImage('https://cdn.discordapp.com/attachments/774931587179085824/774931882034855936/Capture_decran_2020-11-02_114712.png')
                        .setTimestamp()
                        .setFooter("Slap panel, developed by marquito523")
                    return message.channel.send(embed)
                }
            } else {
                var embed = new Discord.MessageEmbed()
                    .setTitle('**ExFrame Options**')
                    .setDescription(' :x: I could not find the member in this guild!')
                    .setTimestamp()
                return message.channel.send(embed)
            
        }
    }
}