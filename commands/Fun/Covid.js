const fetch = require('node-fetch');
const Discord = require('discord.js');
const ErrorFile = require("../../Utils/Errors.json")
const embed = new Discord.MessageEmbed()
.setTitle('Invalid Location Provided!') 
.setDescription(`Error: **${ErrorFile.NOT_FOUND}** | Please Provide a Valid Location`)
.setTimestamp()

module.exports = {
    name: "covid",
    alliaces: ["cov"],
    async execute(client, message, args) {

        let countries = args.join(" ");

        const prefix = client.prefix

        const noArgs = new Discord.MessageEmbed()
            .setTitle('Missing arguments')
            .setDescription(`Error: **${ErrorFile.MISSING_ARGUMENTS}** | Missing Arguments :x: \n \n Required Argument Missing: \`Country\` \n \n  **Use**: ${prefix}covid <country>`)
            .setTimestamp()

        if (!args[0]) return message.channel.send(noArgs);

        if (args[0] === "global") {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Statistics of the SARS-COV-2`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recovered', recovered)
                        .addField('Deaths', deaths)

                    message.channel.send(embed)
                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`COVID-19 Stats for **${countries}**`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recovered', recovered)
                        .addField('Deaths', deaths)

                    message.channel.send(embed)
                }).catch(e => {
                    return message.channel.send(embed)
                })
        }
    }
}