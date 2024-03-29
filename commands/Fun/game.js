const Canvas = require("canvas")
const Discord = require("discord.js")
const User = require("../Models/User")


const fastWords = ["Type Fast", "Hello, Jack!", "Random sentance.", "Typing is fun!", "You can't copy paste this!", "And your homework?", "What is this?", "Write this fast!", "Airplanes, trees!", "Capitals are annoying.", "You gotta be fast", "Motocycle, bike, tree!"]

module.exports = {
    name: "game",
    async execute(client, message,args){

        const member = message.author

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}


        const prefix = client.prefix

        let UserC

        const UserSettings = await User.findOne({

            UserId: message.author.id
    
        }, (err, user) => {
    
            UserC = user
    
            if (err) console.error(err)
    
        })
        let Currency

        let UserEntries

    
       if (!UserC){

    return message.channel.send(new Discord.MessageEmbed().setDescription(":x: You do not own any bank accounts! But that's fine, go creat one now by typing in \n `" + prefix + "bank-account`").setFooter("ExFrame Bank Services").setAuthor("ExFrame International Bank").setTitle("**ExFrame Offical Bank Message**"))


       }else{

        Currency = UserSettings.UserCurrency

        UserEntries = UserSettings.UserEntries

       }



        const UserCurrencyWon = Currency + 5



            if(UserEntries < 1) return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: You do not have **enough** entries to play this game! You need at least **1**. To get Entries, you can buy them with **Currency**. To get Currency you can either **purchase**, or **work** for some."))

            try{

                await UserSettings.updateOne({
                    UserEntries: UserEntries - 1
                });

            }catch(e){

                return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Unexpected error occiered with our Data Stores. Your balance wasn't affected."))

            }

        await message.channel.send(new Discord.MessageEmbed().setDescription("A word will appear in 5 seconds").setTitle("Get ready!"))

        
        timevar = 20000;

        let randomWord = fastWords[Math.floor(Math.random() * fastWords.length)];

    const channel = message.channel

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext(`2d`) 


    


    const background = await Canvas.loadImage('https://img.freepik.com/free-vector/dark-low-poly-background_1048-7971.jpg?size=626&ext=jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillText('center-aligned', "heelo", 85);
    ctx.font = '28px sans-serif';
    ctx.font = applyText(canvas);
    ctx.fillStyle = `#ffffff`;
    ctx.fillText(randomWord, canvas.width / 2.5, canvas.height / 3.5);
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './Welcome.jpg');

    //channel.send(`Bienvenue ${member} !`, attachment);

        await delay(5000);
        const b = await message.channel.send(`Your word ${member} !`, attachment);
        let i = 0;
        var date = new Date();

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1) return message.reply(new Discord.MessageEmbed().setDescription("Your time ran out!").setTitle("Oh No!"))
            var date2 = new Date();
            if(timevar === randomWord){
            message.reply(new Discord.MessageEmbed().setDescription(`Well done! You succeeded. You have earned 5 Framits!`)) 

            try{

                await UserSettings.updateOne({
                    UserCurrency: UserCurrencyWon
                });
                

            }catch(e){

            }

             }else return message.reply("That's wrong!")

        }
    }

function delay(delayInms){
    return new Promise(resolve =>
    setTimeout(() => {
resolve(2);
    },delayInms)

    );

}


const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 40;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};