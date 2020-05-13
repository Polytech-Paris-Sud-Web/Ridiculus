const express = require('express')
const router = express.Router()
const Poste = require ('../models/Poste')

// get all postes
router.get('/', async (req, res) => {
    try{
        const postes = await Poste.find()
        res.send(postes)
    }
    catch(err){
        res.json({message: err})
    }
})


// get poste by id
router.get('/:id', async (req, res) => {
    try{
        const poste = await Poste.findById(req.params.id)
        res.send(poste)
    }
    catch(err){
        res.json({message: err})
    }
})


// create poste
router.post('/', async (req,res) => {
    const poste = new Poste({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        dateCreated: req.body.dateCreated,
        dateUpdated: new Date(),
        vote: 0
    })
    
    try{
        const savedPoste = await poste.save()
        res.json(savedPoste)
    }
    catch(err){
        res.json({message: err})
    }
})

//delete poste
router.delete('/:id', async (req,res) => {
    try{
        const removedPoste = await Poste.remove({_id: req.params.id})
        res.json(removedPoste)
    }
    catch(err){
        res.json({message: err})
    }
})


//update poste
router.put('/:id', async (req,res) => {
    try{
        const updatedPoste = await Poste.findOneAndUpdate({_id: req.params.id}, {$set: 
            { title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            dateCreated: req.body.dateCreated,
            dateUpdated: req.body.dateUpdated,
            vote: req.body.vote}})
        res.json(updatedPoste)
    }
    catch(err){
        res.json({message: err})
    }
})

module.exports = router;