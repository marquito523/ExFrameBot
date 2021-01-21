const db = require("quick.db")
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

        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "m!"

return message.channel.send(":soon: Soon Available!")

         

    }
}