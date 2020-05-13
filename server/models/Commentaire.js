const mongoose = require('mongoose')

const commentaireSchema = mongoose.Schema({
    idPoste : String,
    content : String,
    author : String,
    dateCreated : String,
    dateUpdated : String
})

module.exports = mongoose.model('commentaire', commentaireSchema, 'commentaire')