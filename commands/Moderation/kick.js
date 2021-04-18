const Discord = require('discord.js')


module.exports = {
  name: 'kick',
  description: 'show an example of ping command',
  execute(client, message, args) {
    
    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}
    
    const prefix = client.prefix

    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")



    if(!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: You **don't** have permission to do that! You need `KICK_MEMBERS` permission.").setTitle("**Missing permission Error**"))

    if(!message.guild.me.hasPermission('KICK_MEMBERS'))return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: I **don't** have permission to do that! I need `KICK_MEMBERS` permission.").setTitle("**Missing permission Error**"))

    const user = message.mentions.users.first(); // This says if you mention this user, it is talking about that user

    if(!user) return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: You need to specify a user to kick`)))
    
    if (user) {

      const member = message.guild.member(user);

      if(!member) return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: The user you are trying to kick isn't within this guild.`)))

      if (member) {


        const reason = message.content.substring(`${prefix}kick ${member.user}`.length)

        const kicker = message.author

        const guild = message.guild.name

        member.kick('Optional reason that will display in the audit logs').then(() => {
          if (reason == ">") user.send((new Discord.MessageEmbed().setDescription(`You have been kicked by ${kicker} in ${guild} with no reason given.`)))

          if (!reason) user.send((new Discord.MessageEmbed().setDescription(`You have been kicked by ${kicker} in ${guild} with no reason given.`)))

          var embed = new Discord.MessageEmbed()
            .setDescription(` :white_check_mark: **Successfully** kicked ${user.tag}.`)
            .setTimestamp()
            .setFooter("ExFrame kick pannel, Developped by marquito523 ")

           message.channel.send(embed)


           if (reason == ">") return user.send((new Discord.MessageEmbed().setDescription(`You have been kicked by ${kicker} in ${guild} with no reason given.`)))

           if (!reason) return user.send((new Discord.MessageEmbed().setDescription(`You have been kicked by ${kicker} in ${guild} with no reason given.`)))

           if (reason) return user.send((new Discord.MessageEmbed().setDescription(`You have been kicked by ${kicker} in ${guild} for the following reason \n ${reason}.`)))

        }).catch(err => {
          if(!member)return 
           var embed = new Discord.MessageEmbed()
          .setDescription(` :x: The user your trying to kick is over you or has administative permissions.`)
          .setTimestamp()
          .setFooter("ExFrame kick pannel, Developped by marquito523 ");
        return message.channel.send(embed);
       });
      }
    }
  }
}