const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const Guild = require("../Models/Guild")

module.exports = {
    name: "channel",
    async execute(client, message, args) {
        if (message.content === `${client.prefix}message`) {
            return message.channel.send("You need to specify a command. <`" + client.prefix + "channel <command>`>");
        } else if (message.content.startsWith(`${client.prefix}channel delete`)) {
            if (!message.author.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setDescription("You do not have permission to perform that action!"));
            const channel = message.mentions.channels.first();
            if (!channel) return message.channel.send(new MessageEmbed().setDescription("You have not specified any channels to delete, or you haven't tagged it. \n \n **Use**: <`" + client.prefix + "channel delete <#channel>`>"));
            const settings = await Guild.findOne({
                guildID: message.guild.id

            }, (err, guild) => {
                if (err) console.error(err)

                if (!guild) {
                    try {
                        channel.delete()
                        return message.channel.send(`The channel has been deleted **successfully**.`)
                    } catch (error) {
                        return message.channel.send(new MessageEmbed().setDescription("An error occiered when deleting the channel. It may be because I do not have prmissions to remove channels. if I do, please try again."))
                    }
                }
                if (channel.id === settings.SuggestionChannel.id) {
                    AwaitSuggestion(message, settings, channel)
                    return undefined
                }else if(channel.id === settings.JoinNotifChannel.id){
                    AwaitJoinNotifChannel(message, settings, channel)
                }
            });
        }
    }
}


async function AwaitSuggestion(message, settings, channel) {
    let timevar = 10000
    let i = 0
    const b = await message.channel.send(new MessageEmbed().setDescription("You are using this channel as suggestion channel. Once this channel is delete you will no longer have a suggestion channel. Are you sure you want to proceed? \n Are you sure you want to continue?").setTitle("Hold up!"));
    await b.channel.awaitMessages(m => m.author.id === message.author.id,
        { max: 1, time: timevar, errors: ["time"], }
    ).then(async collected => {

        timevar = collected.first().content;

    }).catch(() => { return i++ })

    if (i === 1) {
        return message.channel.send("No response were detected in time. Please try again.")
    }

    timevar = timevar.toLowerCase()

    if (timevar === "yes" || timevar == "yeah") {
        message.channel.send("The process has started. This may take a few seconds, while we are deleting the channel and also changing the data of your server.")
        await delay(2000);
        try {
            await settings.updateOne({
                SuggestionChannel: "None"
            });
        } catch (e) {
            return message.channel.send("**Process Error**. Could not reach Data Store.")
        }
        await delay(2000);

        try{
            channel.delete()
            return message.channel.send("**Process completed!** You no longer have a suggestion channel.")
        }catch(e){
            
        }

    } else {
        return message.channel.send(" :x: You have canceled the process.")
    }


}

async function AwaitJoinNotifChannel(message, settings, channel) {
    let timevar = 10000
    let i = 0
    const b = await message.channel.send(new MessageEmbed().setDescription("You are using this channel as Join Notification Channel. Once this channel is delete you will no longer have a Join Notification Channel. Are you sure you want to proceed? \n Are you sure you want to continue?").setTitle("Hold up!"));
    await b.channel.awaitMessages(m => m.author.id === message.author.id,
        { max: 1, time: timevar, errors: ["time"], }
    ).then(async collected => {

        timevar = collected.first().content;

    }).catch(() => { return i++ })

    if (i === 1) {
        return message.channel.send("No response were detected in time. Please try again.")
    }

    timevar = timevar.toLowerCase()

    if (timevar === "yes" || timevar == "yeah") {
        message.channel.send("The process has started. This may take a few seconds, while we are deleting the channel and also changing the data of your server.")
        await delay(2000);
        try {
            await settings.updateOne({
                JoinNotif: false
            });

            await settings.updateOne({
                JoinNotifChannel: ""
            });
        } catch (e) {
            return message.channel.send("**Process Error**. Could not reach Data Store.")
        }
        await delay(2000);

        try{
            channel.delete()
            return message.channel.send("**Process completed!** You no longer have a Join Notification Channel. Join Notification has also been **disabled.** To reinable it, you are going to have to provide a new Join Notification Channel.")
        }catch(e){
            
        }

    } else {
        return message.channel.send(" :x: You have canceled the process.")
    }


}


function delay(delayInms) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(2);
        }, delayInms)

    );

}