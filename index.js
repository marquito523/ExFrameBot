const fs = require('fs');

const db = require('quick.db')

const discord = require('discord.js');

const Discord = require('discord.js');


const {
    defaultprefix
} = require("./config.json")

const {
    token
} = require("./config.json")

const client = new discord.Client({
    disableMentions: 'everyone'
});

const {
    Player
} = require('discord-player');
const { codePointAt } = require('ffmpeg-static');


client.player = new Player(client);
client.config = require('./config.json');
client.emotes = client.config.emojis;
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
    console.log(`${client.user.username}'s status up, and running!`);
    setInterval(() => {
        const statuses = [`${defaultprefix}help||${client.guilds.cache.size} guilds, not bad`, `${defaultprefix}help to start!`, `${defaultprefix}help|| ${client.users.cache.size} users O.o`, `${defaultprefix}help|| Hey guys, have a great day!`];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        client.user.setActivity(randomStatus, {
            type: 'WATCHING',
        });
    }, 60000);
});

client.on('guildCreate', guild => {

    guild.systemChannel.send((new Discord.MessageEmbed().setDescription(`**Hello!** \n \n To start using me please type in ${defaultprefix}help \n I'm happy to be with you and I hope I will be able to help you in whatever I can! You view my list of commands in help and following the instructions. To make my help + category work, you will have to do the following => \n **Example**: let's say I want to know about music => ${prefix}help music or moderation ${prefix}help moderation etc... \n \n This is specified in help.\n **Hope you won't regret inviting me D:**`).setTitle("**ExFrame**").setTimestamp().setFooter("ExFrame says hello")));
    try {
        const channel = client.channels.cache.find(channel => channel.id === '790516050147803156')
        channel.send(new Discord.MessageEmbed().setTitle(`${guild.name} Inveted ExFrame!`).setDescription("Thank you for inviting ExFrame!"))
    } catch (e) {

    }
});


client.on('guildMemberAdd', member => {

    const JoinNotif = db.get(`guild_${member.guild.id}_JoinNotif`) || false;

    const defaultRole = db.get(`guild_${member.guild.id}_defaultRole`) || false

    const Channel = db.get(`guild_${member.guild.id}_ChannelNotif`);

    const SendText = db.get(`guild_${member.guild.id}_JoinDM`) || `Welcome ${member} we hope you enjoy your stay here! Please follow the rules of the server!`

    console.log(Channel)
    if (!JoinNotif === false) {
       // member.guild.systemChannel.send((new Discord.MessageEmbed().setDescription(`**${member}** just joined ${member.guild.name}, ***welcome!***`)))
       if(Channel){
        const sendchannel = client.channels.cache.get(Channel)

        if(sendchannel){

            
        let user = member.user

        let avatar = user.displayAvatarURL({size: 1024})

        let memberName = member.user.username

        try{

        sendchannel.send(new Discord.MessageEmbed().setAuthor(`${memberName} has just joined the server!`, avatar).setTitle("**New user joined!**").setDescription(`Welcome ${member} to ${member.guild.name}!`).setThumbnail(member.guild.iconURL()).setTimestamp())

        }catch(e){

        }

        }

       }else{
           console.log("No channels found")
       }
    }


    const joinembed = new Discord.MessageEmbed()

        .setTitle(`**Welcome to ${member.guild}**`)

        .setDescription(`${SendText}`)

    try {
        member.send(joinembed)
    } catch (e) {

    }

    if (!defaultRole === false) {
    
        const Role = member.guild.roles.cache.get(defaultRole)

        if (Role){          

             if(!member.roles.cache.has(Role.id)) {

          try{
            member.roles.add(Role.id).catch((e) => console.log(e))
            
          }catch(e){

          }

            }
        }
    }
});



client.on('message', async message => {

    if (message.author.id === client.user.id) return;

    if (message.author.bot) return;

    if (message.channel.type === 'dm') return message.reply(new Discord.MessageEmbed().setDescription("I'm sorry, but I do not handle DMs. Please message me through a guild! ;D"))

    const prefix = db.get(`guild_${message.guild.id}_prefix`) || 'm!';

    const ReportPrefix = `${prefix}report`

    if (!message.guild) return

    if (message.content === `${prefix}`) return

    const args = message.content.substring(prefix.length).split(" ")

    const Filter = db.get(`guild_${message.guild.id}_Filter`) || false;

    const JoinNotif = db.get(`guild_${message.guild.id}_JoinNotif`) || false;

    const SuggestionChannelGuild = db.get(`guild_${message.guild.id}_SuggestionChannel`) || "None"




    if (message.content === `<@!${client.user.id}>`) { 

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

    if (message.content.includes("fuck") || message.content.includes("shit") || message.content.includes("fock") || message.content.includes("nerd") || message.content.includes("nigger") || message.content.includes("niggor") || message.content.includes("nigar") || message.content.includes("nig") || message.content.includes("mdafucker") || message.content.includes("fuckyou") || message.content.includes("nigeria") || message.content.includes("bitch") || message.content.includes("bich") || message.content.includes("b***") || message.content.includes("f***") || message.content.includes("putain") || message.content.includes("ta mere") || message.content.includes("Ta mere") || message.content.includes("ta mère") || message.content.includes("Ta mère") || message.content.includes("nique") || message.content.includes("wtf")) {

        if (Filter === true) {

            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have permissions to delete messages.")

            try {

                message.delete()

                message.channel.send(new Discord.MessageEmbed().setDescription(`Wow there! Chill out ${message.author}! This is a friendly community! You can not swear in here. Be careful next time. If this happens to frequently, some mesures will be taken against you!`).setTitle("Hey there!"))

            } catch (e) {

                message.channel.send(new Discord.MessageEmbed().setDescription(`Wow there! Chill out ${message.author}! This is a friendly community! You can not swear in here. Be careful next time. If this happens to frequently, some mesures will be taken against you! \n **Warning** : *I was unable to delete the message sent by ${message.author}. I must be lacking permissions. Or, an error happened when trying to delete it.*`).setTitle("Hey there!"))

            }
        }

    }

    if (message.content === `${prefix}bot info`) {
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")
        var embed = new Discord.MessageEmbed()
            .setTitle('** ExFrame Help Information**')
            .setURL("https://marcoaskovic.wixsite.com/exframe")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/719203211134894151/791214643813023784/ws_Red_Hexagons_1280x1024.jpg')
            .addFields({
                name: '**Bot Name**',
                value: "ExFrame",
                inline: true
            }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: '**Bot Users**',
                value: `${client.users.cache.size}`,
                inline: true
            },

                {
                    name: ' **Guilds**',
                    value: `${client.guilds.cache.size}`,
                    inline: true
                }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: '**Partners**',
                value: `Exyno by <@334297339831255040>`,
                inline: true
            },

                {
                    name: '**Library**',
                    value: `Discord.js`,
                    inline: true
                }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: `Bot Music Package`,
                value: "Discord-Player",
                inline: true
            },

                {
                    name: '**Bot Status**',
                    value: `No bugs found`,
                    inline: true
                }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: '**Version**',
                value: "1, 0, 0",
                inline: true
            },

                {
                    name: '**Bot Owner**',
                    value: `<@546284284713893889>`,
                    inline: true
                }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: '**Channels**',
                value: `${client.channels.cache.size}`,
                inline: true
            },
            )
            .setFooter("For anymore help, click the title.")
        try {
            return message.channel.send(embed)
        } catch (e) {
            return message.channel.send(new Discord.MessageEmbed().setDescription("Unexpected error occiered. Please try again"))
        }

    } else if (message.content.startsWith(`${prefix}suggest`)) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!args[1]) return message.channel.send((new Discord.MessageEmbed().setDescription(`The suggestion needs to contain a **suggestion** ;D`).setTitle("**An empty suggestion lol**")))

        if(SuggestionChannelGuild === "None"){

                if (!message.guild.channels.cache.find(channel => channel.name === 'suggestions')) return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: **No suggestion channel preset**, and no channels name "suggestions" within this guild! To preset suggestion, run ${prefix}setup-suggestion`)))
        
        
                const suggestionchannel = message.guild.channels.cache.find(channel => channel.name === 'suggestions')
        
        
                var suggestionguild = message.content.substring(`${prefix}suggest`.length)
        
        
                message.channel.send((new Discord.MessageEmbed().setTitle("**Your suggestion has been sent, thank you for suggesting!**")))

            }else{

                const SendChannel = message.guild.channels.cache.get(SuggestionChannelGuild.id)

                if(!SendChannel)return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Channel no longer exists Error 404!"))

            const suggestionchannel = SendChannel


            var suggestionguild = message.content.substring(`${prefix}suggest`.length)
    
    
            message.channel.send((new Discord.MessageEmbed().setTitle("**Your suggestion has been sent, thank you for suggesting!**")))
    
    
    
            try {
                return suggestionchannel.send((new Discord.MessageEmbed().setDescription(`The sugestion has been sent by: ${message.author}\n **Suggestion**: \n\n ${suggestionguild}`).setTitle("**New Suggestion**")))
            } catch (e) {
                return message.channel.send((new Discord.MessageEmbed().setDescription(`An error happened`)))
            }

        
        }
            
    

    } else if (message.content.startsWith(ReportPrefix)) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!args[1]) return message.channel.send((new Discord.MessageEmbed().setDescription(` :x: The report needs to contain a **reason/bug** ;D`).setTitle("**An empty Report lol**")))


        const channel = client.channels.cache.find(channel => channel.id === '777795461720309761')


        var Report = message.content.substring(ReportPrefix.length)


        var member = message.author


        message.channel.send((new Discord.MessageEmbed().setTitle("**Your Report has been sent, thank you for reporting!**")))
        member.send((new Discord.MessageEmbed().setDescription("Your report has **succesfully** been sent to **ExFrame's support server**. If developpers need more information, you will receive a DM. Thanks for Reporting! \n \n **Report Contains**: `" + Report + "`\n Report sent by " + member.username).setFooter("Report sent at").setTimestamp()))
        try {


            return channel.send((new Discord.MessageEmbed().setDescription(`The sugestion has been sent by: ${message.author}\n \n**The report was sent from**: ${message.channel.guild.name}\n  \n**report**: \n\n ${Report}`).setTitle("**New Report**")))


        } catch (e) {


            return message.channel.send((new Discord.MessageEmbed().setDescription(`An error happened`)))
        }


    } else if (message.content === `${prefix}enable-filter`) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))


        if (Filter === true) return message.channel.send(new Discord.MessageEmbed().setDescription("Filter is already active in this guild!"))

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))

        try {
            db.set(`guild_${message.guild.id}_Filter`, true);

            return message.channel.send(new Discord.MessageEmbed().setDescription("**Succesfully** activated filter messages in `" + message.guild.name + "`!"))

        } catch (e) {

            return message.channel.send(new Discord.MessageEmbed().setDescription("An error happened with our Data Bases!"))

        }
    } else if (message.content === `${prefix}disable-filter`) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")



        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))


        if (Filter === false) return message.channel.send(new Discord.MessageEmbed().setDescription("Filter is already disabled in this guild!"))

        try {
            db.set(`guild_${message.guild.id}_Filter`, false);


            return message.channel.send(new Discord.MessageEmbed().setDescription("**Succesfully** disabled filter messages in `" + message.guild.name + "`!"))

        } catch (e) {

            return message.channel.send(new Discord.MessageEmbed().setDescription("An error happened with our Data Bases!"))

        }

    } else if (message.content.startsWith(`${prefix}enable-join-notif`)){

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))

        const channel = message.mentions.channels.first();

        //if (!message.guild.channels.cache.find(channel => channel.name === ChannelName))

        if(!channel) return message.channel.send(new Discord.MessageEmbed().setDescription("No valid channels were given to me."))

        if (JoinNotif === true) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Notifications on member join are already activated!"))

        const permissions = channel.permissionsFor(message.client.user)

        if(!permissions.has("SEND_MESSAGES"))return message.channel.send(new Discord.MessageEmbed().setDescription("I do not have permission to send messages there!"))
       
       
        try {

            db.set(`guild_${message.guild.id}_JoinNotif`, true);

            db.set(`guild_${message.guild.id}_ChannelNotif`, channel.id);

            const Channel = db.get(`guild_${message.guild.id}_ChannelNotif`) || 'nil';

           


            return message.channel.send(new Discord.MessageEmbed().setDescription(":white_check_mark:  **Succesfully** enabled Join Notif messages in `" + message.guild.name + "`!"))

        } catch (e) {

            return message.channel.send(new Discord.MessageEmbed().setDescription(":x: An error happened with our Data Bases!"))

        }

    } else if (message.content === `${prefix}disable-join-notif`) {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))


        if (JoinNotif === false) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Notifications on member join are already off!"))
        try {

            db.set(`guild_${message.guild.id}_JoinNotif`, false);
            return message.channel.send(new Discord.MessageEmbed().setDescription(":white_check_mark:  **Succesfully** disabled Join Notif messages in `" + message.guild.name + "`!"))

        } catch (e) {

            return message.channel.send(new Discord.MessageEmbed().setDescription("An error happened with our Data Bases!"))

        }

    }else if(message.content.startsWith(`${prefix}join-message`)){

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))

        if(!args[1]) return message.channel.send(" :x: You need to specify a message to send!")

        const commandName = `${prefix}join-message`

        const Text = message.content.substring(commandName.length)

        if(!Text) return message.channel.send(" :x: You need to specify a message to send!")
        
        try{

            db.set(`guild_${message.guild.id}_JoinDM`, Text)

            message.channel.send(new Discord.MessageEmbed().setDescription(":white_check_mark: **Succesfully** set Edited join message to: \n \n`" + Text + "` \n \n Edtitor: `" + message.author.username + "`").setThumbnail(message.guild.iconURL()).setTimestamp().setFooter("Message on join"))

        }catch(e){


        }
    }
    //end of sugggestions
});

client.login(token);