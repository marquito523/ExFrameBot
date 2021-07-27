const Guild = require('../Models/Guild')
const mongoose = require('mongoose')
const muteModel = require('../Models/mute')
const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    async execute(client, member){
        const muteDoc = await muteModel.findOne({
            guildID: member.guild.id, 
            memberID: member.id,
        })
        if(muteDoc) {
            const muteRole = member.guild.roles.cache.find(r => r.name == 'Muted');
            if(muteRole) {
                member.roles.add(muteRole.id).catch(e => console.log(e));
            }
            muteDoc.memberRoles = [];
            await muteDoc.save().catch(e => console.log(e))
        }
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
    }
}