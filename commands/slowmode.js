const Discord = module.require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'sets a slow mode',
    execute(message, args) {

        var MissingPerm = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("You **don't** have permission to do that.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("I **don't** have permission to do that.")

        
      

        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(MissingPerm)


        if (!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.channel.send(BotWithoutPerms)

        if (!args[0])
            return message.channel.send("Spefify the length of slowmode in seconds!")
        if (isNaN(args[0])) return message.channel.send('Failed to set slowmode in this channel, Please try again')

        message.channel.setRateLimitPerUser(args[0]);
        var Succesfull = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Succesfull**")
        .setDescription("Slowmode has been set to " + args[0] + " seconds.")
        return message.channel.send(Succesfull)
    }
}