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

//______ FETCH DATA  + sort order ______//

// var to fill with random sorted order data object
let data;

const randomSortedMovieData = async () => {
    // console.log(dataArray);

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
    data = sortedMovies;
    return data;
}

// execute function to get data and sort order randomly.
randomSortedMovieData()
    .then(() => console.log('order being randomized and data fetched'))
    .catch((err) => console.log(err))


//______ WEBSOCKET ______//

let users = [];

// when a connection is made with socket.io, the following function gets executed
// the parameter socket is given with the function
io.on('connection', async (socket) => {
    // console.log('User connected'); 

    // give feedback when someone joins
    socket.on('userConnected', (userName) => {
        io.emit('userConnected', userName);
        
        // storing user data
        users.push({
            username: userName,
            score: 0,
            id: socket.id
        });

        console.log(`${userName} connected`);
        console.log(users);
    })

    // storing api data in object
    const movieData = {
        title: data[0].title,
        // you have a backdrop_path: WITHOUT poster title and a poster_path with the title -> do this in readMe
        img_path: data[0].backdrop_path
    }

    // emit to all clients the movieData Object
    io.emit('data', movieData);

    // connection opened, then you can listen to events
    // self named event, message from client side
    // event is given in parameter in nameless function
    socket.on('message', (chatMsg) => {
        //io emit to SEND the message back to all clients that have browser open
        io.emit('message', chatMsg);

        //checking if message involves name
        // need to fix more, .includes, not the entire message
        if(chatMsg.msg.toLowerCase() == data[0].title.toLowerCase()){
            const user = chatMsg.username;
            chatMsg.username = 'gamehost';
            chatMsg.msg = `${user} guessed the right movie`;
        
            // adding points
            users.forEach(user => {
                if(user.id == socket.id) 
                {
                    user.username = 'marco';
                    //user.score = user.score + 1;                   
                }
            });
            
            // io.emit('message', chatMsg);
        } 
        console.log(users);
    })

    // for example when user disconnects
    socket.on('disconnect', () => {
        let name = 'empty';

        // getting name for feedback later to get to all users
        users.forEach(user => {
            if(user.id == socket.id) 
            {
                name = user.username;
                users = users.filter(user => user.id != socket.id);
            }
        });
       
        console.log(` ${name} disconnected`);
    })
})

http.listen(port, () => {
    console.log(`listening on port ${port}`);
}) 