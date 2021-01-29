const Discord = require('discord.js')

let Prices = {
    pets: {

    cat: 75,
    dog: 75,
    fish: 50,
    dragon : 500,
    unicorn: 160,
    horse: 260
    },

    Objects: {

        Windows: 800,
        Mac: 300,
        Samsung: 700,
        Iphone: 600,
        Laptop: 700,
        Watch: 40,

    },

    Vehiculs: {

        Airplaine: 100000,
        Helicopter: 1000,
        Bus: 1000,
        Bike: 75,
        Boat: 700,



    },


}

module.exports = {
    name: "shop",
    async execute(client, message, args){
        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


return message.channel.send(":soon: Soon Available!")

         

    }
}