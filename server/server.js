const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const api = require('./routes/api')
const app = new express()
const path = require('path');

app.use(cors())
app.use(express.static(__dirname + '/dist/ngApp'))
app.use(bodyParser.json())

app.use('/api', api)
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname , '/dist/ngApp/index.html'))
})

app.listen(PORT, function() {
    console.log('server running on localhost:' + PORT)
})
