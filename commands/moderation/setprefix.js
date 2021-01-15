const db = require('quick.db')
const Discord = require("discord.js")
const { defaultprefix } = require("../../config.json")

module.exports = {
    name: 'prefix',
    description: 'Gives a cutom prefix',
    async execute(client, message) {

        const prefix = db.get(`guild_${message.guild.id}_prefix`) || 'm!';

        const args = message.content.substring(prefix.length).split(' ');

        let member = message.author

        let avatar = member.displayAvatarURL({ size: 1024 })

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You **do not** have permission to run this command!").setTitle("Missing Permission Error"))


        if (message.content == `${prefix}prefix reset`) {

            try {
                db.set(`guild_${message.guild.id}_prefix`, defaultprefix);

                return message.channel.send(new Discord.MessageEmbed().setDescription(`:white_check_mark: Succesfully reseted prefix of ${message.guild.name} to ${defaultprefix}`).setFooter("Prefix Reset"))

            } catch (e) {

                return message.channel.send(":x: An error occiered with our Data Stores!")

            }

        } else {

            if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription("The current prefix is `" + prefix + "` in this guild. \n To be able to change it type" + prefix + " prefix + new prefix. Although, in order to be able to change the prefix, you need the `MANAGE_GUILD` permission.").setFooter("Display Guild Prefix"))

            if (args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription("You can not have a composed prefix.").setFooter("Prefix Error"))

            try {

                db.set(`guild_${message.guild.id}_prefix`, args[1]);

                return message.channel.send(new Discord.MessageEmbed().setDescription(`:white_check_mark: Succesfully changed prefix of ${message.guild.name} to ${args[1]}`))

            } catch (e) {
                return message.channel.send(":x: An error occiered with our Data Stores!")
            }
        }
    }
}