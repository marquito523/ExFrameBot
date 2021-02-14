const { execute } = require("../help/help");

module.exports = {
    name: "edit",
    async execute(client, message, args){
            const msg = await message.channel.send("Loading... :red_circle:");
            setInterval(() => { msg.edit("HELLO"); msg.react("👋")}, 10000);
    }
}