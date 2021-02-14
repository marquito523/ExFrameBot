const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const User = require("../Models/User")

const Prices = {
    Entries: 2,
}

module.exports = {
    name: "buy",
    async execute(client, message, args){

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        var timevar

        let UserC

        const UserSettings = await User.findOne({

            UserId: message.author.id
    
        }, (err, user) => {
    
            UserC = user
    
            if (err) console.error(err)
    
        })
        let Currency

        let UserEntries

    
       if (!UserC){

    return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You do not own any bank accounts! But that's fine, go creat one now by typing in \n `" + prefix + "bank-account`").setFooter("ExFrame Bank Services").setAuthor("ExFrame International Bank").setTitle("**ExFrame Offical Bank Message**"))


       }else{

        Currency = UserSettings.UserCurrency

        UserEntries = UserSettings.UserEntries

       }

        const prefix = client.prefix

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

                        await UserSettings.updateOne({
                            UserEntries: UserEntries + Number
                        });

                        await UserSettings.updateOne({
                            UserCurrency: Currency - Price
                        });


                        return message.channel.send(new Discord.MessageEmbed().setDescription(`:white_check_mark: Thank you for your purchase!`))


                    }catch(e){

                        await UserSettings.updateOne({
                            UserEntries: Old2
                        });

                        await UserSettings.updateOne({
                            UserCurrency: Old
                        });

                        return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error happened when executing the command. Your balance was reset to what it was before running the command."))

                    }
               


                }else{
                    return message.channel.send(":x: Canceled Transaction.")
                }

        }

    }
}