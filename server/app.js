const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

//import routes
const postesRoute = require('./routes/postes')
const usersRoute = require('./routes/users')
const commentairesRoute = require('./routes/commentaires')


app.use('/postes', postesRoute)
app.use('/users', usersRoute)
app.use('/commentaires', commentairesRoute)



//routes
app.get('/', (req, res) => {
    res.send('Menu principal')
})

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}, () => console.log('Connected to DB'))

//start listening the server
app.listen(3000)