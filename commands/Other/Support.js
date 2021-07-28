const { MessageEmbed, MessageAttachment } = require("discord.js")
const SupportData = require("../Models/SupportData")
const CategoryID = '835790907000881173'

module.exports = {
    name: "support", 
    async execute(client, message, args) {

        const guild = client.guilds.cache.find(guild => guild.id === '774018500330782722')


        const SibChannel = guild.channels.cache.find(channel => channel.name === message.author.id)

        try {
            message.author.send(new MessageEmbed().setDescription("You will be entering in Support DMs in a few moments. We are checking if you already own a support ticket..."))
        } catch (err) {
            return message.channel.send(new MessageEmbed().setDescription("I was unable to send you `DMs` please make sure you keep them open, for support."))
        }


        let VV = false

        
        const settings = await SupportData.findOne({

            Owner: message.author.id

        }, (err, Data) => {
            if (err) console.error(err)

            if (!Data) {
                VV = true
                const newData = new SupportData({
                Owner: message.author.id,
                TicketID: message.author.id + 45084704037,
                ListeningSend: false,
            })

            newData.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
            }
        });

        if (!SibChannel) {



          guild.channels
                .create(message.author.id, {
                    type: 'text',
                }).then((channel) => {
                    try {
                        channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
                        channel.setParent(CategoryID)
                        channel.send(new MessageEmbed().setDescription(`Support Ticket Opened by ${message.author}.`))

                    } catch (e) {
                        return message.channel.send(`An unexpected error has appeared!`)
                    }
                });


                if(VV === true)return message.author.send(new MessageEmbed().setDescription(`Please retype the command. In the DMs or in  channel to start your support ticket.`))

                if(!settings)return

                if(!settings.ListeningSend)return

                if(settings.ListeningSend === true) return message.channel.send(new MessageEmbed().setDescription("You are already sending informtion to the ticket. Type `m!end` to stop sending messages to the ticket."));


                await settings.updateOne({
                    ListeningSend: true
                });

                return message.author.send(new MessageEmbed().setDescription("You are currently sending information to the ticket. Any message you send here will be sent to your ticket. To end this type `m!end`"))
        }else{
            try{
                await settings.updateOne({
                    ListeningSend: true
                });

            console.log(settings.ListeningSend)
            return message.author.send(new MessageEmbed().setDescription("Please type more information here. Anything you will send will be taken in ticket. Type `m!end` to stop sending messages to your ticket."))
            }catch(err){
                return message.channel.send(new MessageEmbed().setDescription(`An error occiered. Error: ${err}`))
            }
        }
    }
}