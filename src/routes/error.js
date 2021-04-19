// route error page
const error =  function (req, res) {
    //response render home from views folder
    res.render('error');
}

//export route
module.exports = error;