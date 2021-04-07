const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js'); 



module.exports = {
    name: 'weather',
    description: 'show an example of ping command',
    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        const prefix = client.prefix

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")



        let msg = message.content.toUpperCase();
        let sender = message.author;
        let cont = message.content.slice(prefix.length).split(" ");

        if(!args[0]) return message.channel.send((new Discord.MessageEmbed().setDescription(`:x: You need to provide a city!`)))




        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
            if (err) message.channel.send(err);


            if (result.length === 0) {
                return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: No citys named ${args} were found`)))
            }



            var current = result[0].current;
            var location = result[0].location;
            var Date = result[0].current.date
            var observationtime = result[0].current.observationtime
            var day = result[0].current.day

            const embed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', location.degreetype, true)
                .addField('Temperature', `${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .addField('Date', `${Date}`, true)
                .addField('Day', `${day}`, true)
                .addField('Observation Time', `${observationtime}`, true)
    


            message.channel.send({ embed });
        });
    }
}