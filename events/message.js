const db = require('quick.db')

module.exports = (client, message) => {

    if(message.channel.type === 'dm')return

    if(message.guild === null) return 

    if(message.author.bot) return;

    if(message.author.id === client.user.id) return;

    const prefix = db.get(`guild_${message.guild.id}_prefix`) || 'm!';

    if (message.author.bot || message.channel.type === 'dm') return;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};