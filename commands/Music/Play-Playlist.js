const Playlist = require("../Models/Playlist");

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const { DefaultJoinMessage } = require("../../config.json");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const Discord = require("discord.js")


module.exports = {
    name: "play-playlist",
    async execute(client, message, args) {


        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You're not in a voice channel !`));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not in the same voice channel !`));



        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const User = await Playlist.findOne({

            UserID: message.author.id

        }, (err, user) => {
            if (err) console.error(err)

            if (!user) {
                const newPlaylist = new Playlist({
                    _id: mongoose.Types.ObjectId(),
                    UserID: message.author.id,
                    Playlists: [],
                    Public: false
                })

                newPlaylist.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.');
            }
        });


        console.log(User.Playlists)

        if(!User)return

        if(!User.Playlists || User.Playlists.length === 0 || User.Playlists === [])return message.channel.send(new MessageEmbed().setDescription(`You do not own any playlists. To create one, please type \`${prefix}createplaylist\``));

        let StringHolder = ""

        for(var i = 0; i < User.Playlists.length; i++){
            StringHolder = StringHolder + "\n " + User.Playlists[i].name + " - " + "**" + (i + 1) + "**"
        }

        const b = await message.channel.send(new MessageEmbed().setDescription(StringHolder).setTitle("Your Playlists").setFooter("Reply the number of the playlist you would like to play."));

         i = 0

        let timevar = 10000

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));

            try{timevar = timevar.trim() * 1}catch(err){console.log(error); return message.channel.send(new MessageEmbed().setDescription("Invalid Response."))}

            if (isNaN(timevar)) return message.channel.send(new MessageEmbed().setDescription("Invalid Response"))

            const CurAr = User.Playlists[timevar - 1]

            message.channel.send(new MessageEmbed().setDescription(`Now playing **${CurAr.name}**`).setTitle("Playlist Incoming!"));


            try{

                for(i = 0; i < CurAr.songs.length ;i++){
                    console.log('t')
                    console.log(CurAr.songs[i].Link)
                    let Nmsg = message
                    Nmsg.content = `${client.prefix}play ${CurAr.songs[i].Link}`
                    client.player.play(Nmsg, CurAr.songs[i].Link);
                }

            }catch(err){

                console.log(err)

                return message.channel.send(new MessageEmbed().setDescription(`Fatal Error: ${err}`));

            }

    }

}
