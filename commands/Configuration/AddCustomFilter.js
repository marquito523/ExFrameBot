const Discord = require("discord.js")

const { defaultprefix } = require("../../config.json")

const mongoose = require("mongoose")

const Guild = require("../Models/Guild")

const Maxlength = 100

const MaxChar = 20

const { DefaultJoinMessage } = require("../../config.json")

const NotHandled = require("../../Utils/NOTHANDLED.json")

module.exports = {
    name: "addfilter",
    async execute(client, message, args) {

        const prefix = client.prefix

        if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES'))try{ return message.author.send(new Discord.MessageEmbed().setTitle("Discord Permissions").setURL("https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-").setDescription(`ExFrame could not send messages into ${message.channel} because he doesn't have \`SEND_MESSAGES\` permissions.`)) }catch(error){return message.author.send(":x: An unexpected error occiered. We are investigating...")}

        if (message.channel.type === 'dm') return message.reply(new Discord.MessageEmbed().setDescription("This command can not be executed in DMs.").setTitle("Oops!"));

        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission to do that! You need `MANAGE_GUILD` permission!"))

        if(!args[0])return message.channel.send(new Discord.MessageEmbed().setDescription("No Words Detected!"))
        let Word = message.content.substring(`${prefix}addfilter`.length).trim();


        if (!Word) return message.channel.send(new Discord.MessageEmbed().setDescription("No valid words were added"))

        Word = Word.toLowerCase();

        for(var i = 0; i < NotHandled.Input.UnhandledInput.length; i++){
            if (Word.includes(NotHandled.Input.UnhandledInput[i])){
                return message.channel.send(new Discord.MessageEmbed().setDescription(`Unhandled text input. We do not accept \`${NotHandled.Input.UnhandledInput[i]}\` for security reasons.`))
            }
        }

        if(Word.length > 20)return message.channel.send(new Discord.MessageEmbed().setDescription(`Error: Word is more than 20 characters. Please try removing characters.`))

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



       
        if(!settings)return 

        if(settings.CustomFilterWords.length > (100 - 1)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Error`))

        for(var i = 0; i < settings.CustomFilterWords.length + 1; i++){
            if(settings.CustomFilterWords[i] === Word)return message.channel.send(new Discord.MessageEmbed().setDescription("This word was already set."))
        }

        let NewCustomFilterWords = settings.CustomFilterWords

        NewCustomFilterWords[settings.CustomFilterWords.length] = Word
        
        try{
       await settings.updateOne({
            CustomFilterWords: NewCustomFilterWords
        })
        return message.channel.send(new Discord.MessageEmbed().setDescription(`${Word} was succesfully added to the "ToBan" list.`))
    }catch(err){

        if(err){
        message.channel.send(new Discord.MessageEmbed().setDescription(`:x: ExFrame's Database is currently unreachable. Error: ${err}`));

        return console.log(err)
        }
    }
    }

}