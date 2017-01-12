const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')
const path = require('path')
const routes = require('./routes')

let app = express();
let server = http.createServer(app);
var io = socket(server);
let port = process.env.PORT || 8000;

exports.io = io;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'app')))
app.use(cors())
app.use('/', routes)

mongoose.connect('mongodb://luisvilches:luisvilches@ds163718.mlab.com:63718/mean
', err => {
	if (err) {console.log(err)}
})

server.listen(port, err => {
	if (err) {console.log(err)}

	console.log('servidor corriendo en el puerto ' + port)
})
