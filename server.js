var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app)          //pass in express ap
var io = require('socket.io')(http)             //we'll pass in reference to http
var mongoose = require('mongoose')

//Socket.io has two parts, a client side library that runs on the browser, and a server side library for node.js
app.use(express.static(__dirname))
//parse json object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://user:pass@cluster0-mgzjq.mongodb.net/test?retryWrites=true' //connection string

var Message = mongoose.model('Message', {
        name : String,
        message: String
}) //model and pass in schema

/*var messages = [
    {name: 'Kobe', message : 'Yo'},
    {name: 'Lebron', message : 'Whaddup'}
];*/
// take in request, and then give us reference
app.get('/messages', (req, res) =>{
        Message.find({}, (err, messages) =>{
                res.send(messages)       
        })   //respond with message when a GET request is made to the homepage
})

app.post('/messages', (req, res) => {
        var message = new Message(req.body)            //object based on that model.
        
        message.save((err) =>{
                if(err)
                        sendStatus(500)
                //only if the message was successfully saved to the database
                // emit a socket IO event
                Message.findOne({message: 'badword'}, (err,censored) =>{
                        if(censored){
                                console.log('censored words found', censored)
                                Message.remove({_id: censored.id}, (err) => {
                                        console.log('removed censored word')
                                })
                        }
                })
                //messages.push(req.body)
                io.emit('message', req.body)
                res.sendStatus(200)      
        })
})

io.on("connection", (socket) =>{
        console.log("new user connected ");
})
//connect mongoose
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
        //console.log('mongo db connection', err)
})

// Node HTTP server so that way both Express and Socket.IO will be running
var server  = http.listen(3000, () => {
    console.log("Server is listening on port",server.address().port);
});