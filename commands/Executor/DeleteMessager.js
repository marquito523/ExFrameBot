const Discord = require("discord.js")

module.exports = {
    async execute(message){
        try {

        message.delete()

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) return


        return message.channel.send(new Discord.MessageEmbed().setDescription(`Wow there! Chill out ${message.author}! This is a friendly community! You can not swear in here. Be careful next time. If this happens to frequently, some mesures will be taken against you!`).setTitle("Hey there!"))

            } catch (e) {

             return  message.channel.send(new Discord.MessageEmbed().setDescription(`Wow there! Chill out ${message.author}! This is a friendly community! You can not swear in here. Be careful next time. If this happens to frequently, some mesures will be taken against you! \n **Warning** : *I was unable to delete the message sent by ${message.author}. I must be lacking permissions. Or, an error happened when trying to delete it.*`).setTitle("Hey there!"))

            }
    }
}