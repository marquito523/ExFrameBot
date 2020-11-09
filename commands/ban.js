const prefix = "!"
const Discord = require('discord.js')


module.exports = {
    name: 'ban',
    description: 'show an example of ping command',
    execute(message, args) {

        var MissingPerm = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("You **don't** have permission to do that.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("I **don't** have permission to do that.")

        


        if (!message.guild) return;


        if (message.content.startsWith('!ban')) {
            const user = message.mentions.users.first()
            if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(MissingPerm)
            if (!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.channel.send(BotWithoutPerms)

            if (user) {

                const member = message.guild.member(user);

                if (member) {

                    member.ban({
                        reason: 'They were bad!',
                    }).then(() => {
                        var embed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTimestamp()
                            .setDescription(`**Successfully** banned ${user.tag}`)
                            .setFooter("ExFrame ban pannel, Developped by marquito523 ");
                        message.channel.send(embed)

                    }).catch(err => {

                        var embed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTimestamp()
                            .setDescription(`I was **unable** to ban the member. Check if their **roles** are **higher** than mine or if they have **administrative permissions**!`)
                            .setFooter("ExFrame ban pannel, Developped by marquito523 ");
                        message.channel.send(embed)// if a user does not have permission to use a command on a user or as a member, this message will be send.
                        //** for my bot I would say message.reply(`${author.tag}, sorry, I was unable to ban this user! Check to see if there roles are above mine, or if this user is an admin!`)**\\

                        console.error(err);
                    });
                } else {

                    var embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setDescription(`That user **is not** in this guild!`)
                        .setFooter("ExFrame ban pannel, Developped by marquito523 ");
                    message.channel.send(embed)
                }
            } else {


                var embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setDescription(`You **have not** mentioned any member to ban.`)
                    .setFooter("ExFrame ban pannel, Developped by marquito523 ");
                message.channel.send(embed)




            }
        }
    }
}

























