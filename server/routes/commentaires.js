const express = require('express')
const router = express.Router()
const Commentaire  = require ('../models/Commentaire')

// get all commmentaires
router.get('/', async (req, res) => {
    try{
        const commmentaires = await Commentaire.find()
        res.send(commmentaires)
    }
    catch(err){
        res.json({message: err})
    }
})


// get commmentaire by id
router.get('/:id', async (req, res) => {
    try{
        const commmentaire = await Commentaire.findById(req.params.id)
        res.send(commmentaire)
    }
    catch(err){
        res.json({message: err})
    }
})


// create commmentaire
router.post('/', async (req,res) => {
    const commmentaire = new Commentaire({
        idPoste: req.body.idPoste,
        content: req.body.content,
        author: req.body.author,
        dateCreated: req.body.dateCreated,
        dateUpdated: JSON.stringify(new Date())
    })
    
    try{
        const savedCommentaire = await commmentaire.save()
        res.json(savedCommentaire)
    }
    catch(err){
        res.json({message: err})
    }
})

//delete commmentaire
router.delete('/:id', async (req,res) => {
    try{
        const removedCommentaire = await Commentaire.remove({_id: req.params.id})
        res.json(removedCommentaire)
    }
    catch(err){
        res.json({message: err})
    }
})


//update commmentaire
router.put('/:id', async (req,res) => {
    try{
        const updatedCommentaire = await Commentaire.findOneAndUpdate({_id: req.params.id}, {$set: 
            {   idPoste: req.body.idPoste,
                content: req.body.content,
                author: req.body.author,
                dateCreated: req.body.dateCreated,
                dateUpdated: req.body.dateUpdated}})
        res.json(updatedCommentaire)
    }
    catch(err){
        res.json({message: err})
    }
})


module.exports = router;