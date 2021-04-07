const { MessageEmbed } = require("discord.js")
const Trade = require("../Models/Server")

module.exports = {
    name: "trade",
    async execute(client, message, args) {
        let V = false
        const settings = await Trade.findOne({

            UserId: message.author.id

        }, (err, Server) => {
            if (err) console.error(err)

            if (!Server) {
                V = true
                return message.channel.send(new MessageEmbed().setDescription(`You do not own a profile! Please type in \`${client.prefix}create-profile\` to own one!`))
            }
        })

        if(V === true)return


        let i = 0;

        let timevar = 100000

        let Slot1Containing 
        let Slot2Containing 
        let Slot3Containing 

        if(!settings)return

        if(!settings.Offering1 || settings.Offering2 === "NOTHING_NOTHING_NOTHING"){
            
            Slot1Containing = "Nothing"
        }else{

            Slot1Containing = settings.Offering1

        }

        if(!settings.Offering2 || settings.Offering2 === "NOTHING_NOTHING_NOTHING"){
            
            Slot2Containing = "Nothing"
        }else{

            Slot2Containing = settings.Offering2

        }


        if(!settings.Offering3 || settings.Offering3 === "NOTHING_NOTHING_NOTHING"){
            
            Slot3Containing = "Nothing"
        }else{

            Slot3Containing = settings.Offering3

        }

        


        const b = await message.channel.send(new MessageEmbed().setDescription(`What would slot would you like to edit? Knowing the following information:\n \n **You are currently:** \n \n **Slot 1**: ${Slot1Containing}\n \n **Slot 2**: ${Slot2Containing}\n \n **Slot 3**: ${Slot3Containing} \n \n Which one would you like to edit? Please answer by typing ONLY the number of the slot. \n \n **For example** I want to edit Slot 1 => I reply 1.`))

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

            let Exc 

            try{
            Exc = timevar* 1
            }catch(e){
                return message.channel.send(new MessageEmbed().setDescription("Unexpected Reply!"));
            }

            if(Exc > 3 || Exc < 1)return message.channel.send(new MessageEmbed().setDescription("You have not entered a valid number!"));

            if(Exc === 1){

                i = 0

                timevar = 100000

                const L = await message.channel.send(new MessageEmbed().setDescription("What would you like the item to be? **[What will appear in your slot will be what you will type here => SAME SPELLING! THE SPELLING WILL BE TAKEN IN COUNT BY THE ALGORYTHEM!**"))


                await L.channel.awaitMessages(m => m.author.id === message.author.id,
                    {max: 1, time: timevar, errors: ["time"],}
                    ).then(async collected =>{
        
                        timevar = collected.first().content;
                    
                    }).catch(() => {return i++})


                    if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

                    const FilterTextMessage = timevar

                    if(timevar.length > 30) return message.channel.send(new MessageEmbed().setDescription("Too long slot containing!"))


                    if (FilterTextMessage.includes("fuck") || FilterTextMessage.includes("shit") || FilterTextMessage.includes("fock") || FilterTextMessage.includes("nerd") || FilterTextMessage.includes("nigger") || FilterTextMessage.includes("niggor") || FilterTextMessage.includes("nigar") || FilterTextMessage.includes("nig") || FilterTextMessage.includes("mdafucker") || FilterTextMessage.includes("fuckyou") || FilterTextMessage.includes("nigeria") || FilterTextMessage.includes("bitch") || FilterTextMessage.includes("bich") || FilterTextMessage.includes("b***") || FilterTextMessage.includes("f***") || FilterTextMessage.includes("putain") || FilterTextMessage.includes("ta mere") || FilterTextMessage.includes("Ta mere") || FilterTextMessage.includes("ta mère") || FilterTextMessage.includes("Ta mère") || FilterTextMessage.includes("nique") || FilterTextMessage.includes("wtf"))return message.channel.send(new MessageEmbed().setDescription("Your message contains swear words. Your request cannot be taken in count."));

                    timevar = timevar.toLowerCase()

                    await settings.updateOne({
                        Offering1: timevar
                    });

                    return message.channel.send(new MessageEmbed().setDescription("Successfully edited slot containing!"))



            }else if(Exc === 2){




                i = 0

                timevar = 100000

                const L = await message.channel.send(new MessageEmbed().setDescription("What would you like the item to be? **[What will appear in your slot will be what you will type here => SAME SPELLING! THE SPELLING WILL BE TAKEN IN COUNT BY THE ALGORYTHEM!**"))


                await L.channel.awaitMessages(m => m.author.id === message.author.id,
                    {max: 1, time: timevar, errors: ["time"],}
                    ).then(async collected =>{
        
                        timevar = collected.first().content;
                    
                    }).catch(() => {return i++});


                    if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

                    const FilterTextMessage = timevar

                    if (FilterTextMessage.includes("fuck") || FilterTextMessage.includes("shit") || FilterTextMessage.includes("fock") || FilterTextMessage.includes("nerd") || FilterTextMessage.includes("nigger") || FilterTextMessage.includes("niggor") || FilterTextMessage.includes("nigar") || FilterTextMessage.includes("nig") || FilterTextMessage.includes("mdafucker") || FilterTextMessage.includes("fuckyou") || FilterTextMessage.includes("nigeria") || FilterTextMessage.includes("bitch") || FilterTextMessage.includes("bich") || FilterTextMessage.includes("b***") || FilterTextMessage.includes("f***") || FilterTextMessage.includes("putain") || FilterTextMessage.includes("ta mere") || FilterTextMessage.includes("Ta mere") || FilterTextMessage.includes("ta mère") || FilterTextMessage.includes("Ta mère") || FilterTextMessage.includes("nique") || FilterTextMessage.includes("wtf"))return message.channel.send(new MessageEmbed().setDescription("Your message contains swear words. Your request cannot be taken in count."));

                    if(timevar.length > 30) return message.channel.send(new MessageEmbed().setDescription("Too long slot containing!"))

                    timevar = timevar.toLowerCase()

                    await settings.updateOne({
                        Offering2: timevar
                    });

                    return message.channel.send(new MessageEmbed().setDescription("Successfully edited slot containing!"))



            }else if(Exc === 3){



                i = 0

                timevar = 100000

                const L = await message.channel.send(new MessageEmbed().setDescription("What would you like the item to be? **[What will appear in your slot will be what you will type here => SAME SPELLING! THE SPELLING WILL BE TAKEN IN COUNT BY THE ALGORYTHEM!**"))


                await L.channel.awaitMessages(m => m.author.id === message.author.id,
                    {max: 1, time: timevar, errors: ["time"],}
                    ).then(async collected =>{
        
                        timevar = collected.first().content;
                    
                    }).catch(() => {return i++})


                    if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

                    const FilterTextMessage = timevar

                    if (FilterTextMessage.includes("fuck") || FilterTextMessage.includes("shit") || FilterTextMessage.includes("fock") || FilterTextMessage.includes("nerd") || FilterTextMessage.includes("nigger") || FilterTextMessage.includes("niggor") || FilterTextMessage.includes("nigar") || FilterTextMessage.includes("nig") || FilterTextMessage.includes("mdafucker") || FilterTextMessage.includes("fuckyou") || FilterTextMessage.includes("nigeria") || FilterTextMessage.includes("bitch") || FilterTextMessage.includes("bich") || FilterTextMessage.includes("b***") || FilterTextMessage.includes("f***") || FilterTextMessage.includes("putain") || FilterTextMessage.includes("ta mere") || FilterTextMessage.includes("Ta mere") || FilterTextMessage.includes("ta mère") || FilterTextMessage.includes("Ta mère") || FilterTextMessage.includes("nique") || FilterTextMessage.includes("wtf"))return message.channel.send(new MessageEmbed().setDescription("Your message contains swear words. Your request cannot be taken in count."));

                    if(timevar.length > 30) return message.channel.send(new MessageEmbed().setDescription("Too long slot containing!"));

                    timevar = timevar.toLowerCase();

                    await settings.updateOne({
                        Offering3: timevar
                    });

                    return message.channel.send(new MessageEmbed().setDescription("Successfully edited slot containing!"));


            }else{

                return message.channel.send(new MessageEmbed().setDescription("Unexpected Reply!"))

            }

    }
}