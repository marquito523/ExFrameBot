const fs = require("fs");
let request = require("request");
const Discord = require("discord.js")

module.exports= {
 name: "listen-audio",

    async execute(client, message, args){
        return message.channel.send(new Discord.MessageEmbed().setDescription("Unavailable."))

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Please join a voice channel!");
    
        if (!fs.existsSync(`./recorded-${message.author.id}.mp3`)) return message.channel.send("Your audio is not recorded!");
    
        const connection = await message.member.voice.channel.join();
        const stream = fs.createReadStream(`./recorded-${message.author.id}.mp3`);
    
        const dispatcher = connection.play(stream, {
            type: "converted"
        });
    
        dispatcher.on("finish", () => {
            message.member.voice.channel.leave();
            return message.channel.send("The audio has ended! Left Vocal Chat.");
        })
    }

}