const Playlist = require("../Models/Playlist");

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const { DefaultJoinMessage } = require("../../config.json");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const { updateOne } = require("../Models/Playlist");

module.exports = {
    name: "conf-playlists",
    async execute(client, message, args) {

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


        if(!User)return

        console.log(User)

        if(!User.Public === false && !User.Public === true){
            try{
 
                return message.channel.send(new MessageEmbed().setDescription("Please retype the command. An element was missing to your profile. We've just added it!"))
            }catch(err){
                return message.channel.send(new MessageEmbed().setDescription(`Error: ${err}`))
            }
        }

        let SetedV

        if(User.Public === false){SetedV = "**Private**"}else if(User.Public === true){SetedV = "**Public**"}

        if(!args[0]){
            return message.channel.send(new MessageEmbed().setDescription("Your profile is currently set to " + SetedV + "\n \n To edit it type the following command: \n \n `" + client.prefix + "conf-playlists public / private`"))
        }

       if(!args[0].toLowerCase() === "public" || !args[0].toLowerCase() === "private")return message.channel.send(new MessageEmbed().setDescription("Missing Argument. Please specify a value \n \n **public** or **private**. \n \n **Command use:** `" + client.prefix + "conf-playlists public | private`"))

        let Value = false

      if(args[0].toLowerCase() === "private"){Value = false}else if(args[0].toLowerCase() === "public"){Value = true}else{return message.channel.send(new MessageEmbed().setDescription("Unexpected Error."))}

      if(Value === User.Public)return message.channel.send(new MessageEmbed().setDescription(`Your profile is already set to ${SetedV}`))
try{
       await User.updateOne({
           Public: Value
       })

       return message.channel.send(new MessageEmbed().setDescription("Succes! Your profile is set to **"+ args[0] + "**"))

    }catch(err){
        return message.channel.send(`Error: ${err}`)
    }

    }

}
