const { exec } = require("child_process");
const { MessageEmbed } = require("discord.js");
const { execute } = require("./RemoveCustomFilter")
const Guild = require("../Models/Guild");

module.exports = {
    name: "filters",
    async execute(client, message, args){


        const settings = await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {
            if (err) console.error(err)

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: defaultprefix,
                    JoinNotif: false,
                    SuggestionChannel: "None",
                    Filter: false,
                    SendText: `Welcome! we hope you enjoy your stay here! Please follow the rules of the server!`,
                    JoinNotifChannel: "",
                    defaultRole: "false",
                    IgnoredChannels: [],
                    CustomFilterWords: []
                })


                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.');
            }
        });

        if(settings.Filter){
            if(settings.Filter === false){
                return message.channel.send(new MessageEmbed().setDescription(`Filter Message is not activated in this guild.`));
            }
        }else{
            return message.channel.send(new MessageEmbed().setDescription(`Filter Message is not activated in this guild.`));
        }

        if(!settings.CustomFilterWords || settings.CustomFilterWords.length === 0 || settings.CustomFilterWords === []){
            return message.channel.send(new MessageEmbed().setDescription(`No filter words are set in this server.`))
        }


        const Display = new MessageEmbed()

        var StringHolder = ""

        for(var i = 0; i < settings.CustomFilterWords.length; i++){
            StringHolder = StringHolder + settings.CustomFilterWords[i] + "\n"
        }

        const Length = settings.CustomFilterWords.length

        Display.setDescription("**" + StringHolder + "**").setFooter(`Custom Filter List (${Length})`).setTitle("Server's Filter List");
        

        if (!message.member.hasPermission('MANAGE_GUILD'))try{ return message.author.send(Display); }catch(err){ return message.channel.send(new MessageEmbed().setDescription(":x: Looks like your DMs are closed.")); }

        let timevar = 10000

        i = 0

        const b = await message.channel.send(new MessageEmbed().setDescription("Where would you like to receive the list ? \n \n Send **1** To receive it in DMs | Send **2** To Receive it in this channel"));

        await b.channel.awaitMessages(m => m.author.id === message.author.id,
            {max: 1, time: timevar, errors: ["time"],}
            ).then(async collected =>{

                timevar = collected.first().content;
            
            }).catch(() => {return i++})

            if(i === 1)return message.channel.send(new MessageEmbed().setDescription(":x: Timeout Error"));

            if(!timevar || !timevar === "2" || !timevar === "3")return message.channel.send(new MessageEmbed().setDescription(":x: Unhandled response."));

            if(timevar === "1"){
                return message.author.send(Display);
            }else if(timevar === "2"){
                return message.channel.send(Display);
            }else{
                return message.channel.send(new MessageEmbed().setDescription(":x: Unhandled response."));
            }
    }
}