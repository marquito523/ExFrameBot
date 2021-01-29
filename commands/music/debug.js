const Discord = require("discord.js")

module.exports = {
    name: 'debug',

    execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


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