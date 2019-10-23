const express = require('express');
const router = express.Router();
const Knight = require('../models/Knight')

router.get('/', (req,res)=>{

    Knight.find().exec(function(err, knights){
        if (err){
            res.status(400)
            res.json({message: err})
        }else{
            res.json(knights);
        }
    });

})

router.get('/:id', (req,res)=>{
    Knight.findById(req.params.id).exec(function(err, knight){
        if (err){
            res.status(400)
            res.json({message: err})
        }else{
            res.json(knight)
        }
        
    });
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

router.delete('/:id', (req,res) => {
    Knight.deleteOne({_id: req.params.id}).exec(function(err, knight){
        if (err){
            res.status(400)
            res.json({message: err})
        }else{
            res.json({message: "Knight Deleted and added to Hall of Fame",
                    knight: knight})
        }
    })
})

module.exports = router;