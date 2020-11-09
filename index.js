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
for (const file of commandFiles) {
   const command = require(`./commands/${file}`)
   client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log(`${client.user.username} ready!`);
    setInterval(() => {
        const statuses = [`${client.guilds.cache.size} guilds`, `!help`, ` ${client.users.cache.size} users!`, `Karlof listen to me, Im getting better than Exyno : )`];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        client.user.setActivity(randomStatus, {
            type: 'WATCHING',
        });
    }, 60000);
});

client.on('message', async message => {
    if (message.content === `${prefix}`) return
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    const args = message.content.substring(prefix.length).split(" ")
    const searchString = args.slice(1).join(' ')
    const url =  args[1] ? args[1].replace(/<(.+)>/g, '$l') : ''
    const serverQueue = queue.get(message.guild.id)
    if (message.content.startsWith(`${prefix}play`)) {
        const voiceChannel = message.member.voice.channel
    if (message.content.includes("https://www.youtube.com/") || message.content.includes("https://www.youtube.com/") || message.content.includes("https://m.youtube.com") || message.content.includes("https://music.youtube.com") || message.content.includes("https:/gaming.youtube.com")){
        if (!voiceChannel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to play music'))
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send(new Discord.MessageEmbed().setDescription('I dont have permission to connect to the voice channel'))
        if (!permissions.has('SPEAK')) return message.channel.send(new Discord.MessageEmbed().setDescription('I dont have permissions to speak in the channel'))
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription('You must provide a URL!')).catch(console.error)
//Start of the code that does use a link
        const songInfo = await ydtl.getInfo(args[1])
        const song = {
            title: Util.escapeMarkdown(songInfo.videoDetails.title),
            url: songInfo.videoDetails.video_url
        }
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
                looping : false
               
            }
            queue.set(message.guild.id, queueConstruct)
            queueConstruct.songs.push(song)
            try {
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
//End of the peace of code that uses a link
    }else{

//Start of the code that does not use a link
try{
    var video = await youtube.getVideoByID(url)
}catch{
    try{
        var videos = await youtube.searchVideos(searchString, 1)
        var video = await youtube.getVideoByID(videos[0].id)
    }catch{

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
    if(!voiceChannel)return message.channel.send(new Discord.MessageEmbed().setDescription(`Join a voice channel to be able to play music!`))
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
    }else if (message.content.startsWith(`${prefix}stop`)) {// Stop command
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
        serverQueue.volume = args[1]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        message.channel.send(new Discord.MessageEmbed().setDescription(`I have changed the volume to: **${args[1]}**`))
        return undefined
    } else if (message.content.startsWith(`${prefix}np`)) {// np command
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('Ther is nothing playing'))
        message.channel.send(new Discord.MessageEmbed().setDescription(`Now playing: **${serverQueue.songs[0].title}**`))
        return undefined
    } else if (message.content.startsWith(`${prefix}queue`)) {// queue command
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        message.channel.send(new Discord.MessageEmbed().setDescription(`__**Song Queue**__ ${serverQueue.songs.map(song => `**-**${song.title}`).join('\n')}
        **Now playing:** ${serverQueue.songs[0].title}`, { split: true }))
        return undefined
    } else if (message.content.startsWith(`${prefix}pause`)) {// pause command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to use the pause command'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        if (!serverQueue.playing) return message.channel.send(new Discord.MessageEmbed().setDescription('The music is already paused'))
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send(new Discord.MessageEmbed().setDescription('I have now paused the music for you'))
        return undefined
    } else if (message.content.startsWith(`${prefix}resume`)) { // resume command
        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('You need to be in a voice channel to use the resume command'))
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setDescription('There is nothing playing'))
        if (serverQueue.playing) return message.channel.send(new Discord.MessageEmbed().setDescription('The music is already playing'))
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send(new Discord.MessageEmbed().setDescription('I have now resumed the music for you'))
        return undefined
    
    }else {
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
    serverQueue.textChannel.send(new Discord.MessageEmbed().setDescription(`Now Playing: **${song.title}**`))
}

client.login(token)
