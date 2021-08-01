const Playlist = require("../Models/Playlist");

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const { DefaultJoinMessage } = require("../../config.json");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "ordersongs",
    async execute(client, message, args) {

        const prefix = client.prefix

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const User = await Playlist.findOne({

            UserID: message.author.id

        }, (err, user) => {
            if (err) console.error(err)

            if (!user) {
                const newPlaylist = new Playlist({
                    _id: mongoose.Types.ObjectId(),
                    UserID: message.author.id,
                    Playlists: []
                })

                newPlaylist.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('User was not in our database! We have added it, please retype this command.');
            }
        });

        if(!User)return

        if(!User.Playlists || User.Playlists.length === 0 || User.Playlists === [])return message.channel.send(new MessageEmbed().setDescription(`You do not own any playlists. To create one, please type \`${prefix}createplaylist\``));


        let StringHolder = ""

        for(var i = 0; i < User.Playlists.length; i++){
            StringHolder = StringHolder + "\n " + User.Playlists[i].name + " - " + "**" + (i + 1) + "**"
        }

        const b = await message.channel.send(new MessageEmbed().setDescription(StringHolder).setTitle("Your Playlists").setFooter("Please enter the number of the playlist you'd like to edit."))

        i = 0

        let timevar = 10000


        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));
            try{timevar = timevar.trim() * 1}catch(err){return message.channel.send(new MessageEmbed().setDescription("Unexpected Response."));}

            if(!User.Playlists[timevar - 1])return message.channel.send(new MessageEmbed().setDescription(`Unexpected Response.`));

            let TimevarSave = timevar

            StringHolder = ""


            if(User.Playlists[timevar - 1].songs.length === 0)return message.channel.send(new MessageEmbed().setDescription(`Playlist is currently empty. There are no songs to delete within it.`));

            for(i= 0; i < User.Playlists[timevar - 1].songs.length; i++){
            StringHolder = StringHolder + User.Playlists[timevar - 1].songs[i].Title + " - " + (i + 1) + " \n"
            }

            const v = await message.channel.send(new MessageEmbed().setDescription(StringHolder).setTitle("Your Songs").setFooter("Please enter the number of the song you'd like to move place."))

            i = 0
    
            timevar = 10000
    
    
            await v.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++})


                if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));
            
                try{timevar = timevar.trim() * 1}catch(err){return message.channel.send(new MessageEmbed().setDescription("Unexpected Response."));}
    
                if(!User.Playlists[TimevarSave - 1].songs[timevar - 1])return message.channel.send(new MessageEmbed().setDescription("No such number."));


                let newPlaylist = User.Playlists


                let CurrSongToMove = newPlaylist[TimevarSave - 1].songs[timevar - 1]
                

                const R = await message.channel.send(new MessageEmbed().setDescription(`You are changing ${CurrSongToMove.Title}. Please enter the number of the song you'd like to switch places with. \n \n` + StringHolder).setTitle("Your Songs"))

                i = 0
        
                let Newtimevar = 10000
        
        
                await R.channel.awaitMessages(m => m.author.id === message.author.id,
                    {max: 1, time: Newtimevar, errors: ["time"],}
                    ).then(async collected =>{
        
                        Newtimevar = collected.first().content;
                    
                    }).catch(() => {return i++})
    
    
                    if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));
                
                    try{Newtimevar = Newtimevar.trim() * 1}catch(err){return message.channel.send(new MessageEmbed().setDescription("Unexpected Response."));}
    
                    if(!User.Playlists[TimevarSave - 1].songs[Newtimevar - 1])return message.channel.send(new MessageEmbed().setDescription("No such number."));
    

                    

                    TTile = newPlaylist[TimevarSave - 1].songs[timevar - 1].Title
                    TURL = newPlaylist[TimevarSave - 1].songs[timevar - 1].URL

                    try{
                    newPlaylist[TimevarSave - 1].songs[timevar - 1].Title = newPlaylist[TimevarSave - 1].songs[Newtimevar - 1].Title
                    newPlaylist[TimevarSave - 1].songs[timevar - 1].URL = newPlaylist[TimevarSave - 1].songs[Newtimevar - 1].URL
                    newPlaylist[TimevarSave - 1].songs[Newtimevar - 1].Title = TTile
                    newPlaylist[TimevarSave - 1].songs[Newtimevar - 1].URL = TURL
                    await User.updateOne({
                        Playlists: newPlaylist
                    })
                    return message.channel.send(new MessageEmbed().setDescription(`Succesfully Switched Song Places!`))
                    }catch(err){
                        return message.channel.send(new MessageEmbed().setDescription(`Error: ${err}`))
                    }


                    
    }

}


