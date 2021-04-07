const Discord = require("discord.js")


module.exports = {
    async execute(client, message, args){
        const x = await message.channel.send(new Discord.MessageEmbed().setTitle("**Types of Music**").setDescription("You have not specified any music. Here are some themes you can select. Once you have selected one, a music in relation with what you chose will play. \n \n Theme 1: **Sad Musics or Chills Musics** (1) \n \n Theme 2: **Energized Music or Happy Musics** (2) \n \n Theme 3: **Rap** (3) \n \n To chose any of these, type in their theme number **(1/2/3)**. If not, type in **cancel**"))

        let timevar = 100000
        let i = 0

        await x.channel.awaitMessages(m => m.author.id === message.author.id,
            { max: 1, time: timevar, errors: ["time"], }
        ).then(async collected => {

            timevar = collected.first().content;

        }).catch(() => { return i++ })

        if(i === 1)return message.channel.send(new Discord.MessageEmbed().setDescription("No valid response were given on time."))

        if(timevar === "cancel"){

            return message.channel.send(new Discord.MessageEmbed().setDescription("Canceled Process."))

       }else if(timevar === '1'|| timevar === 1){

            try{

                client.player.play(message, 'https://www.youtube.com/watch?v=uIFFF8p11Hk');

                return message.channel.send(new Discord.MessageEmbed().setTitle('Sad Music').setURL('https://www.youtube.com/watch?v=uIFFF8p11Hk').setDescription('Go find these musics on [YouTube](https://www.youtube.com/watch?v=uIFFF8p11Hk)!'))

            }catch(err){

                message.channel.send(new Discord.MessageEmbed().setDescription(`There was an error when executing the command. Error: ${err}`))

            }
        }else if(timevar === '2' || timevar === 2){


            try{

                client.player.play(message, 'https://www.youtube.com/watch?v=MWKki0K5yCM');

                return message.channel.send(new Discord.MessageEmbed().setTitle('Energized Musics or Happy Musics ').setURL('https://www.youtube.com/watch?v=MWKki0K5yCM').setDescription('Go find these musics on [YouTube](https://www.youtube.com/watch?v=uIFFF8p11Hk)!'))

            }catch(err){

                message.channel.send(new Discord.MessageEmbed().setDescription(`There was an error when executing the command. Error: ${err}`))

            

            }
        }else if(timevar === '3' || timevar === 3){

            try{

                client.player.play(message, 'https://www.youtube.com/watch?v=OlDIMiutXXw&list=PLlYKDqBVDxX1Q_jLy_Olg_VlQpl_xZEX1');

                return message.channel.send(new Discord.MessageEmbed().setTitle('French Rap').setURL('https://www.youtube.com/watch?v=OlDIMiutXXw&list=PLlYKDqBVDxX1Q_jLy_Olg_VlQpl_xZEX1').setDescription('Go find these musics on [YouTube](https://www.youtube.com/watch?v=uIFFF8p11Hk)!'))

            }catch(err){

                message.channel.send(new Discord.MessageEmbed().setDescription(`There was an error when executing the command. Error: ${err}`))
         

            }

        }else{
            return message.channel.send(new Discord.MessageEmbed().setDescription("Your answer was not understood."))
        }

    }
}



