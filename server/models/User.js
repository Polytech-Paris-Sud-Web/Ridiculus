const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    pseudo : String
})

module.exports = mongoose.model('user', userSchema, 'users')