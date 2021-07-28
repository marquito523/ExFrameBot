const Discord = require("discord.js")
const mongoose = require("mongoose")
const User = require("../Models/User")
const ServerManager = require("../Models/Server")
const Plateforms = ["PC", "XBOX", "PlayStation", "Switch"]

module.exports = {
    name: "data",
    async execute(client, message,args){

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        const Mention = message.mentions.users.first()

        if(!Mention)return message.channel.send(new Discord.MessageEmbed().setDescription("You have not specifed any users!"))


        const settings = await User.findOne({

            UserId: Mention.id

        }, (err, user) => {
            if (err) console.error(err)

            if (!user) {
                return message.channel.send(new Discord.MessageEmbed().setDescription("The user you have specified is not registered within our Data Store or his/her account is set as private. We can not display any information about him/her."));
            }
        });

        if(!settings)return

        let ProfilePresence = false

        const Profile = await ServerManager.findOne({

            UserId: Mention.id

        }, (err, user) => {
            if(err) return message.channel.send(new Discord.MessageEmbed().setDescription(`An unexpected error occiered. Error: ${err}`));

            if(!user)ProfilePresence = false

            if(user)ProfilePresence = true

        })


        const ID = Mention.id
        const Currency = settings.UserCurrency
        const RocketLeagueRank = settings.Rank
        const UserEntries = settings.UserEntries

        if(RocketLeagueRank === undefined || RocketLeagueRank === 'undefined')RocketLeagueRank = 'None set'

        let Offering1

        let Offering2

        let Offering3

        let RocketLeaguePlateform 

        if(ProfilePresence === true){
            Offering1 = Profile.Offering1
            Offering2 = Profile.Offering2
            Offering3 = Profile.Offering3
            RocketLeaguePlateform = Profile.Plateform
            if(Offering1 === 'NOTHING_NOTHING_NOTHING')Offering = 'Nothing'
            if(Offering2 === 'NOTHING_NOTHING_NOTHING')Offering2 = 'Nothing'
            if(Offering3 === 'NOTHING_NOTHING_NOTHING')Offering3 = 'Nothing'
            if(RocketLeaguePlateform === undefined)RocketLeaguePlateform = 'None set'
        }else{
            Offering1 = "No Profile Found For This User"
            Offering2 = "No Profile Found For This User"
            Offering3 = "No Profile Found For This User"
            RocketLeaguePlateform = "No Profile Found For This User"
        }



        let member = Mention
try{
        let avatar = member.displayAvatarURL({size: 1024})
        
        const Message = new Discord.MessageEmbed()
        .setTitle("Data Information")
        .addField(`User ID`, `${Mention.id}`)
        .addField(`Currency`, `${Currency} Framits`)
        .addField(`User Entries`, `${UserEntries} Tokens`)
        .addField(`Rocket League Rank`, `${RocketLeagueRank}`)
        .addField(`Trading Item 1 (Rocket League)`, `${Offering1}`)
        .addField(`Trading Item 2 (Rocket League)`, `${Offering2}`)
        .addField(`Trading Item 3 (Rocket League)`, `${Offering3}`)
        .addField(`Rocket League Plateform`, `${Plateforms[RocketLeaguePlateform - 1]}`)
        .setThumbnail(avatar)
        
        return message.channel.send(Message)
        }catch(err){
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Unexpected Error. Error: ${err}`))
        }
    }
}