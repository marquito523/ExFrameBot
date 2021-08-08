const mongoose = require('mongoose');

const AppData = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserID: Number,
    UserLoginCred: String
});

module.exports = mongoose.model('AppData', AppData);

//thats a schema that you need to set for mongo