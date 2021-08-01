const Playlist = require("../Models/Playlist");

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const { DefaultJoinMessage } = require("../../config.json");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const Discord = require("discord.js")


module.exports = {
    name: "play-otherplaylist",
    async execute(client, message, args) {


        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You're not in a voice channel !`));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.error} - You are not in the same voice channel !`));

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const Target = message.mentions.users.first();

        if(!Target)return message.channel.send(new MessageEmbed().setDescription(`You have not specified a user from which you want to play a playlist.`))

        const User = await Playlist.findOne({

            UserID: Target.id

        }, (err, user) => {
            if (err) console.error(err)

            if (!user) {
                return message.channel.send(new MessageEmbed().setDescription("The user you have specified does not own a profile playlist."))  
            }
        });


        if(!User)return

        if(!User.Playlists || User.Playlists.length === 0 || User.Playlists === [])return message.channel.send(new MessageEmbed().setDescription(`${Target} does not own any playlists!`));

        if(!User.Public){
            await User.updateOne({
                Public: false
            })
            return message.channel.send(new MessageEmbed().setDescription(`Error. Unfetchable playlist data. \n \n **Error Details:** We could not fetch ${Target} playlists. This error might be due to the fact that ${Target} is in private profile. Ask him to run the command \n \n \`${client.prefix}conf-playlists\` \n \n This command will allow him to set his profile to public and allow you to play his playlists.`).setTitle("Error"))
        }

        if(User.Public === false)return message.channel.send(new MessageEmbed().setDescription(`Error. Unfetchable playlist data. \n \n **Error Details:** We could not fetch ${Target} playlists. This error might be due to the fact that ${Target} is in private profile. Ask him to run the command \n \n \`${client.prefix}conf-playlists\` \n \n This command will allow him to set his profile to public and allow you to play his playlists.`).setTitle("Error"))

        let StringHolder = ""

        for(var i = 0; i < User.Playlists.length; i++){
            StringHolder = StringHolder + "\n " + User.Playlists[i].name + " - " + "**" + (i + 1) + "**"
        }

        const b = await message.channel.send(new MessageEmbed().setDescription(StringHolder).setTitle(`${Target.name} Playlists`).setFooter("Reply the number of the playlist you would like to play."));

         i = 0

        let timevar = 10000

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));

            try{timevar = timevar.trim() * 1}catch(err){console.log(error); return message.channel.send(new MessageEmbed().setDescription("Invalid Response."))}

            const CurAr = User.Playlists[timevar - 1]

            if(CurAr.songs.length === 0){
                return message.channel.send(new MessageEmbed().setDescription("The playlist you have chosen does not contain any songs."))
            }
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
