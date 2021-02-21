const fs = require('fs');
const discord = require('discord.js');
const Discord = require('discord.js');
const { DB_PASSWORD, DB_NAME } = require("./config.json")
const DeleteFile = require("./commands/Executor/DeleteMessager")

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}
const mongodb = require("mongoose")
const Guild = require("./commands/Models/Guild")
const {
    defaultprefix,
    Enable_Console_Write_Commmand,
    Version
} = require("./config.json")
const {
    token
} = require("./config.json")
const client = new discord.Client(
    { disableEveryone: false });
const {
    Player
} = require('discord-player');
const { codePointAt } = require('ffmpeg-static');
client.player = new Player(client);
client.config = require('./config.json');
client.emotes = client.config.emojis;
client.Version = Version
//client.filters = client.config.filters;
client.commands = new discord.Collection();
//client.prefix = client.config.prefix
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name, command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.on('ready', () => {
    mongodb.connect(`mongodb+srv://marquito523:${DB_PASSWORD}@cluster0.qmekk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, dbOptions).then(console.log('The Database is now connected.'))
    console.log(`${client.user.username} Is Currently Running`);
    setInterval(() => {
        const statuses = [`${defaultprefix}help||${client.guilds.cache.size} guilds, not bad`, `${defaultprefix}help to start!`, `${defaultprefix}help|| ${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)} users O.o`, `${defaultprefix}help|| Hey guys, have a great day!`];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        client.user.setActivity(randomStatus, {
            type: 'WATCHING',
        });
    }, 60000);
});

client.on('guildCreate', guild => {

    guild.systemChannel.send((new Discord.MessageEmbed().setDescription(`**Hello!** \n \n To start using me please type in ${defaultprefix}help \n I'm happy to be with you and I hope I will be able to help you in whatever I can! You view my list of commands in help and following the instructions. To make my help + category work, you will have to do the following => \n **Example**: let's say I want to know about music => ${defaultprefix}help music or moderation ${defaultprefix}help moderation etc... \n \n This is specified in help.\n \n**Useful Links** \n \n **Invite Link:** To invite ExFrame [click here](https://discord.com/api/oauth2/authorize?client_id=733665360188014644&permissions=275901542&scope=bot)  \n \n **Vote ExFrame:** To vote ExFrame on Top.gg [click here](https://top.gg/bot/733665360188014644) \n \n**ExFrame Support Guild:** To join ExFrame's Support Guild [click here](https://discord.gg/6zqN4pWpnm) \n \n **ExFrame Support Website:** To visit ExFrame's Website [click here](https://marquito523.github.io/ExFrame-Website/)`).setTitle("**ExFrame**").setTimestamp().setFooter("Introduction to ExFrame").setThumbnail(client.user.displayAvatarURL({ size: 1024 }))));
    try {
        const channel = client.channels.cache.find(channel => channel.id === '805516685066371093')
        if (!channel) return
        channel.send(new Discord.MessageEmbed().setTitle(`${guild.name} Invited`).setDescription("Thank you for inviting ExFrame!"))
    } catch (e) {

    }
});


client.on('guildMemberAdd', async member => {

    let Pguild
    let JoinNotif
    let defaultRole
    let Channel
    let SendText
    const settings = await Guild.findOne({
        guildID: member.guild.id
    }, (err, guild) => {
        Pguild = guild
        if (err) console.error(err)
    })
    if (!Pguild) {
        SendText = `Welcome! we hope you enjoy your stay here! Please follow the rules of the server!`
        JoinNotif = false
        defaultRole = "false"
    } else {
        if (!settings.SendText) {
            SendText = `Welcome! we hope you enjoy your stay here! Please follow the rules of the server!`
        } else {
            SendText = settings.SendText
        }
        if (!settings.JoinNotif) {
            JoinNotif = false
        } else {
            JoinNotif = settings.JoinNotif
        }
        if (!settings.defaultRole) {
            defaultRole = "false"
        } else {
            defaultRole = settings.defaultRole
        }
        if (!settings.JoinNotifChannel) {
        } else {
            if (settings.JoinNotifChannel === "") {
            } else {
                Channel = settings.JoinNotifChannel
            }
        }
    }
    if (!JoinNotif === false) {
        // member.guild.systemChannel.send((new Discord.MessageEmbed().setDescription(`**${member}** just joined ${member.guild.name}, ***welcome!***`)))
        if (Channel) {
            const sendchannel = client.channels.cache.get(Channel)
            if (sendchannel) {
                let user = member.user
                let avatar = user.displayAvatarURL({ size: 1024 })
                let memberName = member.user.username
                try {
                    sendchannel.send(new Discord.MessageEmbed().setAuthor(`${memberName} has just joined the server!`, avatar).setTitle("**New user joined!**").setDescription(`Welcome ${member} to ${member.guild.name}!`).setThumbnail(member.guild.iconURL()).setTimestamp())
                } catch (e) {
                }
                const joinembed = new Discord.MessageEmbed()
                    .setTitle(`**Welcome to ${member.guild}**`)
                    .setDescription(`${SendText}`)
                try {
                    member.send(joinembed)
                } catch (e) {
                }
            }

        } else {

        }
    }
    if (defaultRole === "false") {
    } else {
        const Role = member.guild.roles.cache.get(defaultRole)
        if (Role) {
            if (!member.roles.cache.has(Role.id)) {
                await member.roles.add(Role.id).catch((e) => member.guild.systemChannel.send("An error happened! I do not have permission to add " + Role.name + " to any members!"));
            }
        }
    }

});



client.on('message', async message => {
    if (message.author.id === client.user.id) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return message.reply(new Discord.MessageEmbed().setTitle("Unhandled Commands").setDescription("ExFrame does **not run any commands in DMs**. ExFrame might send you a DM to alert you of something, but **no responses are expected.**").setFooter("ExFrame Support Log Errors"))

    //DATA_START

    let prefix
    let Pguild
    let SuggestionChannelGuild
    let JoinNotif
    let Filter

    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        Pguild = guild
        if (err) console.error(err)
    })

    if (!Pguild) {

        prefix = defaultprefix
        SuggestionChannelGuild = "None"
        JoinNotif = false
        Filter = false

    } else {
        if (!settings.prefix) {
            prefix = defaultprefix
        } else {
            prefix = settings.prefix
        }
        if (!settings.Filter) {
            Filter = false
        } else {
            Filter = settings.Filter
        }
        if (!settings.SuggestionChannel) {
            SuggestionChannelGuild = "None"
        } else {
            SuggestionChannelGuild = settings.SuggestionChannel
        }
        if (!settings.JoinNotif) {

            JoinNotif = false
        } else {

            JoinNotif = settings.JoinNotif
        }
    }
    //DATA_END
    if (!message.guild) return
    if (message.content === `${prefix}`) return
    const args = message.content.substring(prefix.length).split(" ")

    if (message.content === `<@!${client.user.id}>`) {

        if (Enable_Console_Write_Commmand === true) console.log(`${message.author.username} has pinged ExFrame. => Id: ${message.author.id}`)

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) try { return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) } catch (error) { return message.author.send(":x: An unexpected error occiered. We are investigating...") }

        if (!message.guild.me.hasPermission("EMBED_LINKS")) {

            try {
                return message.channel.send("Hello, I'm ExFrame \n My prefix in this guild is: `" + prefix + "` \n To start using my functionalities:`" + prefix + "`help \n \n**Warning**: *I do not have `EMBED_LINKS` permission. Without me having it, you can not use any commands!*")

            } catch (e) {
                return message.channel.send("Unexpected error happened!")
            }
        } else {

            try {
                let ExFrame = client.user
                let avatar = ExFrame.displayAvatarURL({
                    size: 1024
                })
                return message.channel.send(new Discord.MessageEmbed().setDescription("Hello, I'm ExFrame \n My prefix in this guild is: `" + prefix + "` \n To start using my functionalities: `" + prefix + "help`.").setTitle("ExFrame").setTimestamp().setThumbnail(avatar))
            } catch (e) {
                return message.channel.send(":x: Unexpected error happened when running the command!")

            }
        }
    }

    let FilterTextMessage = message.content.toLowerCase()
    if (FilterTextMessage.includes("fuck") || FilterTextMessage.includes("shit") || FilterTextMessage.includes("fock") || FilterTextMessage.includes("nerd") || FilterTextMessage.includes("nigger") || FilterTextMessage.includes("niggor") || FilterTextMessage.includes("nigar") || FilterTextMessage.includes("nig") || FilterTextMessage.includes("mdafucker") || FilterTextMessage.includes("fuckyou") || FilterTextMessage.includes("nigeria") || FilterTextMessage.includes("bitch") || FilterTextMessage.includes("bich") || FilterTextMessage.includes("b***") || FilterTextMessage.includes("f***") || FilterTextMessage.includes("putain") || FilterTextMessage.includes("ta mere") || FilterTextMessage.includes("Ta mere") || FilterTextMessage.includes("ta mère") || FilterTextMessage.includes("Ta mère") || FilterTextMessage.includes("nique") || FilterTextMessage.includes("wtf")) {

        if (Filter === true) {

            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have permissions to delete messages.")

            DeleteFile.execute(message)

        }

    }

});

client.login(token);

