const express = require('express');
const router = express.Router();
const Knight = require('../models/Knight')

router.get('/', (req,res)=>{
        
    const knights = Knight.find();
    console.log(knights)
   
    
})

router.post('/', async(req,res)=>{

    const knight = new Knight({
        "name": req.body.name,
        "nickname": req.body.nickname,
        "birthday": req.body.date,
        "weapons": req.body.weapons,
    "attributes": {
        "strength": req.body.attributes.strength,
        "dexterity": req.body.attributes.dexterity,
        "constitution": req.body.attributes.constitution,
        "intelligence": req.body.attributes.intelligence,
        "wisdom": req.body.attributes.wisdom,
        "charisma": req.body.attributes.charisma,
    },
    "keyAttribute": req.body.keyAttribute
    });
    try{
        const savedKnight = await knight.save();
        res.json(savedKnight);
    }catch(err){
        res.json({ message: err });
    }

    

})

module.exports = router;