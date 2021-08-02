const mongoose = require('mongoose');

const Playlist = mongoose.Schema({
    UserID: Number,
    Playlists: Array,
    Public: Boolean
})

module.exports = mongoose.model('Playlist', Playlist);
