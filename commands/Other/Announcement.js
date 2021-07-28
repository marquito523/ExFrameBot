const Discord = require('discord.js')

module.exports = {
    name: 'announcement',
    async execute(client, message, args) {

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        let MessageTitle
        let timevar = 100000;
        let MessageContent

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        try{
        const b = await message.reply(new Discord.MessageEmbed().setDescription("What would you like the title to be?"))
        let i = 0;

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No replys were given in time!"))

            if(!timevar) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Canceled process due to lack of arguments!"))

            MessageTitle = timevar

            timevar = 100000;

            const x = await message.reply(new Discord.MessageEmbed().setDescription("What would you like the content to be like?"))


            await x.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++})

                if(i === 1)return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No replys were given in time!"))

                if(!timevar) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Canceled process due to lack of arguments!"))

                MessageContent = timevar

                timevar = 100000;

                const d = await message.channel.send(new Discord.MessageEmbed().setDescription(MessageContent +  "\n **Does this look good to you?** \n Answer by Yes or by No depending to you're opinion. \n \n**YES** / **NO**").setTitle(MessageTitle))

                await d.channel.awaitMessages(m => m.author.id === message.author.id,
                    {max: 1, time: timevar, errors: ["time"],}
                 ).then(async collected =>{
        
                        timevar = collected.first().content;
                    
                }).catch(() => {return i++})

                if(i === 1)return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No replys were given in time!"))


                if(timevar === "yes" || timevar === "YES" || timevar === "Yes"|| timevar === "YES"){

                    timevar = 100000;

                    const v = await message.channel.send(new Discord.MessageEmbed().setDescription("\n **Any mentions?** 1 for @everyone | 2 for @here | No for none"))

                    await v.channel.awaitMessages(m => m.author.id === message.author.id,
                        {max: 1, time: timevar, errors: ["time"],}
                     ).then(async collected =>{
            
                            timevar = collected.first().content;
                        
                    }).catch(() => {return i++})

                    if(i === 1)return message.channel.send(new Discord.MessageEmbed().setDescription(":x: No replys were given in time!"))


                    if(timevar === "1"){
                        
                        message.channel.send("@everyone")
                        return message.channel.send(new Discord.MessageEmbed().setDescription(MessageContent).setTitle("📢 " + MessageTitle + " 📢" ))

                    }else if(timevar === "2"){
                        message.channel.send("@here")
                        return message.channel.send(new Discord.MessageEmbed().setDescription(MessageContent).setTitle("📢 " + MessageTitle + " 📢" ))

                    }else{

                        return message.channel.send(new Discord.MessageEmbed().setDescription(MessageContent).setTitle("📢 " + MessageTitle + " 📢" ))


                    }

                }else{
                    timevar = 100000;
                    return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Canceled Process!"))

                }
            }catch(e){

                return message.channel.send(":x: We have not expected the unexpected!")
            }
    
        }

}

