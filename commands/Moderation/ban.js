const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'show an example of ping command',
  async execute(client, message, args) {

    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


       const prefix = client.prefix

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        var MissingPerm = new Discord.MessageEmbed()
            .setTitle("**Missing permission Error**")
            .setDescription(":x: YouZ **don't** have permission to do that. You need `BAN_MEMBERS` permission!")
            

        var BotWithoutPerms = new Discord.MessageEmbed()
            .setTitle("**Missing permission Error**")
            .setDescription(" :x: I **don't** have permission to do that. I need `BAN_MEMBERS` permission!")
            




        if (!message.guild) return;



        const user = message.mentions.users.first()

        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send(MissingPerm)

        if (!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send(BotWithoutPerms)

        if(!user) return message.channel.send((new Discord.MessageEmbed().setDescription(`:x: You need to specify a user to ban`)))

            

    if (user) {

        const member = message.guild.member(user);

        if(!member) return message.channel.send((new Discord.MessageEmbed().setDescription(`:x: The user you are trying to ban isn't within this guild.`)))

            if (member) {

                const RemoveTo = `${prefix}ban ${member}>`
              
                let reason = message.content.substring(RemoveTo.length)

                if(reason === " " || !reason || reason === "  " || reason === "") reason = "No reason given."

                const kicker = message.author
        
                const guild = message.guild.name

                member.ban({
                }).then(() => {
                    var embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setDescription(`:white_check_mark:  **Successfully** banned ${user.tag}`)
                        .setFooter("ExFrame ban pannel, Developped by marquito523 ");
                    message.channel.send(embed)

                    



                    try{

                        return user.send((new Discord.MessageEmbed().setDescription(`You have been banned by ${kicker} in ${guild} for the following reason \n ${reason}.`)))
    
                        }catch(e){
    
                            return
                        }



                }).catch(err => {
                    console.log(err)
                    var embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setDescription(`:x: The user you are trying to ban is over you, or has administative permissions.`)
                        .setFooter("ExFrame ban pannel, Developped by marquito523 ");
                    message.channel.send(embed)// if a user does not have permission to use a command on a user or as a member, this message will be send.
                    //** for my bot I would say message.reply(`${author.tag}, sorry, I was unable to ban this user! Check to see if there roles are above mine, or if this user is an admin!`)**\\
                });


                    
                
            }
        }
    }
}


























