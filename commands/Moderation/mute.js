const muteModel = require('../Models/mute')
const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'mutes user',
    usage: '<mute> <member> <time> [reason]', 
    async execute(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const msRegex = RegExp(/(\d+(s|m|h|w))/);
        let muteRole = message.guild.roles.cache.find(r => r.name == 'Muted');
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('MANAGE_ROLES required')
        else if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'MANAGE_CHANNELS'])) return message.channel.send('MANAGE_ROLES, MANAGE_CHANNELS required')
        else if (!mentionedMember) return message.channel.send('You need to mention someone')
        else if(!msRegex.test(args[1])) return message.channel.send('Not valid amount')
        //creates the role
        if(!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'RED',
                }
            }).catch(e => console.log(e))
        }
        if(mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
            return message.channel.send('This member is higher than me')
        } else if(muteRole.position >= message.guild.me.roles.highest.position) {
            return message.channel.send('The Role `Muted` is higher than me')
        } 
        //here it takes the values from the database
        const isMuted = await muteModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        })
        if(isMuted) return message.channel.send('This member is already muted')
        //here it processes the permissions from every channel
        for(const channel of message.guild.channels.cache) {
            channel[1].updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
            }).catch(e => console.log(e))
        }
        
        const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== '@everyone')
        //here it adds the mute role
        await mentionedMember.roles.add(muteRole.id).catch(e => console.log(e));
        //here it removes all roles
        for(const role of noEveryone) {
            await mentionedMember.roles.remove(role[0]).catch(e => console.log(e));
        }
        //here it saves the values into the database
        const muteDoc = new muteModel({
            guildID: message.guild.id,
            memberID: mentionedMember.id,
            length: Date.now() + ms(msRegex.exec(args[1])[1]),
            memberRoles: noEveryone.map(r => r),
        })
        await muteDoc.save().catch(e => console.log(e));
        const reason = args.slice(2).join(' ');
        //output
        message.channel.send(`Muted ${mentionedMember} for **${msRegex.exec(args[1])[1]}** ${reason ? `for **${reason}**`: ''}`);
    }
}