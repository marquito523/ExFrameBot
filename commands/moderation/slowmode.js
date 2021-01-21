const Discord = module.require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'sets a slow mode',
    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        var MissingPerm = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("You **don't** have permission to do that. You need `MANAGE_MESSAGES` permission.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("I **don't** have permission to do that. I need `MANAGE_MESSAGES` permission.")

        
      

        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(MissingPerm)


        if (!message.guild.me.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(BotWithoutPerms)

        if (!args[0])
            return message.channel.send(" :x: Spefify the length of slowmode in seconds!")
        if (isNaN(args[0])) return message.channel.send(' :x: Failed to set slowmode in this channel, Please try again')

        message.channel.setRateLimitPerUser(args[0]);
        var Succesfull = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Succesfull**")
        .setDescription(" :white_check_mark:  Slowmode has been set to " + args[0] + " seconds.")
        return message.channel.send(Succesfull)
    }
}