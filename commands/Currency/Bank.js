const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const User = require("../Models/User")


module.exports = {
    name: "bank-account",

    async execute(client, message, args) {
getSelection,
        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const settings = await User.findOne({

            UserId: message.author.id

        }, (err, user) => {
            if (err) console.error(err)

            if (!user) {
                const newAccount = new User({
                    _id: mongoose.Types.ObjectId(),
                    UserId: message.author.id,
                    UserName: message.author.name,
                    UserCurrency: 75,
                    UserEntries: 10,
                    Rank: "Unranked",
                })

                newAccount.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                return message.channel.send(':white_check_mark: **Your account** has been created! \n \n Thank you for chosing us!');
            } else {

                return message.channel.send(":x: Seems like you already have a bank account currently running. You can not recreat another one before deleting your current one.")

            }
        });

    }
}