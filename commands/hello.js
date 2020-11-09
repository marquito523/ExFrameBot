const Discord = require('discord.js')

module.exports = {
    name: 'hello',
    description: 'show an example of ping command',
    execute(message, args) {
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