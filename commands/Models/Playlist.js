const mongoose = require('mongoose');

const Playlist = mongoose.Schema({
    UserID: Number,
    Playlists: Array
})

module.exports = mongoose.model('Playlist', Playlist);