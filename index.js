const {
    Client, Util
} = require('discord.js');
const Discord = require('discord.js')
const ydtl = require('ytdl-core')
const client = new Client({
    disableEveryone: true
})
const { prefix, token } = require('./config.json')
const queue = new Map();
const fs = require('fs')
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const Youtube = require('simple-youtube-api')
const { youtube_api_key } = require('./config.json')
const youtube = new Youtube(youtube_api_key)
const suggestionprefix = "!report"
var DeleteChannelAsking = false
var deletechanelactive = false
var delchannel
var filter = false
const FilterGuilds = new Map();


for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}
//const channel = messageDelete.guild.channels.find(ch => ch.name === 'suggestions');
//  channel.send(`The message : "${messageDelete.content}" by ${messageDelete.author} was deleted. Their ID is ${messageDelete.author.id}`);


client.on('ready', () => {
    console.log(`${client.user.username} ready!`);
    setInterval(() => {
        const statuses = [`${client.guilds.cache.size} guilds, yeah I know, you can't do worst...`, `!help, you could ask who cares? Well not that wrong!`, ` ${client.users.cache.size} users or alts! That's danm sad D:`, `Does anyone even know me?`];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        client.user.setActivity(randomStatus, {
            type: 'WATCHING',
        });
    }, 60000);
});
var swearduser = {
    name: "",
    id: "",
    numberofswears: "",
}
var FilterGuild = []




client.on('message', async message => {
    if (!message.guild) return

    if (message.author.username.includes("lil") || message.author.username.includes("tjay")) {
        message.delete()
    }
    const GuildId = message.guild.id

    //Filter Chat
    if (message.content.includes("shit") || message.content.includes("Shit") || message.content.includes("fuck") || message.content.includes("Fuck") || message.content.includes("fock") || message.content.includes("Fock") || message.content.includes("niger") || message.content.includes("dumbass") || message.content.includes("Dumbass") || message.content.includes("dumass") || message.content.includes("Dumas") || message.content.includes("retard") || message.content.includes("Retarded") || message.content.includes("retarded") || message.content.includes("fuck") || message.content.includes("shit") || message.content.includes("shit") || message.content.includes("shit") || message.content.includes("shit") || message.content.includes("shit") || message.content.includes("shit")) {
        const GuildId = message.guild.id
        if (!GuildId) return
        if (FilterGuild.GuildId) {
            message.delete()
            if (swearduser.id === message.author.id) {
                numberofswears = numberofswears + 1

                message.channel.send((new Discord.MessageEmbed().setDescription(`In all the servers I am, ${message.author} has sweard ${numberofswears} amount of times`)))
                message.delete()


            } else {
                swearduser.name = message.author.name
                swearduser.id = message.author.id
                numberofswears = 1
                message.delete()
            }

        }
    }


    if (message.content === `${prefix}enable filter`) {
        const GuildId = message.guild.id
        if (FilterGuild.GuildId) {
            message.channel.send((new Discord.MessageEmbed().setDescription(`The filter option is already activated on ${message.guild.name}.`)))
        } else {

            FilterGuild.push(GuildId)
            message.channel.send(FilterGuilds.GuildId)
            message.channel.send((new Discord.MessageEmbed().setDescription(`**Succesfully** enabled filter option on ${message.guild.name}`)))
        }

        if (message.content === `${prefix}disable filter`) {
            //filter = false
            if (!FilterGuild.find(message.guild.id)) {
                message.channel.send((new Discord.MessageEmbed().setDescription(`The filter isn't activated on ${message.guild.name}`)))
            } else {
                FilterGuild.delete(FilterGuilds.find(message.guild.id))
                message.channel.send((new Discord.MessageEmbed().setDescription(`**Succesfully** removed filter option on ${message.guild.name}`)))
            }
        }

    }


    //sugestions
    const args = message.content.substring(prefix.length).split(" ")
    if (message.content === `${prefix}msglog channel`) {
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send((new Discord.MessageEmbed().setDescription(`You don't have Administator permissions, so you can not make this action.`)))
        DeleteChannelAsking = true
        sentchanneldeleted = message.channel
        return message.channel.send((new Discord.MessageEmbed().setDescription(`Is this the channel you would like to set a msg log? \n Channel Name: [${message.channel.name}] \n Channel ID: [${message.channel.id}]`)))
    }

    if (message.content.startsWith(`${prefix}suggest`)) {
        if (!args[1]) return message.channel.send((new Discord.MessageEmbed().setDescription(`The suggestion needs to contain a **suggestion** ;D`).setTitle("**An empty suggestion lol**")))
        if (!message.guild.channels.cache.find(channel => channel.name === 'suggestions')) return message.channel.send((new Discord.MessageEmbed().setDescription(`I'm sorry but in this guild [(${message.guild.name} [${message.guild.id}]]) a suggestion channel named "suggestions". Please creat one in order for me display the suggestions.`)))
        const suggestionchannel = message.guild.channels.cache.find(channel => channel.name === 'suggestions')
        // if (!channel) return message.channel.send((new Discord.MessageEmbed().setDescription(`It seems like I could not find ${channelName} channel. Please make sure it still exists. If it doesn't, an **Administrator**, or **higher** needs to recreat one. **Otherwise**, suggestion can **not be used**.`)))
        var suggestionguild = message.content.substring(`${prefix}suggest`.length)
        message.channel.send((new Discord.MessageEmbed().setTitle("**Your suggestion has been sent, thank you for suggesting!**")))
        return suggestionchannel.send((new Discord.MessageEmbed().setDescription(`The sugestion has been sent by: ${message.author}\n **Suggestion**: \n\n ${suggestionguild}`).setTitle("**New Suggestion**")))

    }





    if (message.content.startsWith(suggestionprefix)) {
        if (!args[1]) return message.channel.send((new Discord.MessageEmbed().setDescription(`The suggestion needs to contain a **suggestion** ;D`).setTitle("**An empty suggestion lol**")))
        const channel = client.channels.cache.find(channel => channel.id === '777795461720309761')
        // if (!channel) return message.channel.send((new Discord.MessageEmbed().setDescription(`It seems like I could not find ${channelName} channel. Please make sure it still exists. If it doesn't, an **Administrator**, or **higher** needs to recreat one. **Otherwise**, suggestion can **not be used**.`)))
        var Suggestion = message.content.substring(suggestionprefix.length)
        message.channel.send((new Discord.MessageEmbed().setTitle("**Your suggestion has been sent, thank you for suggesting!**")))
        return channel.send((new Discord.MessageEmbed().setDescription(`The sugestion has been sent by: ${message.author}\n \n**The suggestion was sent from**: ${message.channel.guild.name}\n  \n**Suggestion**: \n\n ${Suggestion}`).setTitle("**New Suggestion**")))





    }
    //end of sugggestions

    if (message.content === `${prefix}`) return
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    const searchString = args.slice(1).join(' ')
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$l') : ''
    const serverQueue = queue.get(message.guild.id)
    if (message.content.startsWith(`${prefix}play`)) {
        const voiceChannel = message.member.voice.channel
        if (message.content.includes("https://www.youtube.com/") || message.content.includes("https://www.youtube.com/") || message.content.includes("https://m.youtube.com") || message.content.includes("https://music.youtube.com") || message.content.includes("https:/gaming.youtube.com")) {
            if (!voiceChannel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to play music'))
            const permissions = voiceChannel.permissionsFor(message.client.user)
            if (!permissions.has('CONNECT')) return message.channel.send(new Discord.MessageEmbed().setDescription('I dont have permission to connect to the voice channel'))
            if (!permissions.has('SPEAK')) return message.channel.send(new Discord.MessageEmbed().setDescription('I dont have permissions to speak in the channel'))
            if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription('You must provide a URL!')).catch(console.error)
            //Start of the code that does use a link
            const songInfo = await ydtl.getInfo(args[1])
            const song = {
                title: Util.escapeMarkdown(songInfo.videoDetails.title),
                url: songInfo.videoDetails.video_url,
             
            }
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                    looping: false
                }
                queue.set(message.guild.id, queueConstruct)
                queueConstruct.songs.push(song)
                try {
                    var connection = await voiceChannel.join()
                    queueConstruct.connection = connection
                    play(message.guild, queueConstruct.songs[0])
                } catch (error) {
                    console.log(`${error}`)
                    queue.delete(guild.id)
                    return message.channel.send(new Discord.MessageEmbed().setDescription(`${error}`))
                }
            } else {
                serverQueue.songs.push(song)
                return message.channel.send(new Discord.MessageEmbed().setDescription(`**${song.title}** has been to the queue`))
            }
            return undefined;
            //End of the peace of code that uses a link
        } else {

            //Start of the code that does not use a link
            try {
                var video = await youtube.getVideoByID(url)
            } catch {
                try {
                    var videos = await youtube.searchVideos(searchString, 1)
                    var video = await youtube.getVideoByID(videos[0].id)
                } catch {

                    return message.channel.send(new Discord.MessageEmbed().setDescription('I couldnt find any search results'))
                }
            }

            //const songInfo = await ydtl.getInfo(args[1])
            const song = {
                //title: Util.escapeMarkdown(songInfo.videoDetails.title),
                //url: songInfo.videoDetails.video_url
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            }
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                }
                queue.set(message.guild.id, queueConstruct)
                queueConstruct.songs.push(song)
                if (!voiceChannel) return message.channel.send(new Discord.MessageEmbed().setDescription(`Join a voice channel to be able to play music!`))
                try {
                    //   const voiceChannel = message.member.voice.channel
                    var connection = await voiceChannel.join()
                    queueConstruct.connection = connection
                    play(message.guild, queueConstruct.songs[0])
                } catch (error) {
                    console.log(`${error}`)
                    queue.delete(message.guild.id)
                    return message.channel.send(new Discord.MessageEmbed().setDescription(`${error}`))
                }
            } else {
                serverQueue.songs.push(song)
                return message.channel.send(new Discord.MessageEmbed().setDescription(`**${song.title}** has been to the queue`))
            }
            return undefined;

            //End of it

        }
    } else if (message.content.startsWith(`${prefix}stop`)) {// Stop command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to stop the music'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        message.channel.send(new Discord.MessageEmbed().setDescription('I have stopped the music for you'))
        message.member.voice.channel.leave()
        return undefined
    } else if (message.content.startsWith(`${prefix}skip`)) {// Skip command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to skip the music'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        serverQueue.connection.dispatcher.end()
        message.channel.send(new Discord.MessageEmbed().setDescription('I have skipped the music for you'))
        return undefined
    } else if (message.content.startsWith(`${prefix}volume`)) {// Volume command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to use music commands'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`That volume is: **${serverQueue.volume}**`))
        if (isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed().setDescription('That is not a valid amount to change the volume to'))
        if(args[1] > 10) return message.channel.send(new Discord.MessageEmbed().setDescription(`The volume must be between 0/10. **${args[1]}** is greater than 10.`))
        serverQueue.volume = args[1]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        message.channel.send(new Discord.MessageEmbed().setDescription(`I have changed the volume to: **${args[1]}**`))
        return undefined
    } else if (message.content.startsWith(`${prefix}np`)) {// np command
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('Ther is nothing playing'))
        message.channel.send(new Discord.MessageEmbed().setDescription(`Now playing: **${serverQueue.songs[0].title}**`).setURL(`${serverQueue.songs[0].url}`).setTitle(`You may find ${serverQueue.songs[0].title} on Youtube.`))
        return undefined
    } else if (message.content.startsWith(`${prefix}queue`)) {// queue command
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        message.channel.send(new Discord.MessageEmbed().setDescription(`__**Song Queue**__ ${serverQueue.songs.map(song => `**-**${song.title}`).join('\n')}
        **Now playing:** ${serverQueue.songs[0].title}`, { split: true }).setURL(`${serverQueue.songs[0].url}`).setTitle(`You may find this ${serverQueue.songs[0].title} on Youtube`))
        return undefined
    } else if (message.content.startsWith(`${prefix}pause`)) {// pause command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to use the pause command'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        if (!serverQueue.playing) return message.channel.send(new Discord.MessageEmbed().setDescription('The music is already paused'))
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send(new Discord.MessageEmbed().setDescription(`I have now paused the ${serverQueue.songs[0].title} for you`))
        return undefined
    } else if (message.content.startsWith(`${prefix}song`)) {
        if (!serverQueue)return message.channel.send(new Discord.MessageEmbed().setDescription("Currently nothing is playing. But you can be the first to play song in this guild! `!play` + `song title` or `song URL` [Youtube URL]").setTitle(`Nothing is Playing`))  
            return message.channel.send(new Discord.MessageEmbed().setDescription(`You can find ${serverQueue.songs[0].title} on Youtube following the link!`).setURL(`${serverQueue.songs[0].url}`).setTitle(`Link To The Song [Youtube]`))
        
    } else if (message.content.startsWith(`${prefix}resume`)) { // resume command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to use the resume command'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        if (serverQueue.playing) return message.channel.send(new Discord.MessageEmbed().setDescription('The music is already playing'))
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send(new Discord.MessageEmbed().setDescription(`I have now resumed ${serverQueue.songs[0].title} for you`))
        return undefined

    } else {
        const command = args.shift().toLowerCase()
        if (client.commands.get(command)) {
            try {
                client.commands.get(command).execute(message, args)
            } catch (error) {
                console.error();
                var embed = new Discord.MessageEmbed()
                    .setTitle('**ExFrame Support Error**')
                    .setDescription("There was an **issue** executing that command. We are sorry!")
                    .setTimestamp()
                    .setFooter("ExFrame error log, error panel, Visual Studio Code Terminal")
                return message.reply(embed)
            }
        }
    }
})

function play(guild, song) {
    const serverQueue = queue.get(guild.id)
    if (!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }
    const dispatcher = serverQueue.connection.play(ydtl(song.url)).on('finish', () => {
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
    }).on('error', error => {
        console.log(error)
    })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
    serverQueue.textChannel.send(new Discord.MessageEmbed().setDescription(`Now Playing: **${song.title}.**.`).setURL(`${song.url}`).setTitle(`You can find ${song.title} on Youtube`))
}


client.login(token)
