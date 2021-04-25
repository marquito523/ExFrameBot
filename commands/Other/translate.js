const translate = require('translate-google')

module.exports = {
    name: 'translate',
    description: 'show an example of ping command',
    async execute(client, message, args) {
        
        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        return message.chhannel.send("Soon Available")
translate('I speak Chinese', {to: 'french'}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})
    }}