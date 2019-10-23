const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const KnightSchema = new Schema({
    "name": String,
    "nickname": String,
    "birthday": Date,
    "weapons": [
        {
        "name": String,
        "mod": Number,
        "attr": String,
        "equipped": Boolean
        }
    ],
    "attributes": {
        "strength": Number,
        "dexterity": Number,
        "constitution": Number,
        "intelligence": Number,
        "wisdom": Number,
        "charisma": Number,
    },
    "keyAttribute": String
})

module.exports = mongoose.model('Knight', KnightSchema)