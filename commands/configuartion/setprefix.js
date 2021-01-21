const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")

const { DefaultJoinMessage } = require("../../config.json")




module.exports = {
    name: 'prefix',
    description: 'Gives a cutom prefix',
    async execute(client, message, args) {


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You do not have permission to use this command!'));
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
                    JoinNotifChannel: "",
                    defaultRole: "false",
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(new Discord.MessageEmbed().setDescription('This server was not in our database! We have added it, please retype this command.'));
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

            return message.channel.send(new Discord.MessageEmbed().setDescription('This server was not in our database! We have added it, please retype this command.')).then(m => m.delete({timeout: 10000}));
        }

        if (args.length < 1) {

            return message.channel.send(new Discord.MessageEmbed().setDescription(`You must specify a prefix to set for this server! Your current server prefix is \`${client.prefix}\``))
            
        };


        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
       
    }
}