const { MessageEmbed } = require("discord.js");
const Trade = require("../Models/Server")
const Plateforms = ["PC", "XBOX", "Playstation", "Switch"]



module.exports = {
    name: "create-profile",
    async execute(client, message, args){

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        let MessageSent = false

        let Plateform

        let NoAccount = false

        const Pre = await Trade.findOne({

            UserId: message.author.id

        }, (err, Server) => {
            if (err) console.error(err)

            let DisplayID = message.author.id

            DisplayID.toString()

            if (!Server) {
            NoAccount = true
            }else{
             }
        });

        if(NoAccount === false){
        if(Pre){
            if(Pre.Plateform){
                if(Pre.Plateform < 5 && Pre.Plateform > 0){
                    return message.channel.send(new MessageEmbed().setDescription("Your profile is up to date."))
                }
            }
        }
    }

    
        let i = 0
        let timevar = 100000

        if(NoAccount === true){

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

        }

        let Anaylyser = false

        const settings = await Trade.findOne({

            UserId: message.author.id

        }, (err, Server) => {
            if (err) console.error(err)

            let DisplayID = message.author.id

            DisplayID.toString()

            if (!Server) {
                    const newServer = new Trade({
                    UserId: message.author.id,
                    FindTrace: DisplayID,
                    Offering1: "NOTHING_NOTHING_NOTHING",
                    Offering2: "NOTHING_NOTHING_NOTHING",
                    Offering3: "NOTHING_NOTHING_NOTHING",
                    Plateform: Plateform,
                    Expecting1: "NOTHING_NOTHING_NOTHING",
                    Expecting2: "NOTHING_NOTHING_NOTHING",
                    Expecting3: "NOTHING_NOTHING_NOTHING",
                })

                newServer.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                 message.channel.send(new MessageEmbed().setDescription('We have enabled a profile for you. You can now chose 3 items to trade. A notification will be sent to anyone looking for one of does.'));
            }else{
                Anaylyser = true

                 if(MessageSent === false)message.channel.send(new MessageEmbed().setDescription("You already own a Trade Profile."));

             }
        });


        let D = message.author.id

        D.toString()

       if(!settings)return

       if(!settings.Plateform || settings.Plateform === undefined || settings.Plateform === 0 || settings.Plateform === 'undefined'){
        const V = await message.channel.send(new MessageEmbed().setDescription("On what plateform do you play? \n \n **1** ¨PC  |  **2** Xbox | **3** PlayStation | **4** Switch"))
    
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

       if(!settings.FindTrace || settings.FindTrace === undefined || settings.FindTrace === "undefined"){
           await settings.updateOne({
               FindTrace: D
           })
           
       }
    }
}