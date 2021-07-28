const { MessageEmbed } = require('discord.js');
const Profile = require("../Models/Profile");
const { MessageReaction } = require("discord.js");
const Words = require("../Executor/OnlineHandler.json")
const MessageSend = ["Seems like you do not own any profile. You should consider creating one.", "Seems like the user you have mentionned does not own a profile."]

module.exports = {
    name: "profile",
    async execute(client, message, args){

        var Variation = 0

        const User = message.mentions.users.first();

        if(!User){

            User = message.author;
            Variation = 1

        }

        const settings = Profile.findOne({

            UserID: User.id

        }, (err, resp) => { 

            if(err)return message.channel.send(new MesssageEmbed().setDescription(`An error occured! :x: \n \n Error: ${err}`));
            
            

            if(!resp)return message.channel.send(new MessageEmbed().setDescription(`${MessageSend[Variation]}`));

        })

    if(!settings.LETTER_VALUE){


            Profile.updateOne({LETTER_VALUE: 1});
            Profile.updateOne({WORD_POSITION: 0});

            return message.channel.send(new MessageEmbed().setDescription("We are currently processing your profile. Please wait a few seconds."));
        }
        const CurrWord = Words.Profile.Letters.find(settings.LETTER_VALUE);

        if(!CurrWord)return message.channel.send(new MessageEmbed().setDescription(`Seems like we are currently having issues in connecting to our servers.`));

        const WordPosition = settings.WORD_POSITION;

        const Display = CurrWord.slice(WordPosition + 1, 10000);


        console.log(Display)

    }
}


