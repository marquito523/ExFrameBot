const Canvas = require("canvas")
const Discord = require("discord.js")
module.exports = {
    name: "zz",
    async execute(client, message, args) {


    let member = message.author

    const channel = message.channel

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext(`2d`) 


    


    const background = await Canvas.loadImage('https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    ctx.font = `40px Calvert MT Std`;
    ctx.fillStyle = `#ffffff`;
    ctx.fillText("Why", canvas.width / 2.2, canvas.height / 1.7);
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './Welcome.jpg');

    channel.send(`Bienvenue ${member} !`, attachment);

        

    }
}


