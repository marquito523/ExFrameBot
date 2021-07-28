const Discord = require("discord.js")
const ErrorFile = require("../../Utils/Errors.json")
const Errors = {
    UNEXPECTED_ERROR: ErrorFile.UNEXPECTED_ERROR,
    ALREADY_EXISTING: ErrorFile.ALREADY_EXISTING,
    NOT_FOUND: ErrorFile.NOT_FOUND,
    LATENCY: ErrorFile.LATENCY,
    NETWORK_ERROR: ErrorFile.NETWORK_ERROR,
    VPS_NOT_RESPONDING: ErrorFile.VPS_NOT_RESPONDING,
    UNAVAILABLE: ErrorFile.UNAVAILABLE,
    MISSING_ARGUMENTS: ErrorFile.MISSING_ARGUMENTS
}

module.exports = {
    name: "error-codes",
    alliaces: "errors",
    async execute(client, message, args){
        return message.channel.send(new Discord.MessageEmbed().setTitle("**Error Codes**").setDescription(`Error codes are used to identify the category of error you may have. \n \n **Error Codes:** \n UNEXPECTED_ERROR: **${Errors.UNEXPECTED_ERROR}** \n LATNECY: **${Errors.LATENCY}**\n MISSING_ARGUMENTS: **${Errors.MISSING_ARGUMENTS}** \n VPS_NOT_RESPONDING: **${Errors.VPS_NOT_RESPONDING}** \n UNAVAILABLE: **${Errors.UNAVAILABLE}** \n NETWORK_ERROR: **${Errors.NETWORK_ERROR}** \n ALREADY_EXISTING: **${Errors.ALREADY_EXISTING}**`))
    }
}