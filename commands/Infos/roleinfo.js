const Discord = require("discord.js")

module.exports = {
    name: 'roleinfo',
    async execute(client, message, args){

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

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