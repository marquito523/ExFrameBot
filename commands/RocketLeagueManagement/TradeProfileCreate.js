const { MessageEmbed } = require("discord.js");
const Trade = require("../Models/Server")

module.exports = {
    name: "create-profile",
    async execute(client, message, args){

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
                })

                newServer.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(new MessageEmbed().setDescription('We have enabled a profile for you. You can now chose 3 items to trade. A notification will be sent to anyone looking for one of does.'));
            }else{
                 message.channel.send(new MessageEmbed().setDescription("You already own a Trade Profile."));
             }
        });

        let D = message.author.id

        D.toString()

       if(!settings)return

       if(!settings.FindTrace || settings.FindTrace === undefined || settings.FindTrace === "undefined"){
           await settings.updateOne({
               FindTrace: D
           })

           return undefined
       }
    }
}