const { MessageEmbed } = require("discord.js");
const Guild = require('../Models/Guild')

module.exports = {
    name: 'forbidden',
    async execute(client, message, args){

        const prefix = client.prefix

        if (!message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(new MessageEmbed().setDescription(`**Error**: Lacking Permissions! \n \n Solution:  \n  \`${client.prefix}Get higher permissions. \``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))
        };

        const channel = message.mentions.channels.first();
        if(!channel)return message.channel.send(new MessageEmbed().setDescription(`**Error**: No channels were specified! \n \n Usage:  \n  \`${client.prefix}forbidden [#channel]\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))

        const settings = await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {
            if (err) console.error(err)

            if(!guild)return message.channel.send(new MessageEmbed().setDescription(`**Error**: No Data Stores Correspond To This Guild! \n \n Usage:  \n  \`${client.prefix}setup\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))

        });


        if(!settings)return

        const IgnoredChannels = settings.IgnoredChannels || []

        let Found = false

        if(IgnoredChannels.length - 1 > 50) return message.channel.send(new MessageEmbed().setDescription(`**Error**: Forbidden Channel Max Amount Reached. \n \n Solution:  \n  \`Unforbidden Some Channels. \``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))


        for(var i = 0; i < IgnoredChannels.length; i++){
            const ChannelID = channel.id
            if(IgnoredChannels[i] === ChannelID.toString()){
                return message.channel.send(new MessageEmbed().setDescription(`**Error**: Channel Already Forbiddened. \n \n Solution:  \n  \`If you wanted that channel to be forbiddened, it's already done! \``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#FE0000'))
            }
        }

        if(Found === true)return

        IgnoredChannels.push(channel.id)
        console.log(IgnoredChannels)

        await settings.updateOne({

            IgnoredChannels: IgnoredChannels

        })

        return message.channel.send(new MessageEmbed().setDescription(`**Succes!**: ${channel.name} was forbidden. No more commands will be taken in count in that channel. \n \n Tip:  \n  \`To undo this, use the command ${prefix}unforbidden <channel>\``).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`).setColor('#84FE00'))


        
    }
}