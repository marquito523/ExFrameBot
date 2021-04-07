const { MessageEmbed } = require("discord.js")
const User = require("../Models/User")
const RankNumbers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Champion", "Grand Champion", "Supersonic Legend"]
const mongoose = require("mongoose")


module.exports = {
    name: "rank",
    async execute(client, message, args) {

        let ServerManager = false

        const settings = await User.findOne({

            UserId: message.author.id

        }, (err, user) => {
            if (err) console.error(err)

            if (!user) {

                ServerManager = true

                const newAccount = new User({
                    _id: mongoose.Types.ObjectId(),
                    UserId: message.author.id,
                    UserName: message.author.name,
                    UserCurrency: 75,
                    UserEntries: 10,
                    Rank: "Unranked",
                })

                newAccount.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                return message.channel.send(new MessageEmbed().setDescription(`Your account was not registered into our Data Base. Please retype the command.`));
            }
        })

        if(!settings)return

        if(ServerManager === true)return

        let i = 0

        let timevar = 100000

        let Rank

        if(!settings.Rank || settings.Rank === "undefined"){
            Rank = "Unranked"
            await settings.updateOne({
                Rank: "Unranked"
            });
        }else{

            Rank = settings.Rank

        }


            const b = await message.channel.send(new MessageEmbed().setDescription(`Your current rank is set to ${Rank}. Would you like to modify it? \n **Yes** or **No**`))
        
            await b.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++})


                if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

               timevar = timevar.toLowerCase()

               if(!timevar === 'yes')return message.channel.send(new MessageEmbed().setDescription("Process Ended."))

               const x = await message.channel.send(new MessageEmbed().setDescription(`To what would you like to change it? \n \n **Options** \n \n Bronze (**1**) - Silver(**2**) - Gold(**3**) - Platinum(**4**) - Diamond(**5**) - Champion(**6**) - Grand Champion(**7**) - Supersonic Legend | SSL (**8**) \n \n **Please ONLY reply the number that is in "()". **`))

                i = 0

                timevar = 100000

               await x.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: timevar, errors: ["time"],}
                ).then(async collected =>{
    
                    timevar = collected.first().content;
                
                }).catch(() => {return i++})

                if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

                let Exc

                try{

                 Exc = timevar * 1

                }catch(err){

                    return message.channel.send(new MessageChannel().setDescription("Unexpected reply."))

                }

                if(Exc > 8 || Exc < 1)return message.channel.send(new MessageEmbed().setDescription("Please select a number between 1-8 next time!"))

                const ChosenRank = RankNumbers[Exc - 1]

                try{

                await settings.updateOne({
                    Rank: ChosenRank
                });

                return message.channel.send(new MessageEmbed().setDescription(`You rank has succesfully been changed to **${ChosenRank}**`))

            }catch(err){

                return message.channel.send(new MessageEmbed().setDescription("An error occiered when attempting to connect to our Network. Maybe the server is over requested. Please try again."))

            }
        
    }
}