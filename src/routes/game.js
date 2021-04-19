// import utils file
// const fetchData = require('../utils/fetchData.js');

// ROUTE GAME
const game = async function (req, res){

    //the (res) respond: renders ejs template home, from the view folder
    // giving certain api data back to display
    // in the api are 2 different photo's
    // 1 is a backdrop -> which DOESNT SHOW THE TITLE if i go back to a simple game and just use a scene from the movie
    // the other one is the poster which most of them have titles, so this is for 1 user to see
    res.render('game')
    //  {
    //     poster_path: randomSortedMovies[1].backdrop_path,
    //     title: randomSortedMovies[1].title
    // });
}

// exporting the route game
module.exports = game;