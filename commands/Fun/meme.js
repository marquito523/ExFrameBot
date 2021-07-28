const got = require('got');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    description: "Invite the bot",
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        const Topic = args[0] || 'memes'


        try {
            const embed = new MessageEmbed();
            const response =  got(`https://www.reddit.com/r/${Topic}/random/.json`)
            if(!response) return message.channel.send(new MessageEmbed().setDescription(`:tickNo: ${Topic} not found on reddit. \n \n **Tip**: Make sure the spelling is correct.`).setColor('#FF0000').setTitle('Error occurred').setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`));
                let content = JSON.parse(response.body);
                let permalink = content[0].data.children[0].data.permalink;
                let memeUrl = `https://reddit.com${permalink}`;
                let memeImage = content[0].data.children[0].data.url;
                let memeTitle = content[0].data.children[0].data.title;
                let memeUpvotes = content[0].data.children[0].data.ups;
                let memeNumComments = content[0].data.children[0].data.num_comments;
                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`)
                embed.setImage(memeImage);
                embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
                message.channel.send(embed)
        } catch (err) {
            return message.channel.send(new MessageEmbed().setDescription(`:tickNo: ${Topic} not found on reddit. \n \n **Tip**: Make sure the spelling is correct.`).setColor('#FF0000').setTitle('Error occurred').setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ size: 1024 })}`));
        }
    }
}
