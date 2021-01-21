const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: 'mute',
    description: 'Mutes a user',
   async  execute(client, message, args) {

    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I require `EMBED_LINKS` permission to be able to function")


    return message.channel.send("This feature is being worked on!")

    
        console.log(args)
        let muteTime = args[2];



        if (!muteTime)return message.channel.send("You have to specify a time for the mute.")

        let toMute = message.guild.member(message.mentions.users.first())

        console.log(muteRole, muteTime)

        if (!toMute) return message.reply("Couldn't find the user.");

        if (!message.member.hasPermission("MAANAGE_CHANNELS")) return message.reply("Insufficient permission.");

        if (toMute.hasPermission("ADMINISTRATOR")) return message.reply("You can't mute this person.");

        let muteRole = message.guild.roles.cache.find("muted", "Muted", "mute");
        
        if (!muteRole) {

            try {
                muteRole = await message.guild.createRole

                muteRole.name = "muted"
                
                muteRole.color = "#000000"

            } catch (e) {

                console.log("Failed to create role.");

                console.log(e.stack)

            }

        }


        try {

            message.guild.channels.forEach(async (channel, id) => {

                await channel.overwritePermissions(muteRole, {

                    SEND_MESSAGES: false,

                    ADD_REACTIONS: false,

                    SPEAK: false

                });

            });

        } catch (e) {

            console.log("Failed to update muted channels.");

            console.log(e.stack);

        }




        setTimeout(function () {

            toMute.removeRole(muteRole.id);
            message.channel.send(`${toMute} has been unmuted`);

        }, ms(muteTime));


        await(toMute.addrole(muteRole.id));

        let logsChannel = message.guild.channels.find(`name`, "logs");

        if (!logsChannel) {

            console.log("Couldn't find logs channel");

            return;

        }

      //  Core.sendEmbed(logsChannel, "Muted User", "#995572", "Muted User", toMute, "Muted By", message.author, "Muted For", `${ms(ms(muteTime))}`);

        message.delete().catch(O_o => { });

    }


}