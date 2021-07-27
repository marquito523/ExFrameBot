const Discord = require("discord.js")
const Guild = require("../Models/Guild")
const mongoose = require("mongoose")
const { defaultprefix } = require("../../config.json")
module.exports = {
    name: "start-setup",
    async execute(client, message, args, settings) {
        if (!settings) {
            const x = await message.channel.send(new Discord.MessageEmbed().setDescription("Seems like it's the first time ExFrme's joins this server, or, no commands using Data Store were created. Would you like you create a Data Store? Yes/No").setTitle("Data Store"))
            let timevar = 100000
            let i = 0

            await x.channel.awaitMessages(m => m.author.id === message.author.id,
                { max: 1, time: timevar, errors: ["time"], }
            ).then(async collected => {

                timevar = collected.first().content;

            }).catch(() => { return i++ })

            if (i === 1) return message.channel.send(new Discord.MessageEmbed().setDescription("Seems like process has been canceled. Error Type: \n \n `REPLY_TIMEOUT` \n \n Please repeat the command."))

            timevar = timevar.toLowerCase();

            if (timevar === "yes") {

                message.channel.send(`reation of a Data Store for **${message.guild.name}**... (This might take a few seconds.)`)

                try {

                    const set = await Guild.findOne({

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

                        } else {
                            
                            console.log("Process Skipped.")

                        }
                    });

                } catch (e) {

                    return message.channel.send(new Discord.MessageEmbed().setDescription("An error with our Data Store occiered. Error Type: `UNEXPECTED_RESPONSE_API`. Please retry."))
                }

                await delay(5000);

                const v = await message.channel.send(new Discord.MessageEmbed().setDescription("Data Store Created! What would you like your prefix to be ? **Prefix needs to be 5 characters or less**(if you want to keep `m!` then type `skip`, **you can always change it later.**) **Your next message will be taken as response**."));


                let timevar = 100000
                let i = 0

                await v.channel.awaitMessages(m => m.author.id === message.author.id,
                    { max: 1, time: timevar, errors: ["time"], }
                ).then(async collected => {

                    timevar = collected.first().content;

                }).catch(() => { return i++ })

                if (i === 1) return message.channel.send(new Discord.MessageEmbed().setDescription("You have ended the process due to lack of response. The data store has been created succesfully. Error Type: `REPLY_TIMEOUT`"))

                if (message.length > 5) return message.channel.send(new Discord.MessageEmbed().setDescription("Process canceled. Your data store was created but you prefix was delete due to it being longer than 5 characters."))

                if (timevar === "skip") {
                } else {
                    const sett = await Guild.findOne({

                        guildID: message.guild.id

                    }, (err, guild) => {
                        if (err) return message.channel.send(new Discord.MessageEmbed().setDescription("An error occiered! Error: " + err))

                        if (!guild) {
                            return message.channel.send(new Discord.MessageEmbed().setDescription("An error occiered. No data matching your guild were found. **Fatal Error**. Please try accessing your Data Store with other commands. Such as prefix."))
                        }

                    })

                    await sett.updateOne({
                        prefix: timevar
                    });

                    message.channel.send(new Discord.MessageEmbed().setDescription(`Successfully setted ${timevar} as prefix.`))
                }

                message.channel.send(new Discord.MessageEmbed().setDescription("To continue setting up your guild, use the following category in help pannel: **configuration**. \n Thank you for chosing ExFrame!"))

            } else {
                if (timevar === "no") {
                    return message.channel.send(new Discord.MessageEmbed().setDescription("Process canceled **succesfully**. If you want to settup ExFrame on your guild, use the configuration pannel once you typped " + client.prefix + "help."))
                } else {
                    return message.channel.send(new Discord.MessageEmbed().setDescription("An error has ended the process. Error Type: `UNEXPECTED_REPLY`. Please try again."))
                }
            }
        }else{
            return message.channel.send("ExFrame is already setted up on this guild. If you have any modifiations to make, please type" + client.prefix + "help and navigate to the configuration pannel.")
        }
    }
}


function delay(delayInms) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(2);
        }, delayInms)

    );

}