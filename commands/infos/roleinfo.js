const Discord = require("discord.js")

module.exports = {
    name: 'roleinfo',
    async execute(client, message, args){
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        let role =
        message.guild.roles.cache.find((r) => r.name == args[1]) ||
        message.guild.roles.cache.find((r) => r.id == args[1]) ||
        message.mentions.roles.first();
        if(!role) return message.channel.send(new Discord.MessageEmbed().setDescription(':x: You need to specify a role!'))

        let RoleName = role.name
        let RoleId = role.id
        let roleDeleted = role.deleted
        let mentionable = role.mentionable

        let member = message.author

        let avatar = member.displayAvatarURL({ size: 1024 })

        try{

            message.channel.send(new Discord.MessageEmbed().setDescription(`**Role Name**: ${RoleName} \n **Role ID:** ${RoleId}   \n **Is Role Deleted:** ${roleDeleted} \n **Is Role Mentionable:** ${mentionable}`).setTitle("**" + RoleName + " Info**").setThumbnail(avatar).setTimestamp())
            
        }catch(error){

                }

    }
}