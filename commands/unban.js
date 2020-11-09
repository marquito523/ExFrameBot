const Discord = require('discord.js')
const client = new Discord.Client()
//client.commands = new Discord.Collection()

module.exports = {
    name: 'unban',
    description: 'Unbans a user that has been banned',
    async execute( message, args) {


        const member = args[0]; 

        var MissingPerm = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("You **don't** have permission to do that.")

        var BotWithoutPerms = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Missing permission Error**")
        .setDescription("I **don't** have permission to do that.")

        var SuccesUnbanned = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Succes**")
        .setDescription(`**Succesfully** unbanned ${member}`)

        var BannedUserNotFOund = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Error finding user**")
        .setDescription(`I could **not** find the baned user you are trying to unban.`)

        var UnexpectedError = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**Unknown Error**")
        .setDescription(`There was an error when trying to unban the member. You may retry this action.`)
    

        var ValidUserId = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("**UserID Error**")
        .setDescription(`To unban a user you have to enter a Valid UserID.`)



        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(MissingPerm)


        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(BotWithoutPerms)
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