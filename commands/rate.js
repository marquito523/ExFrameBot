const prefix = "!"
const Discord = require('discord.js')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

module.exports = {
    name: 'rate',
    description: 'Rates a user',
    execute(message, args) {

        const user = message.mentions.users.first(); // This says if you mention this user, it is talking about that user

        if (user) {

            const member = message.guild.member(user);

            if (member) {


                var embed = new Discord.MessageEmbed()
                    .setTitle('**ExFrame Rating**')
                    .setColor('RANDOM')
                    .setDescription(`Hm, I rate ${member} , ${ getRandomInt(0, 100)}/100`)
                    .setTimestamp()
                    .setFooter("Rate panel, developed by marquito523")
                return message.channel.send(embed)

            }
        } else {
            var embed = new Discord.MessageEmbed()
                .setTitle('**ExFrame Rate**')
                .setColor('RANDOM')
                .setDescription('I could not find the member in this guild! HE MIGHT BE HIDDING SOMEWHERE! The user is not in the guild.')
                .setTimestamp()
                .setFooter("Rate panel, developed by marquito523")
            return message.channel.send(embed)
        }
    }
}
