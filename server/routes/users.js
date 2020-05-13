const express = require('express')
const router = express.Router()
const User = require ('../models/User')

// get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.send(users)
    }
    catch(err){
        res.json({message: err})
    }
})


// get user by id
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.send(user)
    }
    catch(err){
        res.json({message: err})
    }
})

// create user
router.post('/', async (req,res) => {
    const user = new User({
        name: req.body.name
    })
    
    try{
        const savedUser = await user.save()
        res.json(savedUser)
    }
    catch(err){
        res.json({message: err})
    }
})

//delete user
router.delete('/:id', async (req,res) => {
    try{
        const removedUser = await User.remove({_id: req.params.id})
        res.json(removedUser)
    }
    catch(err){
        res.json({message: err})
    }
})

module.exports = router;