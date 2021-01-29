const Discord = require("discord.js")

module.exports = {
    name: 'np',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',

    execute(client, message) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You're not in a voice channel !`));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not in the same voice channel !`));

        if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - No music currently playing !`));

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;
        try {
            message.channel.send({
                embed: {
                    color: 'RED',
                    author: { name: track.title },
                    footer: { text: 'Now Playing Command' },
                    fields: [
                        { name: 'Channel', value: track.author, inline: true },
                        { name: 'Requested by', value: track.requestedBy.username, inline: true },
                        { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                        { name: 'Views', value: track.views, inline: true },
                        { name: 'Duration', value: track.duration, inline: true },

                        { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },
                        { name: 'Repeat mode', value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                        { name: 'Currently paused', value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                        { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                    ],
                    thumbnail: { url: track.thumbnail },
                    timestamp: new Date(),
                },
            });
        } catch (e) {
            return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error happened executing the command!"))
        }

    },
};