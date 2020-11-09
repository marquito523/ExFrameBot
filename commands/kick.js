const prefix = "!"
const Discord = require('discord.js')


module.exports = {
  name: 'kick',
  description: 'show an example of ping command',
  execute(message, args) {


    if (!message.guild) return;

    if (message.content === `${prefix}kick ExFrame`) {
      var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Are you **crazy**! You want to kick the best bot ever?!! No way, think of it again!!!.`)
        .setTimestamp()
        .setFooter("ExFrame kick pannel, Developped by marquito523 ");
        return message.reply(embed);
      
    }

     

      const user = message.mentions.users.first(); // This says if you mention this user, it is talking about that user

      if (user) {

        const member = message.guild.member(user);

        if (member) {

          member.kick('Optional reason that will display in the audit logs').then(() => {

            var embed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setDescription(`**Successfully** kicked ${user.tag}.`)
              .setTimestamp()
              .setFooter("ExFrame kick pannel, Developped by marquito523 ")

            message.channel.send(embed)

          }).catch(err => {
            console.error(err);
            var embed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setDescription(`**I was unable** to kick the member. Check if their roles are higher then mine or if they have administrative permissions!`)
              .setTimestamp()
              .setFooter("ExFrame kick pannel, Developped by marquito523 ");
            message.channel.send(embed)




          });
        } else {

          var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`**Unknown error**. I'm sorry ${message.author}`)
            .setTimestamp()
            .setFooter("ExFrame kick pannel, Developped by marquito523 ");
          message.channel.send(embed);
        }

      } else {

        var embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Mention error**. ${message.author}, you have to mention the user you want to kick.`)
          .setTimestamp()
          .setFooter("ExFrame kick pannel, Developped by marquito523 ");
        message.channel.send(embed);
        // Thus is creating a message so that you know if you failed 
        // The / is to show the script that the (') is not the end of it
      }
    



  },

}