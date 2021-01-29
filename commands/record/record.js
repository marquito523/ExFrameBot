const fs = require("fs");

module.exports = {

    name: "record",
    async execute(client, message, args) {
        let timevar = 100000

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }

        return message.channel.send("This Feature will soon be available!")

        i = 0

        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Please join a voice channel first!");
try{
        const connection = await message.member.voice.channel.join();
        const b = await message.channel.send("**Starting To Record!** \n To stop the recording say anything in this channel!")
        const receiver = connection.receiver.createStream(message.member, {
            mode: "pcm",
        });



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
        }catch(e){
            return message.channel.send(":x: Error Timeout Connection Exeeded! Please try again.")
        
        }

    }

}
