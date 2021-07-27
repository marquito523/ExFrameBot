const mongoose = require('mongoose');
const SupportData = mongoose.Schema({
    Owner: Number,
    TicketID: Number,
    ListeningSend: Boolean
})

module.exports = mongoose.model('SupportData', SupportData);