// require dotenv
require('dotenv').config();

// source: https://github.com/ju5tu5/barebonechat, followed lecture example 
const express = require('express');
const app = express();

// import routes
const router = require('./src/router');

//import file to fetch data
const fetchData = require('./src/utils/fetchData.js');

// http server on web, listens to port, express linked to port with data
//process listens to port with data from app
const http = require('http').createServer(app);  // read into http
const io = require('socket.io')(http); // read into (http)
const port = process.env.PORT || 7070; 

//looks in public folder for static files
app.set('view engine', 'ejs'); 
app.set('views', './src/views');
app.use(express.static('./src/public'));
// router implemented with all the routes
app.use(router);

//______ FETCH DATA ______//

const randomSortedMovieData = async () => {
    // API vars to send with fetch
    const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
            key = process.env.KEY,
            language = 'en-US',
            page = '1',
            region = 'GB';
    const url = `${endpoint}api_key=${key}&language=${language}&page=${page}&region=${region}`;

    // fetching data from api
    const movieData = await fetchData(url);

    // PICKING RANDOM ORDER of objects 
    // random order so its not the same order every time someone plays
    // still search what the .5 for is
    const sortedMovies = movieData.results.sort(() => .5 - Math.random());
    return sortedMovies;
}

//______ WEBSOCKET ______//

// when a connection is made with socket.io, the following function gets executed
// the parameter socket is given with the function
io.on('connection', async (socket) => {
    console.log('User connected'); 

    // execute funtion to sort order randomly from api object
    const randomSortedMovies = await randomSortedMovieData();
    const movieData = {
        title: randomSortedMovies[0].title,
        // you have a backdrop_path: WITHOUT poster title and a poster_path with the title -> do this in readMe
        img_path: randomSortedMovies[0].backdrop_path
    }

    // emit to all clients the movieData Object
    io.emit('data', movieData);

    // connection opened, then you can listen to events
    // self named event, message from client side
    // event is given in parameter in nameless function
    socket.on('message', (data) => {
        //io emit to SEND the message back to all clients that have browser open
        io.emit('message', data);
    })

    // for example when user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

http.listen(port, () => {
    console.log(`listening on port ${port}`);
}) 