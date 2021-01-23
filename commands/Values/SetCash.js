const Discord = require("discord.js")
const User = require("../Models/User")


module.exports = {
    name: "addcash",
    async execute(client, message, args) {

        if(message.author.id === "546284284713893889"){ 

        const user = message.mentions.users.first()

        if(!user) return message.channel.send("no user")

        let UserC

        const UserSettings = await User.findOne({

            UserId: user.id
    
        }, (err, user) => {
    
            UserC = user
    
            if (err) console.error(err)
    
        })
        let Currency

        let UserEntries

    
       if (!UserC){

    return message.channel.send(new Discord.MessageEmbed().setDescription(":x: User has no bank account."))


       }else{

        Currency = UserSettings.UserCurrency

        UserEntries = UserSettings.UserEntries

       }



        let number = args[1]

        if(!number) return message.channel.send("no number")
        

        const NewCash = Currency  + number * 1 


        try{

            await UserSettings.updateOne({
                UserCurrency: NewCash
            });

            return message.channel.send("succes")

        }catch(e){

            console.log(e)

            return message.channel.send(":x: error")

        }



    }
}

}