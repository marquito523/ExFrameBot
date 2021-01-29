const Discord = require('discord.js')
NumberLimit = 6


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}



module.exports = {
    name: 'rolldice',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        var MissingNumber = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing number missing Error**")
        .setDescription("To use this command, you need to enter the number you think I will chose. Syntax => ``!rolldice` + number between **1** and **6**.")
    
        var NotNumber = new Discord.MessageEmbed()
        .setTitle('**ExFrame Not a Number error**')
        .setColor('RANDOM')
        .setDescription(`${args[0]} is not a number. Please try entering a valid number.`)
        .setFooter("ExFrame Dice command, developped by marquito523")
        .setTimestamp()
    
        var OverLimit = new Discord.MessageEmbed()
        .setTitle('**ExFrame Over Limit error**')
        .setColor('RANDOM')
        .setDescription(`${args[0]} is over the limit which is set to ${NumberLimit}`)
        .setFooter("ExFrame Dice command, developped by marquito523")
        .setTimestamp()

        var UnexpectedError = new Discord.MessageEmbed()
        .setTitle('**ExFrame Error**')
        .setColor('RANDOM')
        .setDescription(`For some reason the number found randomly has not been generated correctly, this message is pretty rare, if you get this error oftenly please contact us!`)
        .setFooter("ExFrame Dice command, developped by marquito523")
        .setTimestamp()



        if (isNaN(args[0])) return message.channel.send(NotNumber)
        const number = args[0];
        winNumber = getRandomInt(1, 6)
        if(winNumber === 1){
            winNumber = "1"
        }else if(winNumber === 2){
            winNumber = "2"
        }else if(winNumber === 3){
            winNumber = "3"
        }else if(winNumber === 4){
            winNumber = "4"
        }else if(winNumber === 5){
            winNumber = "5"
        }else if(winNumber === 6){
            winNumber = "6"
            }else{
                return message.channel.send(UnexpectedError)
        }

        if (args[0] > NumberLimit) return message.channel.send(OverLimit)
       
        var YouWon = new Discord.MessageEmbed()
            .setTitle('**ExFrame Dice**')
            .setColor('RANDOM')
            .setDescription(`The dice fell on the ${winNumber}, you won well done!`)
            .setFooter("ExFrame dice command, developped by marquito523")
            .setTimestamp()

        var Lost = new Discord.MessageEmbed()
            .setTitle('**ExFrame Dice**')
            .setColor('RANDOM')
            .setDescription(`The dice fell on the ${winNumber}, you lost, try again!`)
            .setFooter("ExFrame dice command, developped by marquito523")
            .setTimestamp()
        if (number === "1") {
            if (number === winNumber) {
                return message.channel.send(YouWon)
            } else {
                return message.channel.send(Lost)
            }
        } else if (number === "2") {
            if (number === winNumber) {
                return message.channel.send(YouWon)
            } else {
                return message.channel.send(Lost)
            }
        } else if (number === "3") {
            if (number === winNumber) {
                return message.channel.send(YouWon)
            } else {
                return message.channel.send(Lost)
            }
        } else if (number === "4") {
            if (number === winNumber) {
                return message.channel.send(YouWon)
            } else {
                return message.channel.send(Lost)
            }
        } else if (number === "5") {
            if (number === winNumber) {
                return message.channel.send(YouWon)
            } else {
                return message.channel.send(Lost)
            }
        } else if (number === "6") {
            if (number === winNumber) {
                return message.channel.send(YouWon)
            } else {
                return message.channel.send(Lost)
            }
        } else {

        }





    }

}