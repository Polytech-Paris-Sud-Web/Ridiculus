const mongoose = require('mongoose')

const posteSchema = mongoose.Schema({
    title : String,
    content : String,
    author : String,
    dateCreated : String,
    dateUpdated : String
})

module.exports = mongoose.model('poste', posteSchema, 'postes')