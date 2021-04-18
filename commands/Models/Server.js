const mongoose = require('mongoose');
const Server = mongoose.Schema({
    UserId: Number,
    FindTrace: String,
    Offering1: String,
    Offering2: String,
    Offering3: String,
})

module.exports = mongoose.model('Server', Server);