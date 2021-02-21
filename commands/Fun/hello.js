const Discord = require('discord.js')

module.exports = {
    name: 'hello',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!args[0]) {
            return message.channel.send("specify smt")
        }
        if (args[0] === "fuck") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "bitch") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Fuck") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Bitch") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Motherfucker") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "motherfucker") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "fock") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Fock") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "shit") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Shit") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "$hit") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "tf") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "wtf") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "nerd") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "nurd") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Nerd") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)
        } else if (args[0] === "Nurd") {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I am not allowed to say these types of words...`)
            message.channel.send(embed)



        } else {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`Hello, ${args[0]}`)
            message.channel.send(embed)
        }

        //  message.channel.send(`${args[0]}`)
    },

}