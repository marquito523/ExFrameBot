const Discord = require("discord.js")
const db = require("quick.db") 

const Prices = {
    Entries: 2,
}

module.exports = {
    name: "buy",
    async execute(client, message, args){

        var timevar

        const Currency = db.get(`User_${message.author.id}_Framits`) || 0

        const UserEntries = db.get(`User_${message.author.id}_GameEntries`) || 10

        const prefix = db.get(`guild_${message.guild.id}_prefix`) || "m!"

        if(message.content.startsWith(`${prefix}buy entries`)){

            const Article = "Entries"

            if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No valid number provided!"))

            if(args[2])return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Spaces detected in the number! You balance wasn't affected by the transaction."))

            if(isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No **Valid** Number Provided!"))

            var Number = args[1] * 1

            var Price = Prices.Entries * Number

            if(Currency < Price) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You don't have enough balance to purchase that!"))

            const b = await message.reply(new Discord.MessageEmbed().setDescription(`You're about to purchase the following article for the following price: \n \n **Article**: ${Article} \n **Price**: ${Price} \n **Amount**: ${args[1]} \n \n Are you **sure** you want to proceed with this transaction? Answer by \n **YES / NO**`))
            await b.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++})

                    let Old = Currency
                    let Old2 = UserEntries

                    if(timevar === "YES"){
                    try{

                       
                        db.set(`User_${message.author.id}_GameEntries`, UserEntries + args[1])


                        db.set(`User_${message.author.id}_Framits`, Currency - Price)

                        return message.channel.send(new Discord.MessageEmbed().setDescription(`:white_check_mark: Thank you for your purchase!`))


                    }catch(e){

                        db.set(`User_${message.author.id}_Framits`, Old)

                        db.set(`User_${message.author.id}_GameEntries`, Old2)

                        return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error happened when executing the command. Your balance was reset to what it was before running the command."))

                    }
               


                }else{
                    return message.channel.send(":x:")
                }

        }

    }
}