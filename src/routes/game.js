// ROUTE GAME
const game = async function (req, res){

    //the (res) respond: renders ejs template home, from the view folder
    res.render('game')
}

// exporting the route game
module.exports = game;