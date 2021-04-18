const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "calculate",
    description: "Get the answer to a math problem",
   async execute(client, message, args){

    const prefix = client.prefix

        if(!args[0]) return message.channel.send('Please provide a expression');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            if(message.content === `${prefix}calculate ExFrame` || message.content === `${prefix}calculate Exrame` || message.content === `${prefix}calculate exframe` || message.content === `${prefix}calculate exFrame`){
                resp = "Great Bot!"
            }else if (message.content === `${prefix}calculate Exyno` ||message.content === `${prefix}calculate exyno`){
                resp = "A great partner of ExFrame!"
            }else{
            return message.channel.send('Please provide a **valid** question')
            }
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}