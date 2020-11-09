const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'shows a panel that helps the user',
    execute(message, args) {
        message.channel.send("What do you need help with?")
        var embed = new Discord.MessageEmbed()
            .setTitle('**ExFrame Help**')
            .setColor('RANDOM')
            .setDescription('**ExFrame**               ***Here are the different parts of the bot you can explore!*** \n \n***Command type*** : **Fun** [Everyone]\n \n**Music Playing!**  *Start music* :``!play``+``Youtube URL``, *stop the music* :``!stop`` *skip* :``skip`` ``np`` ``queue``\n **Roll Dice** : ``!`` + ``rolldice`` + expected number between 1-6 \n **Slap** ``!`` + ``slap`` + ``user in guild`` (mention):  \n **Interact** : ``!`` + Sentances example => ``!hi`` \n **Very good jokes** : ``!joke`` and I will tell you a very good joke, do not worry.\n **Rate** : ``!rate`` + user (full username or ping)\n **Memes** : ``!meme`` as simple as that! You see how easy it is?!\n **Counting** : ``!`` + ``count`` and the bot will count for you :D! \n \n ***Command type*** : **Moderation** [moderator/moderator +]\n\n **Kick** : ``!kick`` + ``User`` + ``Reason`` \n ** Ban** : ``!ban`` + ``user`` + ``Reason`` + (Facultative) ``time``\n **Mute** : Must be associated to a role ``!mute`` + ``user`` + ``time`` + ``reason``\n **Mute setup** : ``!muterole`` + ``NameOfTheRole`` \n **Warn** : ``!warn`` + ``user`` + ``reason`` \n **Purge** ``!purge`` + ``number of messages to delete`` [under 100]\n **Unban** ``!`` + ``unban`` + ``UserID``: \n**Slowmode** ``!`` + ``slowmode`` + ``amount in seconds``: \n\n ***Command type*** : **Roles** [moderator/moderator +]\n **Add a role** : ``!add role`` + ``role name`` + ``user to add role ``\n  **Take role away** : ``!removerole`` + ``role name`` + ``user to remove role`` \n \n  ***Command type*** : ** Bot** [Absolutaly EVERYONE] \n \n **Invites** : ``!invites``Displays partner bots created by friends or friends of ExFrame!\n\n **IMPORTANT**: \n  If you run into any bugs frequently, or you need help with a command please type the following: ``!supportserver`` this will give you an invitation to ExFrame\'s support server. Once there please report your bug, or ask your question a staff member staff or a membe that knows the answer.\n **Invite** : ``!invite`` Thank you very much for inviting me! \n\n For more information type !info + command that you want.')
            .setTimestamp()
        return message.channel.send(embed)
    },

}