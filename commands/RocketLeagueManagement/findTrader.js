const mongooose = require("mongoose")
const { MessageEmbed } = require("discord.js")
const Trade = require('../Models/Server')

module.exports = {
    name: "find-trade",
    async execute(client, message, args){

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        let ResultSearch1

        let IDUser1

        let ResultSearch2

        let IDUser2

        let ResultSearch3

        let IDUser3

        let Anaylyser = false
        
        const settings = await Trade.findOne({

            UserId: message.author.id

        }, (err, Server) => {
            if (err) console.error(err)

            let DisplayID = message.author.id

            DisplayID.toString()

            if (!Server) {
                Anaylyser = true
                return message.channel.send(new MessageEmbed().setDescription('You do not own a profile. Please create one.'))
             }
        });

        if(Anaylyser === true)return undefined

        if(!settings)return message.channel.send(new MessageEmbed().setDescription('You do not own a profile. Please create one.'));

        console.log(settings.Plateform)

        if(!settings.Plateform || settings.Plateform < 1 || settings.Plateform > 4)return message.channel.send(new MessageEmbed().setDescription('No plateforms are registered on your profile. Please run `' + client.prefix + 'create-profile`'))

        const Plateform = settings.Plateform

        let i = 0

    let timevar = 100000


        const L = await message.channel.send(new MessageEmbed().setDescription("What Items are you looking for? \n \n **To have the most chances of finding a trader, please spell it correctly!**"))


        await L.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})


            if(i === 1)return message.channel.send(new MessageEmbed().setDescription('An error occiered! Error Type: `REPLY_TIMEOUT`'));

            if(timevar.length > 30)return message.channel.send(new MessageEmbed().setDescription(`Your search was longer than 30 Characters!`));

            timevar = timevar.toLowerCase()


//SEARCH1

            const settings1 = await Trade.findOne({

                Offering1: timevar,

                Plateform: Plateform
    
            }, (err, Server) => {
                if (err) return message.channel.send(new MessageEmbed().setDescription(`An error occiered when executing the search! Error: ${err}`))
    
                if (!Server) {
                
                     ResultSearch1 = "Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404"
                
                }else{

                    
                }
            })

            if(ResultSearch1 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404'){

                IDUser1 = "NO USER FOUND"

            }else{


            IDUser1 = "<@" + settings1.FindTrace + ">"

            ResultSearch1 = settings1.Offering1


            }


//SEARCH2


            const settings2 = await Trade.findOne({

                Offering2: timevar,

                Plateform: Plateform
    
            }, (err, Server) => {
                if (err) return message.channel.send(new MessageEmbed().setDescription(`An error occiered when executing the search! Error: ${err}`))
    
                if (!Server) {
                
                     ResultSearch2 = "Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404"
                
                }else{

                    
                }
            })

            if(ResultSearch2 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404'){

                IDUser2 = "NO USER FOUND"

            }else{


            IDUser2 = "<@" + settings2.FindTrace + ">"

            ResultSearch2 = settings2.Offering2


            }

            //SEARCH3


            const settings3 = await Trade.findOne({

                Offering3: timevar,

                Plateform: Plateform
    
            }, (err, Server) => {
                if (err) return message.channel.send(new MessageEmbed().setDescription(`An error occiered when executing the search! Error: ${err}`))
    
                if (!Server) {
                
                     ResultSearch3 = "Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404"
                
                }else{

                    
                }
            })

            if(ResultSearch3 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404'){

                IDUser3 = "NO USER FOUND"
            }else{

            if(!settings3){

            }else{

            IDUser3 = "<@" + settings3.FindTrace + ">"

            ResultSearch3 = settings3.Offering3

                }
            }

            if(ResultSearch1 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404' && ResultSearch2 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404' &&  ResultSearch3 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404')return message.channel.send(new MessageEmbed().setDescription(` :x: No items corresponding to your search were found! \n \n We are truly sorry for that.`));

            if(ResultSearch1 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404')ResultSearch1 = "No Items Found On Search 1"

            if(ResultSearch2 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404')ResultSearch2 = "No Items Found On Search 2"

            if(ResultSearch3 === 'Nothing-Found-Nothing-Found-Nothing-Found-Nothing-Found#404')ResultSearch3 = "No Items Found On Search 3"

            return message.channel.send(new MessageEmbed().setDescription(`Here are the results we have found for you. \n \n **Note**: If none are corresponding to your search it may be because this system is quite new, and not many people set trades on it. It will come. \n \n **Searchs** \n \n **Search 1**: ${ResultSearch1} - User: ${IDUser1}\n \n **Search 2**: ${ResultSearch2} - User: ${IDUser2}\n \n **Search 3**: ${ResultSearch3} - User: ${IDUser3} \n \n Contact these Users by DMs or use our contact system to start actually trading! \n \n Hope you have found what you needed.`).setTitle(`Search Results For **${timevar}**`))
    }
}