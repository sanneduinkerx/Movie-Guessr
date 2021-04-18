// require dotenv
require('dotenv').config();

// source: https://github.com/ju5tu5/barebonechat, followed lecture example 
const express = require('express');
const app = express();
const router = require('./router/router');

// http server on web, listens to port, express linked to port with data
//process listens to port with data from app
const http = require('http').createServer(app);  // read into http
const io = require('socket.io')(http); // read into (http)
const port = process.env.PORT || 7070; 

//looks in public folder for static files
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.use(router);

// when a connection is made with socket.io, the following function gets executed
// the parameter socket is given with the function
io.on('connection', (socket) => {
    console.log('User connected');

    // connection opened, then you can listen to events
    // self named event, message from client side
    // event is given in parameter in nameless function
    socket.on('message', (message) => {
        //io emit to SEND the message back to all clients that have browser open
        io.emit('message', message);
    })

    // for example when user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

http.listen(port, () => {
    console.log(`listening on port ${port}`);
}) 