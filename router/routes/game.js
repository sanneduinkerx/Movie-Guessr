// import fetch
const fetch = require('node-fetch');

// API REQUEST - different file later
// variables for url API
const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
      key = process.env.KEY,
      language = 'en-US',
      page = '1',
      region = 'GB';

const url = `${endpoint}api_key=${key}&language=${language}&page=${page}&region=${region}`;

// fetching data from theMovieDB 
async function fetchData(){
    const apiData = await fetch(url)
        .then(response => response.json())
        // if the api request fails it will console.log an error
        .catch(err => console.log(err))
    // returns the fetched data
    return apiData;
};

 // ROUTE GAME
const game = async function (req, res){
    // fetching data from api in const
    const movieData = await fetchData();

    // PICKING RANDOM OBJECT -> also in different file, no logic yet here whoops
    // length objects fetched data
    const length = movieData.results.length;

    // function to get random number within range length of API for example picks random number between 0 and 20
    // kidding do this with socket io GIVE THIS TO SOCKET, has 2 different things now every client different thing
    // but the function is there just use it for socket!!!!
    // GIVE TO EVERY CLIENT
    const randomNumber = function getRandomNumber(length){
        return Math.floor(Math.random() * length);
    }

    // with function getRandomNumber, i can now pick one random object from results so for example object 4 
    const data = movieData.results[randomNumber(length)];

    //the (res) respond: renders ejs template home, from the view folder
    // giving certain api data back to display
    // in the api are 2 different photo's
    // 1 is a backdrop -> which DOESNT SHOW THE TITLE if i go back to a simple game and just use a scene from the movie
    // the other one is the poster which most of them have titles, so this is for 1 user to see
    res.render('game', {
        poster_path: data.backdrop_path,
        title: data.title
    });
}

// exporting the route game
module.exports = game;