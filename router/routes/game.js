// import fetch
const fetch = require('node-fetch');

// variables for url API
const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
      key = process.env.KEY,
      language = 'en-US',
      page = '1',
      region = 'GB';

const url = `${endpoint}api_key=${key}&language=${language}&page=${page}&region=${region}`;

// fetching data from theMovieDB -> different file later?
async function fetchData(){
    const apiData = await fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
    // returns the fetched data
    return apiData;
};

 // route game
const game = async function (req, res){
    // fetching data from api in const
    const movieData = await fetchData();

    //the (res) respond: renders ejs template home, from the view folder
    // giving certain api data back to display
    // in the api are 2 different photo's
    // 1 is a backdrop -> which DOESNT SHOW THE TITLE if i go back to a simple game and just use a scene from the movie
    // the other one is the poster which most of them have titles, so this is for 1 user to see
    res.render('game', {
        poster_path: movieData.results[9].poster_path,
        title: movieData.results[9].title
    });
}

module.exports = game;