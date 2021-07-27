const mongoose = require('mongoose');

const Profile = mongoose.Schema({
    UserID: Number,
    Acheivements: Array,
    LETTER_VALUE:Number,
    WORD_POSITION: Number,
})

module.exports = mongoose.model('Profile', Profile);