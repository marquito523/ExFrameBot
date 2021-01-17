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


         try { 
          var embed = new Discord.MessageEmbed()
                .setTitle('**ExFrame Shop**')
                .setURL("https://marquito523.github.io/ExFrame-Website/")
                .setAuthor("ExFrame")
                .setDescription("**Pets Section** \n")
                .addFields(


                    { name: 'Cat', value: `Price: **${Prices.pets.cat}**`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Dog', value: `Price: **${Prices.pets.dog}**`, inline: true },

                    { name: 'Fish', value: `Price: **${Prices.pets.fish}**`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'dragon', value: `Price: **${Prices.pets.dragon}**`, inline: true },

                    { name: 'Dragon', value: `Price: **${Prices.pets.dragon}**`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Horse', value: `Price: **${Prices.pets.horse}**`, inline: true },

                )
                .addFields(


                    { name: 'Object Section \n'},
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Dog', value: `Price: **${Prices.pets.dog}**`, inline: true },

                    { name: 'Fish', value: `Price: **${Prices.pets.fish}**`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'dragon', value: `Price: **${Prices.pets.dragon}**`, inline: true },

                    { name: 'Dragon', value: `Price: **${Prices.pets.dragon}**`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Horse', value: `Price: **${Prices.pets.horse}**`, inline: true },

                )
                .setFooter(`${prefix}buy [Aticle name] to purchase an article!`)

                message.channel.send(embed)
         }catch(e){

             return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Shop is unavailable at the moment!"))

         }

    }
}