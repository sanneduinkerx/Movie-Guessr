const express = require('express');
const router = express.Router();

//import fetched data file
const home = require('./routes/home.js');
const game = require('./routes/game.js');

//routes
router
    .get('/', home)
    .get('/game', game)

module.exports = router;