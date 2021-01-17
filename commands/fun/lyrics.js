const google = require("google")
const Discord = require("discord.js")

module.exports = {
    name: "google-search",
    async execute(client, message, args) {

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