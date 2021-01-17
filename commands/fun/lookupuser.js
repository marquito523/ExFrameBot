const Discord = require('discord.js')




module.exports = {
    name: 'id',
    description: 'shows a panel that helps the user',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

    const user = message.mentions.users.first();  // This says if you mention this user, it is talking about that user

        if (!user) {
            return message.channel.send((new Discord.MessageEmbed().setDescription(`[${message.author}], you need to mention the user you would like to look up.`)))
        }else{

            let member = message.mentions.users.first() || message.author

            if (!member) {
                return message.channel.send((new Discord.MessageEmbed().setDescription(`[${message.author}], no members named [${user}] were found.`)))

            }else{


                let avatar = member.displayAvatarURL({size: 1024})


                try{
                message.channel.send((new Discord.MessageEmbed().setDescription(`User ID: ${member.id} \n \n :white_check_mark:   Succesfully loaded \n  `).setTitle(`**${user.tag}**`).setThumbnail(avatar).setFooter("Information User").setTimestamp()))
                }catch(e){
                    return message.channel.send((new Discord.MessageEmbed().setDescription(`Unecpected error happened`)))
                }
            }
        }
    }
}

