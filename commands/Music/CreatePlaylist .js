const Playlist = require("../Models/Playlist");

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const { DefaultJoinMessage } = require("../../config.json");
const { MessageEmbed, MessageAttachment } = require("discord.js");



module.exports = {
    name: "createplaylist",
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const Word = message.content.substring(`${client.prefix}createplaylist`.length).trim();

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

                return message.channel.send('User was not logged into our DataBase. Please retry.');
            }
        });
 

        console.log(User.Playlists)

        if(!User)return

        if(!User.Playlists)return

        if(User.Playlists.length + 1 > 25) return message.channel.send(new MessageEmbed().setDescription(":x: You reached the standard playlist limit (25)."));

        for(var i = 0; i < User.Playlists.length; i++){
            if(User.Playlists[i].name === Word)return message.channel.send(new MessageEmbed().setDescription("This title was already used!"));
        }

        const NewPlaylist = {name: "", songs: []};

        NewPlaylist.name = Word

        console.log(NewPlaylist)

        try{

            let NewArray = User.Playlists

            NewArray.push(NewPlaylist);

            console.log(NewArray)

            await User.updateOne({

                Playlists: NewArray

            });

            return message.channel.send(new MessageEmbed().setDescription(`${Word} was succesfully saved as a new playlist!`))

        }catch(err){

            console.log(err);

        }
    }

}
