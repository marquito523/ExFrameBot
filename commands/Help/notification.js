const { MessageEmbed } = require("discord.js");
const { execute } = require("../Music/DeleteSong");
const Discord = require("discord.js")

module.exports = {
    name: "set-global-notification",
    async execute(client, message, args){

        if(!message.author.id === 546284284713893889 ||!message.author.id ===  334297339831255040)return message.channel.send(new MessageEmbed().setDescription("**Administator Command:** Only ExFrame Team Partnered With Exyno Team Can Use This Command.").setTitle("Refused"))

        if(!message.author.id === 546284284713893889 ||!message.author.id ===  334297339831255040)return message.channel.send(new MessageEmbed().setDescription("**Administator Command:** Only ExFrame Team Partnered With Exyno Team Can Use This Command.").setTitle("Refused"))

        if(!message.author.id === 546284284713893889 ||!message.author.id ===  334297339831255040)return message.channel.send(new MessageEmbed().setDescription("**Administator Command:** Only ExFrame Team Partnered With Exyno Team Can Use This Command.").setTitle("Refused"))

        if(!message.author.id === 546284284713893889 ||!message.author.id ===  334297339831255040)return message.channel.send(new MessageEmbed().setDescription("**Administator Command:** Only ExFrame Team Partnered With Exyno Team Can Use This Command.").setTitle("Refused"))

        var guildList = client.guilds.cache;
        try {
        let messageToSend = new Discord.MessageEmbed().setTitle("New Update!").setDescription(`ExFrame has a new Discord Bot Feature! \n \n **Playlists Are Now Available** \n \n Check out all the command layout on our help pannel (\`${client.prefix}help\`) and navigate to Music Frame. \n \n Create until 25 Playlists for standard verison of ExFrame and 75 playlists for the prenium version. \n \n **Song Control** \n \n Benefit of a comparable song control to Spotify. Manage your playlists, add as many songs as you want to them and listen without any advertisements. \n \n **Share Your Playlists** \n \n Share your playlists to the world by settings your profile to public. You can now check out how on our help pannel.)`).setTimestamp();
         guildList.forEach((guild) => {
        let channel
        if(guild.systemChannel){
        channel = guild.systemChannel
        if (!channel.permissionsFor(message.client.user).has('SEND_MESSAGES')){
            channel = guild.channels.cache.find((channel) => channel.type === 'text')
            if (!channel) return; 
            if (!channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))return;
        }
        }else{
           channel = guild.channels.cache.find((channel) => channel.type === 'text')
          if (!channel) return; 
          if (!channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))return;
        }
          channel.send(messageToSend);
         });
        } catch (err) {
         console.log(err);
        }
    }
}