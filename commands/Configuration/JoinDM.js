const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")


const { DefaultJoinMessage } = require("../../config.json")


module.exports = {
    name: "join-message",
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))

        if (!args[1]) return message.channel.send(" :x: You need to specify a message to send!")

        const commandName = `${client.prefix}join-message`

        const Text = message.content.substring(commandName.length)

        if (!Text) return message.channel.send(" :x: You need to specify a message to send!")

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

       
        if(!settings)return 



        await settings.updateOne({
           SendText: Text
        });

        return message.channel.send(`:white_check_mark: Message has been se to ${Text} **${message.guild.name}**!`);


        

    }

}