const express = require('express');
const router = express.Router();
const Knight = require('../models/Knight');
const HallofFame = require('../models/HallOfFame')

router.get('/', (req,res)=>{

    if(req.query.filter == 'heroes'){
        HallofFame.find().exec(function(err,hall){
            if(err){
                res.status(400)
                res.json({message: err})
            }else{
                res.status(200)
                res.send(hall)
            }
        })
    }

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
        "birthday": req.body.birthday,
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

    knight.calculateAttack()
    knight.calculateAge()
    knight.calculateExp()

    try{
        const savedKnight = await knight.save();
        res.json(savedKnight);
    }catch(err){
        res.json({ message: err });
    }

})

router.put('/:id', async(req,res)=>{
    
    Knight.findOneAndUpdate({_id: req.params.id}, req.body)

})

router.delete('/:id', (req,res) => {

    Knight.findById({_id: req.params.id}).exec(function(err,knight){
        if(err){
            res.status(400)
            res.json({message: err})
        }else{
            const halloffame = new HallofFame({
                "name": knight.name,
                "nickname": knight.nickname,
                "birthday": knight.birthday
            })
            halloffame.save()
        }
    })

    

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

router.get('/?filter=', (req,res) => {
    const hall = HallofFame.find().exec(function(err,hall){
        if(err){
            res.status(400)
            res.json({message: err})
        }else if(req.query.filter == 'heroes'){
            res.status(200)
            res.json(hall)
        }
    })
})

module.exports = router;