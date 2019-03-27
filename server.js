var express = require('express');

var app = express();

//Socket.io has two parts, a client side library that runs on the browser, and a server side library for node.js
app.use(express.static(__dirname));

var messages = [
    {name: 'Kobe', message : 'Yo'},
    {name: 'Lebron', message : 'Whaddup'}
];

// take in request, and then give us reference
app.get('/messages', (req,res) =>{
        res.send(messages)           //respond with 'hello' when a GET request is made to the homepage
});

var server  = app.listen(3000, () => {
    console.log("Server is listening on port",server.address().port);
});