const fs = require('fs');
const discord = require('discord.js');
const Discord = require('discord.js');
const quickdb = require("quick.db")
const { DB_PASSWORD, DB_NAME } = require('./config.json')
const mongoose = require("mongoose")
const {MARQPASS, MARQNAME} = require('./config.json')
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
const AppDataFile = require("./commands/Models/AppData")
const GuildMemeberAddFile = require('./commands/Configuration/guildMemberAdd')
const OnMessageFile = require("./commands/Configuration/MessageEvent")
const mongodb = require("mongoose")
const StartUpFile = require("./commands/Configuration/Startup")
const { defaultprefix, Version } = require("./config.json")
const client = new discord.Client({ disableEveryone: false });
const { Player } = require('discord-player');
const { db } = require('./commands/Models/AppData');
var FetchingToken = false
const prompt = require('prompt-sync')();
var ConnectedToMongoose = false
var ConnectionBot = false
const LaunchFile = require("./Utils/launchFunction")

function LoadMongoose()
{ 
    if(ConnectedToMongoose === true)return
    ConnectedToMongoose = true
   // mongodb.connect(`mongodb+srv://MarqBot:${MARQPASS}@cluster0.njkac.mongodb.net/${MARQNAME}?retryWrites=true&w=majority`, dbOptions).then(console.log("Connexion Succes!"))
    mongodb.connect(`mongodb+srv://marquito523:${DB_PASSWORD}@cluster0.qmekk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, dbOptions).then(console.log('------------------------ \n \n Connection To MongoDB Succeeded. Awaiting Token...'))
GetToken ()
}
client.player = new Player(client);
client.config = require('./config.json');
client.emotes = client.config.emojis;
client.Version = Version
client.filters = client.config.filters;
client.commands = new discord.Collection();
//client.prefix = client.config.prefix
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name, command);
    };
});
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
client.on('ready', () => {  
    StartUpFile.execute(client)
});
client.on('guildCreate', guild => {
    guild.systemChannel.send((new Discord.MessageEmbed().setDescription(`**Hello!** \n \n To start using me please type in ${defaultprefix}help \n I'm happy to be with you and I hope I will be able to help you in whatever I can! You view my list of commands in help and following the instructions. To make my help + category work, you will have to do the following => \n **Example**: let's say I want to know about music => ${defaultprefix}help music or moderation ${defaultprefix}help moderation etc... \n \n This is specified in help.\n \n**Useful Links** \n \n **Invite Link:** To invite ExFrame [click here](https://discord.com/api/oauth2/authorize?client_id=733665360188014644&permissions=275901542&scope=bot)  \n \n **Vote ExFrame:** To vote ExFrame on Top.gg [click here](https://top.gg/bot/733665360188014644) \n \n**ExFrame Support Guild:** To join ExFrame's Support Guild [click here](https://discord.gg/6zqN4pWpnm) \n \n **ExFrame Support Website:** To visit ExFrame's Website [click here](https://marquito523.github.io/ExFrame-Website/) \n \n Since you have just added ExFrame to your guild, do you want to start the setup? If yes type "m!start-setup"`).setTitle("**ExFrame**").setTimestamp().setFooter("Introduction to ExFrame").setThumbnail(client.user.displayAvatarURL({ size: 1024 }))));
    try {
        const channel = client.channels.cache.find(channel => channel.id === '805516685066371093')
        if (!channel) return
        channel.send(new Discord.MessageEmbed().setTitle(`${guild.name} Invited`).setDescription("Thank you for inviting ExFrame!"))
    } catch (e) {

    }
});
client.on('guildMemberAdd', async member => {
    GuildMemeberAddFile.execute(client, member)
});

client.on('message', async message => {
    OnMessageFile.execute(client, message)
});
async function GetToken()
{

    if(FetchingToken === true)return

    FetchingToken = true

    const localsettings = await AppDataFile.findOne({

        UserID: quickdb.get("AppData")

    }, (err, exf) => {
        if (err) console.log("Error: Profile could not be loaded.")

        if(!exf) console.log("Fatal Error: Token Not Reached | Restarting Procedure")

        GetToken()
    });    
    let token = localsettings.UserLoginCred

    console.log("Token Stored.")

    Login(token)
}
function Login(token)
{

    if(ConnectionBot === true)return
    ConnectionBot = true
    console.log("Connecting To Bot")
    client.login(token)
}

LoadMongoose()



