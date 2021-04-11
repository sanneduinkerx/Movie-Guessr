const express = require('express');
const app = express();

// http server on web, listens to port, express linked to port with data
//process listens to port with data from app
const http = require('http').createServer(app);

app.set('view engine', 'ejs'); 
app.use(express.static('public'));


app.get('/', (request, response) => {
    response.render('index')
})

http.listen(7070, () => {
    console.log('listening on port 7070');
})