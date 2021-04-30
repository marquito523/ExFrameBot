const { MessageEmbed } = require("discord.js");
const Trade = require("../Models/Server")
const Plateforms = ["PC", "XBOX", "Playstation", "Switch"]



module.exports = {
    name: "edit-plateform",
    async execute(client, message, args){
        
        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

    
        let i = 0
        let timevar = 100000

        let Plateform
    

        const settings = await Trade.findOne({

            UserId: message.author.id

        }, (err, Server) => {
            if (err) console.error(err)

            let DisplayID = message.author.id

            DisplayID.toString()

            if (!Server) {
                return message.channel.send(new MessageEmbed().setDescription('You do not own a profile. Please create one. `' + client.prefix + 'create-profile`'));
            }
        });



       if(!settings)return

        const V = await message.channel.send(new MessageEmbed().setDescription("On what plateform do you play? \n \n **1** PC  |  **2** Xbox | **3** PlayStation | **4** Switch"))
    
        await V.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{
    
                timevar = collected.first().content;
            
            }).catch(() => {return i++})
    
            if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

            if(timevar === '1' || timevar === '2' || timevar === '3' || timevar === '4'){

                timevar = timevar * 1

                Plateform = timevar

                message.channel.send(new MessageEmbed().setDescription(`You have set your plateform to ${Plateforms[timevar - 1]}`))

            }else{
                return message.channel.send(new MessageEmbed().setDescription(' :x:  Invalid Response.'))
            }

            try{
                await settings.updateOne({
                    Plateform: Plateform
                });
            }catch(err){

            }
       }
    }
