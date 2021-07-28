const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")

const { DefaultJoinMessage } = require("../../config.json")

const MaxLength = 5


module.exports = {
    name: 'prefix',
    description: 'Gives a cutom prefix',
    async execute(client, message, args) {

        const Prefix = client.prefix

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        if (message.channel.type === 'dm') return message.reply(new Discord.MessageEmbed().setDescription("This command can not be executed in DMs.").setTitle("Oops!"));


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
                    IgnoredChannels: [],
                    CustomFilterWords: []
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(new Discord.MessageEmbed().setDescription('This server was not in our database! We have added it, please retype this command.'));
            }
        });

       
        if(!settings)return 

        if(!args[0])return message.channel.send(new Discord.MessageEmbed().setDescription(`Your current prefix is set to \`${Prefix}\`. To change it \`${Prefix}prefix <prefix>\``))

        if(args[0].length > 5)return message.channel.send(new Discord.MessageEmbed().setDescription(`Your prefix needs to be \`${MaxLength}\` or less characters. You have \`${args[0].length - MaxLength}\` more.`))

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
       
    }
}