const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeaponSchema = require('./Weapon');

const KnightSchema = new Schema({
    "name": String,
    "nickname": String,
    "birthday": Date,
    "weapons": [WeaponSchema],
    "attributes": {
        "strength": Number,
        "dexterity": Number,
        "constitution": Number,
        "intelligence": Number,
        "wisdom": Number,
        "charisma": Number,
    },
    "keyAttribute": String,
    "attackPoints": Number,
    "experiencePoints": Number,
    "age": Number
})


KnightSchema.statics.mod = function(att){
    if (att > 0 && att < 9){
        return -2
    }else if(att >= 9 && att < 11){
        return -1
    }else if(att >= 11 && att < 13){
        return 0 
    }else if(att >= 13 && att < 15){
        return 1
    }else if(att >= 15 && att < 18){
        return 2
    }else if((att >= 18 && att < 20) || att >= 20){
        return 3
    }
}

KnightSchema.statics.getWeaponPoints = function(weapons){
    let points = 0

    weapons.forEach(function(weapon) {
        if (weapon.equipped == true){
            points += weapon.mod
        }
    });

    return points
}

KnightSchema.methods.calculateAge = function(){
    
    let today = new Date();
    let birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }    
    this.age = age;
}

KnightSchema.methods.calculateExp = function (){
    if (this.age < 7 ){
        this.experiencePoints = 0
    }else{
        this.experiencePoints = Math.floor((this.age-7)*Math.pow(22,1.45))
    }
}

KnightSchema.methods.calculateAttack = function(){
    this.attackPoints = 10 + KnightSchema.statics.mod(eval('this.attributes.' + this.keyAttribute)) + KnightSchema.statics.getWeaponPoints(this.weapons)
}



module.exports = mongoose.model('Knight', KnightSchema);