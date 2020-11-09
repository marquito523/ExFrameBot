const prefix = "!"
const Discord = require('discord.js')
ChosenImage = 1


module.exports = {
    name: 'slap',
    description: 'slaps someone',
    execute(message, args) {

        const user = message.mentions.users.first(); // This says if you mention this user, it is talking about that user

        if (user) {

            const member = message.guild.member(user);

            if (member) {
                if (ChosenImage === 1) {
                    ChosenImage = 2
                    var embed = new Discord.MessageEmbed()
                        .setTitle('**ExFrame Slaping**')
                        .setColor('RANDOM')
                        .setDescription(`${member}, you have been slapped by ${message.author} \n You should probably get **revenge** on him, don't you think so? : )`)
                        .setTimestamp()
                        .setImage('https://cdn.discordapp.com/attachments/774931587179085824/774931870189486090/Capture_decran_2020-11-02_114651.png')
                        .setFooter("Slap panel, developed by marquito523")
                    return message.channel.send(embed)
                } else {
                    ChosenImage = 1
                    var embed = new Discord.MessageEmbed()
                        .setTitle('**ExFrame Slaping**')
                        .setColor('RANDOM')
                        .setDescription(`${member}, you have been slapped by ${message.author} \n You should probably get **revenge** on him, don't you think so? : )`)
                        .setImage('https://cdn.discordapp.com/attachments/774931587179085824/774931882034855936/Capture_decran_2020-11-02_114712.png')
                        .setTimestamp()
                        .setFooter("Slap panel, developed by marquito523")
                    return message.channel.send(embed)
                }
            } else {
                var embed = new Discord.MessageEmbed()
                    .setTitle('**ExFrame Options**')
                    .setColor('RANDOM')
                    .setDescription('I could not find the member in this guild! HE MIGHT BE HIDDING SOMEWHERE! The user is not in the guild.')
                    .setTimestamp()
                return message.channel.send(embed)
            }
        }
    }
}