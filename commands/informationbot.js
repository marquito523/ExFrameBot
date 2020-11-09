const {
    Client, Util
} = require('discord.js');
const Discord = require('discord.js')
const client = new Client({
    disableEveryone: true
})









module.exports = {
    name: 'bot',
    description: 'show information on the bot.',

    execute(message, args) {
        const embed = {
            color: 'random',
            title: '**Bot information**',
            fields: [{
              name: '**Bot name**',
              value: 'ExFrame',
              inline: true
             },
              {
                name: '**Bot owner**',
                value: 'marquito523',
                inline: true
              },
              {
                name: '**Bot creation date**',
                value: 'Friday, July 17th 2020',
                inline: true 
              },
              {
                name: '**Bot creation date**',
                value: 'Friday, July 17th 2020',
                inline: true 
              },
              
          ],
          footer: {
            text: 'you are gey',
          }
          }
          message.channel.send({embed: embed})


    }
}