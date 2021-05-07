const { MessageEmbed } = require("discord.js");
const Guild = require('../Models/Guild')

module.exports = {
    name: 'unforbidden',
    async execute(client, message, args){

        const prefix = client.prefix

        if (!message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(new MessageEmbed().setDescription(`**Error**: Lacking Permissions! \n \n Solution:  \n  \`${client.prefix}Get higher permissions. \``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))
        };

        const channel = message.mentions.channels.first();
        if(!channel)return message.channel.send(new MessageEmbed().setDescription(`**Error**: No channels were specified! \n \n Usage:  \n  \`${client.prefix}forbidden-channel [#channel]\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))

        const settings = await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {
            if (err) console.error(err)

            if(!guild)return message.channel.send(new MessageEmbed().setDescription(`**Error**: No Data Stores Correspond To This Guild! \n \n Usage:  \n  \`${client.prefix}setup\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))

        });


        if(!settings)return

        const IgnoredChannels = settings.IgnoredChannels || []



        for(var i = 0; i < IgnoredChannels.length; i++){
            const ChannelID = channel.id
            if(IgnoredChannels[i] === ChannelID.toString()){
                delete IgnoredChannels[i];
                var filtered = IgnoredChannels.filter(function (el) {
                    return el != null;
                  });
                await settings.updateOne({
                    IgnoredChannels: filtered
        
                })
                return message.channel.send(new MessageEmbed().setDescription(`**Succes!**: ${channel.name} was unforbiddened. Commands are now taken in count in that channel. \n \n Tip:  \n  \`To return to forbidden, use the command ${prefix}forbidden <channel>\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#84FE00'))
            }
        }

        return message.channel.send(new MessageEmbed().setDescription(`**Error!**: ${channel.name} is not forbiddened. \n \n Tip:  \n  \`If your goal was to unforbidden it, then it's already done!\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))

        
    }
}