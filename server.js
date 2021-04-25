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
let sortedData;

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
    sortedData = sortedMovies;
    return sortedData;
}

// execute function to get data and sort order randomly.
randomSortedMovieData()
    .then(() => console.log('order being randomized and data fetched'))
    .catch((err) => console.log(err))


//______ WEBSOCKET ______//

let users = [];
let round = 0;

// when a connection is made with socket.io, the following function gets executed
// the parameter socket is given with the function
io.on('connection', async (socket) => {

    //______ USER CONNECTED______//

    // give feedback when someone joins
    socket.on('userConnected', (userName) => {

        //send event with username to all clients
        // feedback who joined the game
        io.emit('userConnected', userName);
        
        // storing user data to acces later for score and when someone disconnects
        users.push({
            username: userName,
            score: 0,
            // every client has a socket.id so i store the socket id together with the name
            // so i know which users are which
            id: socket.id
        });

        io.emit('scoreBoard', users);
    })

     //______ API DATA ______//
    // storing api data in object
    let guessMovie = {
        title: sortedData[round].title,
        img_path: sortedData[round].backdrop_path
    }
    
    io.emit('movieData', guessMovie);


     //______ CHAT + GUESS ANSWER ______//
    // message event with chat message a client submitted through form
    socket.on('message', (chatMsg) => {
        //io emit to SEND the message back to all clients that have browser open
        // send message to all clients
        io.emit('message', chatMsg);

         //______ WE HAVE A WINNER  ______//
        //checking if message involves a movie name
        // need to fix more, .includes, not the entire message?
        if(chatMsg.msg.toLowerCase() === sortedData[round].title.toLowerCase()){
            const user = chatMsg.username;

            //feedback to all users, someone guessed it right
            chatMsg.username = 'gamehost';
            chatMsg.msg = `${user} guessed the right movie`;

            io.emit('message', chatMsg);
            
            //______ ADD POINTS ______//
            users.forEach(user => {
                if(user.id == socket.id){
                    // updating the score in the user array with +10 of the person who got it right
                    user.score = user.score + 10;
                }
            });

            io.emit('scoreBoard', users);

             //______ SHOW NEXT MOVIE ______//
            // check if the round is a higher value then the length of array
            if(round >= sortedData.length - 1){
                round = 0;
                randomSortedMovieData()
                    .then(() => console.log('order being randomized and data fetched'))
                    .catch((err) => console.log(err))
            } else {
                // else add +1 to round
                round = round + 1;
            }

            let guessMovie = {
                title: sortedData[round].title,
                img_path: sortedData[round].backdrop_path
            }        

            io.emit('movieData', guessMovie);
        } 
    })

    //______ DISCONNECTED ______//
    // for example when user disconnects
    socket.on('disconnect', () => {
        let name = '';

        // getting name for feedback later to get to all users
        // write different
        users.forEach(user => {
            if(user.id == socket.id){
                name = user.username;
                // delete user 
                users = users.filter(user => user.id != socket.id);
            }
        });
       
        io.emit('disconnected', name)

    })
})

http.listen(port, () => {
    console.log(`listening on port ${port}`);
}) 