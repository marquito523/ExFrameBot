const Discord = require('discord.js')
const client = new Discord.Client()
//client.commands = new Discord.Collection()

module.exports = {
    name: 'unban',
    description: 'Unbans a user that has been banned',
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")



        const member = args[0]; 

        var MissingPerm = new Discord.MessageEmbed()
        .setTitle("**Missing permission Error**")
        .setDescription(" :x: You **don't** have permission to do that. You need `BAN_MEMBERS` permission.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setTitle("**Missing permission Error**")
        .setDescription(" :x: I **don't** have permission to do that. I need `BAN_MEMBERS` permission.")

        var SuccesUnbanned = new Discord.MessageEmbed()
        .setTitle("**Succes**")
        .setDescription(` :white_check_mark: **Succesfully** unbanned ${member}`)

        var BannedUserNotFOund = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Error finding user**")
        .setDescription(` :x: I could **not** find the banned user you are trying to unban.`)

        var UnexpectedError = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Unknown Error**")
        .setDescription(` :x: There was an error when trying to unban the member. You may retry this action.`)
    

        var ValidUserId = new Discord.MessageEmbed()
        .setTitle("**UserID Error**")
        .setDescription(` :x: To unban a user you have to enter a Valid UserID.`)



        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send(MissingPerm)


        if (!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send(BotWithoutPerms)
        if(!member){return message.channel.send(ValidUserId)}

        let BannedUser = message.guild.fetchBans(member)
        if(!member)return message.channel.send(BannedUserNotFOund)
        try {
            
                message.guild.members.unban(member);
            await  message.channel.send(SuccesUnbanned) //message.channel.send(`${member} has been unbanned`);
        } 
        catch (e) {
            return message.channel.send(UnexpectedError);

           
        }
    }
}


//try {
    //command.execute(message, args);
 //} catch (error) {
    //console.error(error);
   // message.reply('There was an error executing that command.').catch(console.error);
 //}