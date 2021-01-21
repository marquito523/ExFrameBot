const { strike } = require('ffmpeg-static');
const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String,
    JoinNotif: Boolean,
    JoinMessage: String,
    SuggestionChannel: String,
    Filter: Boolean,
    SendText: String,
    JoinNotifChannel: String,
    defaultRole: String,
    
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');