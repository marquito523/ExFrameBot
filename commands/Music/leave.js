const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "leave",
    async execute(client, message, args){
        if(!message.guild.me.voice.channel)return message.channel.send(new MessageEmbed().setDescription("I'm currently connected to no voice channels in this server."))

        if(!client.player.getQueue(message)){

            try{
                await message.guild.me.voice.channel.leave()
                
                return message.channel.send(new MessageEmbed().setDescription(`Sussesfully left **${message.guild.me.voice.channel.name}**!`))
            }catch(err){
                return message.channel.send(new MessageEmbed().setDescription(`An error occiered. Error! **${err}**`))
            }
        }else{
            let timevar = 100000
            let i = 0

            const b = await message.channel.send(new MessageEmbed().setDescription(`There is a song currently playing in **${message.guild.me.voice.channel.name}**. Are you sure you want to leave the channel? Doing so will delete the existing queue, and will stop the playing song. \n \n **Yes** / **No**`));

            await b.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++}) 
            
                if(i === 1)return message.channel.send(new MessageEmbed().setDescription("Exceeded Time **Error**: `TIME_OUT`"))

                timevar = timevar.toLowerCase();

                if(timevar === "yes")try{

                 await message.guild.me.voice.channel.leave()
                 
                 client.player.clearQueue(message);

                 return message.channel.send(new MessageEmbed().setDescription("**Succes!**"))

                }catch(err){

                }

                return message.channel.send(new MessageEmbed().setDescription("Process Canceled."))
        }
    }
}