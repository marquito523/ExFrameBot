const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserId: String,
    UserName: String,
    UserCurrency: Number,
    UserEntries: Number,
    Rank: String,
});

module.exports = mongoose.model('User', userSchema, 'user');