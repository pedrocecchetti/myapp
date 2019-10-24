const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HallofFameSchema = new Schema({
    "name": String,
    "nickname": String,
    "birthday": Date,
    "dateOfDeath": {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('HallOfFame', HallofFameSchema);