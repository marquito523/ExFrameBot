const fs = require("fs");
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {

    name: "record",
    async execute(client, message, args) {
        let timevar = 100000

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }


        i = 0
        x = 0

        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Please join a voice channel first!");

        if (fs.existsSync(`./recorded-${message.author.id}.mp3`)) {

            const e = await message.channel.send(new Discord.MessageEmbed().setTitle("Hold up!").setDescription("By recording a new Audio file, **you will delete your previous one**. Are you sure you want to? \n \n **YES** | **NO**"));

            await e.channel.awaitMessages(m => m.author.id === message.author.id,
                { max: 1, time: timevar, errors: ["time"], }
            ).then(async collected => {

                timevar = collected.first().content;

            }).catch(() => { return x++ })

            if (x === 1) return message.channel.send("No answers provided in time. Retype the command in order to restart the process.")

            if (timevar === "YES" || timevar === "yes" || timevar === "Yes" || timevar === "yEs" || timevar === "yES" || timevar === "YeS" || timevar === "yeS") {

            } else {

                return message.channel.send(":x: Canceled Process!")

            }
        }
        try {
            const connection = await message.member.voice.channel.join();
            const b = await message.channel.send("**Starting To Record!** \n To stop the recording say anything in this channel!")
            const receiver = connection.receiver.createStream(message.member, {
                mode: "pcm",
            });


            let timevar = 100000
            await b.channel.awaitMessages(m => m.author.id === message.author.id,
                { max: 1, time: timevar, errors: ["time"], }
            ).then(async collected => {


                timevar = collected.first().content;

            }).catch(() => { return i++ })

            if (i === 1) {
                const writer = receiver.pipe(fs.createWriteStream(`./recorded-${message.author.id}.mp3`));
                writer.on("finish", () => {
                    message.member.voice.channel.leave();
                    message.channel.send("Time exeeded! Your file has been wrote!");
                });
            }
            timevar = "StopRec"

            if (timevar === "StopRec") {

                const writer = receiver.pipe(fs.createWriteStream(`./recorded-${message.author.id}.mp3`));
                writer.on("finish", () => {
                    message.member.voice.channel.leave();
                    message.channel.send("Finished writing audio");

                });
            }
        } catch (e) {
            return message.channel.send(":x: Error Timeout Connection Exeeded! Please try again.")

        }

    }

}
