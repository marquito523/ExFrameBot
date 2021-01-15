const Discord = require("discord.js")

module.exports = {
    name: 'debug',

    execute(client, message, args) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        const queue = client.player.getQueue(message);

        if (queue) {

            try {

                client.player.clearQueue(message);

                    client.player.setRepeatMode(message, false);
            
                    client.player.stop(message);
            
                    message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.success}debugged`));
                    
            
  } catch (e) {


                return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error occiered when executing the command"))


            }
        }else{

            
        try{

            client.player.setRepeatMode(message, false);
    
            client.player.stop(message);
    
            message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emotes.success}debugged`));
    
            }catch(e){
    
             return message.channel.send(new Discord.MessageEmbed().setDescription("The bot was maybe not connected to a VC."))
    
    
            }

        }
    }
}