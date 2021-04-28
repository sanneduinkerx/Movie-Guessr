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

    // randomize order in movieData array
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

io.on('connection', async (socket) => {

    //______ USER CONNECTED______//
    // give feedback when someone joins + store user data
    socket.on('userConnected', (userName) => {

        // send connected username to all clients, feedback who joined the game
        io.emit('userConnected', userName);
        
        // storing user data in users array to acces later
        users.push({
            username: userName,
            score: 0,
            // every client has a socket.id so i store the socket id together with the name
            // so i know which users are which
            id: socket.id
        });
        
         // send users to clients to fill scoreboard
         io.emit('scoreBoard', (users));

    })

     //______ API DATA ______//
    // storing api data in object
    let guessMovie = {
        img_path: sortedData[round].backdrop_path
    }
    
    // emit data to all clients
    io.emit('movieData', guessMovie);

     //______ CHAT + GUESS ANSWER ______//
    // message event with chat message a client submitted through form
    socket.on('message', (chatMsg) => {

        //send the message from one client back to all clients 
        io.emit('message', chatMsg);

         //______ WE HAVE A WINNER  ______//
        //checking if message involves a movie name
        // first message + title all lower case and then see if the message includes a string that matches the title
        if(chatMsg.msg.toLowerCase().includes(sortedData[round].title.toLowerCase())){
            // fill user with username who guessed the right answer
            const user = chatMsg.username;

            //feedback to all users, someone guessed it right
            // so change username + message and send that message back to all clients
            chatMsg.username = 'gamehost';
            chatMsg.msg = `${user} guessed the right movie`;

            // send message that all clients, user guessed the right answer
            io.emit('message', chatMsg);
            
            //______ ADD POINTS ______//
            // check which user it is with socket.id and then add 10 points to the score in the array users
            users.forEach(user => {
                if(user.id == socket.id){
                    user.score = user.score + 10;
                }
            });

            // send the new points to all clients
            io.emit('scoreBoard', (users));

             //______ SHOW NEXT MOVIE ______//
            // check if the round is a higher value then the length of array
            // if so the whole game starts again and order is randomized again
            if(round >= sortedData.length - 1){
                round = 0;
                // shuffle data again
                sortedData.sort(() => .5 - Math.random());
            } else {
                // else add +1 to round, show next movie
                round = round + 1;
            }

            // change data with the next object in array, given with round
            guessMovie = {
                img_path: sortedData[round].backdrop_path
            }        

            // emit next movie img and title (though i can delete the title later)
            io.emit('movieData', guessMovie);
        } 
    })

    //______ DISCONNECTED ______//
    socket.on('disconnect', () => {
        let name = '';

        // 'user disconnected' feedback to all clients
        // check if the socket.id matches with user.id in users array, to search who is disconnected
        // and then delete that user from the array
        users.forEach(user => {
            if(user.id == socket.id){
                // fill name with username
                name = user.username;
                // delete user from users array
                users = users.filter(user => user.id != socket.id);
            }
        });
        
        // emit name to all clients, to send feedback
        io.emit('disconnected', name)

        // update scoreboard, erase the one who left
        io.emit('scoreBoard', (users));

    })
})

http.listen(port, () => {
    console.log(`listening on port ${port}`);
}) 