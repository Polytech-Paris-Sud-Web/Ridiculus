const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

//import routes
const postesRoute = require('./routes/postes')
const usersRoute = require('./routes/users')
const commentairesRoute = require('./routes/commentaires')

app.use('/postes', postesRoute)
app.use('/users', usersRoute)
app.use('/commentaires', commentairesRoute)

app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de Ridiculus !")
})

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}, () => console.log('Connected to DB'))

//start listening the server
app.listen(3000)