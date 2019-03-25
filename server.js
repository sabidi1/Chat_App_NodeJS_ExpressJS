var express = require('express');

var app = express();

//Socket.io has two parts, a client side library that runs on the browser, and a server side library for node.js
app.use(express.static(__dirname));
var server  = app.listen(3000, () => {
    console.log("Server is listening on port",server.address().port);
});