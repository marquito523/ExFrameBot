const Playlist = require("../Models/Playlist");

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const { DefaultJoinMessage } = require("../../config.json");
const { MessageEmbed, MessageAttachment } = require("discord.js");


module.exports = {
    name: "addtoplaylist",
    async execute(client, message, args) {
    
        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const Word = message.content.substring(`${client.prefix}createprofile`.length).trim();

        if(!Word)return message.channel.send(new MessageEmbed().setDescription(":x: No title was detected."));

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

        if(!User)return

        if(!User.Playlists)return

        console.log(User.Playlists)
        
        var i = 0

        let timevar = 10000

        const b = await message.channel.send(new MessageEmbed().setDescription("Please provide the Youtube Song Link."));

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));

            if(!timevar.includes("https") || !timevar.includes("you"))return message.channel.send(new MessageEmbed().setDescription("Invalid link"))

            if(!timevar.includes("youtube") && !timevar.includes("you.tube"))return message.channel.send(new MessageEmbed().setDescription("Invalid link"))

            const msg = message.content.toLowerCase().trim();

            if(msg === "https://youtube.com")return message.channel.send(new MessageEmbed().setDescription("Youtube is not a song."))
            const link = timevar

             message.channel.send(new MessageEmbed().setDescription("What playlist do you want to add it to?"));

            let StringHolder = ""


            for(i = 0; i < User.Playlists.length; i++){
                StringHolder = StringHolder + User.Playlists[i].name + "\n"
            }

            timevar = 100000

            const v = await message.channel.send(new MessageEmbed().setDescription(StringHolder));

            await v.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++})

                let Correct 

                let Success = false

                for(i = 0; i < User.Playlists.length; i++){
                    if(User.Playlists[i].name === timevar){
                        Correct = {
                            Arr: i,
                        }
                        Success = true
                    } 
                }

                if(Success === false)return message.channel.send(new MessageEmbed().setDescription(":x: Not Found Playlist!"))



        const SongConstruct = {
            Title: Word,
            Link: link
        }

        let NewArr = User.Playlists

        NewArr[Correct.Arr].songs.push(SongConstruct);

        await User.updateOne({

            Playlists: NewArr

        })


        
     
    }

}


