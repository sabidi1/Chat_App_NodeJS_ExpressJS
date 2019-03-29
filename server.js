var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var http = require('http').Server(app)          //pass in express ap
var io = require('socket.io')(http)             //we'll pass in reference to http

//Socket.io has two parts, a client side library that runs on the browser, and a server side library for node.js
app.use(express.static(__dirname));
//parse json object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: 'Kobe', message : 'Yo'},
    {name: 'Lebron', message : 'Whaddup'}
];
// take in request, and then give us reference
app.get('/messages', (req,res) =>{
        res.send(messages)           //respond with message when a GET request is made to the homepage
});

app.post('/messages', (req,res) =>{
        messages.push(req.body)
        io.emit('message', req.body);
        res.sendStatus(200)      
}); 
io.on("connection", (socket) =>{
        console.log("new user connected ");
})

// Node HTTP server so that way both Express and Socket.IO will be running
var server  = http.listen(3000, () => {
    console.log("Server is listening on port",server.address().port);
});