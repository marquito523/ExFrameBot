const Discord = require("discord.js");

module.exports = {
  name: 'removerole',
  description: 'gives Karlofs bot',
  async execute(client, message, args) {
  
    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


    if (!message.member.permissions.has(["MANAGE_ROLES"]))

      return message.channel.send((new Discord.MessageEmbed().setDescription(" :x: You do not have permission to run this command. You need `MANAGE_ROLES` permission.")))

     
    let rMember =
      message.mentions.members.first() || // `.first()` is a function.
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      message.guild.members;
     let role =
      message.guild.roles.cache.find((r) => r.name == args[1]) ||
      message.guild.roles.cache.find((r) => r.id == args[1]) ||
      message.mentions.roles.first();

    

      if(!rMember) return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: You need to provide a member to remvoe a role!"))

    if (!role)
      return message.channel.send((new Discord.MessageEmbed().setDescription(" :x: You need to specify a user and a role you would like to add to him.")))

    if (!message.guild.me.hasPermission(["MANAGE_ROLES"]))

      return message.channel.send((new Discord.MessageEmbed().setDescription(" :x: I do not own the required permission for me to run this command! I need `MANAGE_ROLES` permission.")))

      try{

      if(!rMember.roles.cache.has(role.id)) return message.channel.send(`:x: I could not find the role ${role.name} in ${rMember}`)

      }catch(e){

        return message.channel.send((new Discord.MessageEmbed().setDescription(" :x: There was an error. Please do m!help role ")))

      }
    await rMember.roles.remove(role.id).catch((e) => message.channel.send(" :x: An error has occiered."));

    message.channel.send(new Discord.MessageEmbed().setDescription(` :white_check_mark: The role ${role.name} has been removed from ${rMember.displayName}.`))

  }
}
