const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")


const { DefaultJoinMessage } = require("../../config.json")


module.exports = {
    name: "disable-filter",
    async execute(client, message, args){


const prefix = client.prefix


  if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


  if(!message.guild.me.hasPermission(`MANAGE_MESSAGES`))return message.channel.send(new Discord.MessageEmbed().setDescription(":x: I do not have permission to delete messages in this guild."))

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command!');
        };

        const settings = await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {
            if (err) console.error(err)

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: defaultprefix,
                    JoinNotif: false,
                    SuggestionChannel: "None",
                    Filter: false,
                    SendText: `Welcome! we hope you enjoy your stay here! Please follow the rules of the server!`,
                    JoinNotifChannel,
                    defaultRole: "false",
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.');
            }
        });

       
        if(!settings){
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: defaultprefix,
                JoinNotif: false,
                SuggestionChannel: "None",
                Filter: false,
                SendText: `Welcome! we hope you enjoy your stay here! Please follow the rules of the server!`,
                JoinNotifChannel,
                defaultRole: "false",
            })

            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

            return message.channel.send('This server was not in our database! We have added it, please retype this command.');
        }

        if (settings.Filter === false) {

            return message.channel.send(`:x: Filter-Messages is already disabled in this guild!`);
            
        };


        await settings.updateOne({
            Filter: false
        });

        return message.channel.send(`:white_check_mark: Filter is now disabled on **${message.guild.name}**!`);
       
    }
}