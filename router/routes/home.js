// route homepage
const home =  function (req, res) {
    //response render home from views folder
    res.render('home');
}

//export route
module.exports = home;