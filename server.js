const express = require('express');
const app = express();

// http server on web, listens to port, express linked to port with data
//process listens to port with data from app
const http = require('http').createServer(app);

app.get('/', (request, response) => {
    response.send('<h1> Hello World! </h1>');
})

http.listen(7070, () => {
    console.log('listening on port 7070');
})

