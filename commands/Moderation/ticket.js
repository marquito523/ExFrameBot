const { MessageEmbed } = require("discord.js")
const ErrorValue = require("../../Utils/Errors.json")


module.exports = {
  name: "ticket",
  async execute(client, message, args) {
    if(message.content.startsWith(`${client.prefix}ticket creat`)){

    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(":x: To run this command I require `MANAGE_CHANNELS` permission!")
    const UserName = message.author.username
    const UserId = message.author.id
    const ChannelName = `${UserName}-ticket-${UserId}`.toLowerCase()
    const IdChennel = message.guild.channels.cache.find(channel => channel.name.endsWith(`${UserId}`))
    
    if (message.guild.channels.cache.find(channel => channel.name === `${ChannelName}`)) return message.channel.send(`Error: **${ErrorValue.ALREADY_EXISTING}** | You already own a ticket in this guild.`)
    message.guild.channels
      .create(ChannelName, {
        type: 'text',
      }).then((channel) => {
        try {
          channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
          channel.updateOverwrite(message.author, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
          const Message = channel.send(new MessageEmbed().setDescription(`Welcome to your ticket **${UserName}**. You have opened a ticket, please type what problem you are having, a moderator will come check your ticket. Once you're done, type **${client.prefix}ticket-close**.`));
        } catch (e) {
          return message.channel.send(`:x: ${ErrorValue.UNEXPECTED_ERROR} | An unexpected error has appeared!`)
        }

      })
    }else if(message.content.startsWith(`${client.prefix}ticket close`)){
      const UserName = message.author.username
      const UserId = message.author.id
      const ChannelName = `${UserName}-ticket-${UserId}`.toLowerCase()
      const ToDeleteChannel = message.guild.channels.cache.find(channel => channel.name === `${ChannelName}`)
      console.log(ToDeleteChannel, message)
      if(ToDeleteChannel || !ToDeleteChannel === "undefined"){
      DeleteChannel(ToDeleteChannel, message);
      }else if(message.channel.name.endsWith(`${message.author.id}`)){
        DeleteChannel(message.channel, message);
      }else if(message.guild.channels.cache.find(channel => channel.name.endsWith(`${UserId}`))){
        DeleteChannel((message.guild.channels.cache.find(channel => channel.name.endsWith(`${UserId}`))), message);
      }else{
        return message.channel.send(`Error: **${ErrorValue.NOT_FOUND}** | **No tickets corresponding to your account where found in here!** \n \n **Tip**: If you do have one, try executing this command in the **ticket's channel**.`)
      }
      
    }else if(message.content === `${client.prefix}ticket`){
      try{
        return message.channel.send(new MessageEmbed().setDescription(`**What a ticket is:** \n \n A ticket is a \`tool\` that allows you to fix problems your members might have found. It's also a private way to do it. \n \n **Use:** \n \n To use the ticket system, you first need to have the command enabled. \n \`${client.prefix}enable-tickets\` \n \n **Creation of a ticket** \n \n To create a ticket, you need to type the following. \`${client.prefix}ticket create\` \n \n **Permissions** \n \nThat will create a ticket that only people with Administator command will see, the ticket creator will also have acces to his ticket.`).setTitle("**ExFrame's Ticket System**"))
      }catch(e){
        return message.channel.send(`Error: **${ErrorValue.UNEXPECTED_ERROR}** | An unexpected error showed up!`)
      }
    }
  }

}


function DeleteChannel(channel, message){
  try{
    channel.delete()
    message.author.send(new MessageEmbed().setDescription(`Hello **${message.author}**! \n Your ticket has been deleted succesfully in ${message.guild.name}. We hope you have found what you needed.`))
  }catch(e){
    return message.channel.send(`:x: ${ErrorValue.UNEXPECTED_ERROR} | An unexpected error has appeared!`)
  }
}
