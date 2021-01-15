const { execute } = require("../moderation/addrole");

const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "data",
    async execute(client, message,args){

        let guild = message.guild.name

        let prefix = db.get(`guild_${message.guild.id}_prefix`) || "m!"

        let JoinNotif = db.get(`guild_${message.guild.id}_JoinNotif`) || false;

        let defaultRole = db.get(`guild_${message.guild.id}_defaultRole`) || "None"
    
        let Channel = db.get(`guild_${message.guild.id}_ChannelNotif`);

        let Filter = db.get(`guild_${message.guild.id}_Filter`) || false;

        if(!message.member.hasPermission(`MANAGE_GUILD`)){

            var embed = new Discord.MessageEmbed()
            .setTitle("Data Information")
            .setURL("https://marcoaskovic.wixsite.com/exframe")
            .setAuthor("**Reminder** You have a restricted acces to this guild's data!")
            .addFields(


                { name: '**Prefix**', value: "Prefix set to " + prefix + " in this guild", inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '**Message On Join**', value: `Set active ${JoinNotif}`, inline: true },

                { name: 'Default Role**', value: `Default Role is set to ${defaultRole}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Guild Id Saved as', value: `${Filter}`, inline: true },

            )
            .setFooter(`No more details can be given. Some are kept private for legal reasons.`)

        try {

            return message.channel.send(embed)

        } catch (e) {

            return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

        }

        }else{

            var embed = new Discord.MessageEmbed()
            .setTitle("Data Information")
            .setURL("https://marcoaskovic.wixsite.com/exframe")
            .setAuthor("Reminder Some of the data (user data) is keepen secret.")
            .addFields(


                { name: '**Prefix**', value: "Prefix set to " + prefix + " in this guild", inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '**Message On Join**', value: `Set active ${JoinNotif}`, inline: true },

                { name: '**Default Role**', value: `Default Role is set to ${defaultRole}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Guild Data Stats', value: `Responding...`, inline: true },

                { name: '**Filter**', value: `Filter set to ${Filter}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '**Member swears**', value: `Not Stored.`, inline: true },

                { name: '**Data Id**', value: `${message.guild.id}-554963353845835`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '**Guild Id Saved as**', value: `${message.guild.id}`, inline: true },

            )
            .setFooter(`No more details can be given. Some data cannot be sent.`)

        try {

            return message.channel.send(embed)

        } catch (e) {

            return message.channel.send(new Discord.MessageEmbed().setDescription(" :x: Unexpected error occiered. Please try again"))

        }

        }
    }
}