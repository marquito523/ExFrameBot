module.exports = {
    name: 'ping',
    description: 'show an example of ping command',
    execute(message, args) {
        return message.channel.send("pong!")
    },

}