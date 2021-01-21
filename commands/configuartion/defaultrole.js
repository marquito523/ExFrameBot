const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")


const { DefaultJoinMessage } = require("../../config.json")


module.exports = {
    name: "set-default-role",
    async execute(client, message, args){


        const prefix = client.prefix


  if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


  if (!message.member.hasPermission('MANAGE_GUILD')) {
    return message.channel.send('You do not have permission to use this command!');
};

        let role =
        message.guild.roles.cache.find((r) => r.name == args[1]) ||
        message.guild.roles.cache.find((r) => r.id == args[1]) ||
        message.mentions.roles.first();

        if(!role)return message.channel.send(":x: No roles specified!")


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
                    JoinNotifChannel: "",
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
                JoinNotifChannel: "",
                defaultRole: "false",
            })

            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

            return message.channel.send('This server was not in our database! We have added it, please retype this command.');
        }


        await settings.updateOne({
            defaultRole: role
        });

        return message.channel.send(`:white_check_mark: Default Role was set to ${role.name} in  **${message.guild.name}**!`);
       
    }
}