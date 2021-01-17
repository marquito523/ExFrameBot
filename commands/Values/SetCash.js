const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "addcash",
    async execute(client, message, args) {

        console.log("Adding Cash")

        if(message.author.id === "546284284713893889"){ 
        
        console.log("Adding Cash")

        const user = message.mentions.users.first()

        if(!user) return message.channel.send("no user")

        const Currency = db.get(`User_${user.id}_Framits`) || 0

        let number = args[1]

        if(!number) return message.channel.send("no number")
        

        const NewCash = Currency  + number * 1 

        console.log(NewCash)

        try{
            db.set(`User_${user.id}_Framits`, NewCash)

            return message.channel.send("succes")

        }catch(e){

            console.log(e)

            return message.channel.send(":x: error")

        }



    }
}

}