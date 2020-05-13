const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs')
const https = require('https')

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

//start listening the server https
https.createServer({
    key: fs.readFileSync('server.key', 'utf8'),
    cert: fs.readFileSync('server.cert', 'utf8')
  }, app)
  .listen(3000, function () {
    console.log('Ca tourne sur le port 3000!')
})

// running http server
const http = require('http')
const httpServer = http.createServer(app)
httpServer.listen(3001)