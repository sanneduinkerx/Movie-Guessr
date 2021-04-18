// import fetch
const fetch = require('node-fetch');

// variables for url API
const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
      key = process.env.KEY,
      language = 'en-US',
      page = '1',
      region = 'GB';

const url = `${endpoint}api_key=${key}&language=${language}&page=${page}&region=${region}`;

async function fetchData(){
    const apiData = await fetch(url)
        .then(response => response.json())
    // returns the fetched data
    return apiData;
 };

 // route game
const game = async function (req, res){
    //the (res) respond: renders ejs template home, from the view folder
    res.render('game');
    const movieData = await fetchData();
    console.log(movieData);
}

module.exports = game;