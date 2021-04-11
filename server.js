const express = require('express');
const app = express();

// http server on web, listens to port, express linked to port with data
//process listens to port with data from app
const http = require('http').createServer(app);
const path = require('path');

//use ejs again is nicer
app.use(express.static(path.resolve('public')))

app.get('/', (request, response) => {
    
})

http.listen(7070, () => {
    console.log('listening on port 7070');
})