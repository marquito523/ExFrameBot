const google = require("google")
const Discord = require("discord.js")

module.exports = {
    name: "google-search",
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        console.log("hi")

        google.resultsPerPage = 5;

        google("hello", (err, res) => {

            for (var i = 0; i < res.links.length; ++i) {
                var link = res.links[i];

                console.log("hi")
                console.log("hi")
                console.log("hi")

                console.log(link.title + ' - ' + link.href)
                console.log(link.description + "\n")
                
                message.channel.send(link.title + '-' + link.href + "-" + link.description)

            }
        })
    }
}