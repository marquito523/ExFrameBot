
const Discord = require('discord.js')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.ceil((Math.random() * (max - min)) + min);
  }

module.exports = {
    name: 'rate',
    description: 'Rates a user',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        const user = message.mentions.users.first(); // This says if you mention this user, it is talking about that user

        if (user) {

            const member = message.guild.member(user);

            if (member) {


                var embed = new Discord.MessageEmbed()
                    .setTitle('**ExFrame Rating**')
                    .setDescription(`Hm, I rate ${member} , ${ getRandomInt(0, 100)}/100`)
                    .setTimestamp()
                    .setFooter("Rate panel, developed by marquito523")
                return message.channel.send(embed)

            }else{
                var embed = new Discord.MessageEmbed()
                .setTitle('**ExFrame Rate**')
                .setDescription(':x: I could not find the member in this guild!')
                .setTimestamp()
                .setFooter("Rate panel, developed by marquito523")
            return message.channel.send(embed)

            }
        } else {
            var embed = new Discord.MessageEmbed()
                .setTitle('**ExFrame Rate**')
                .setDescription(' :x: You have to provide a valid member to rate!')
                .setTimestamp()
                .setFooter("Rate panel, developed by marquito523")
            return message.channel.send(embed)
        }
    }
}
