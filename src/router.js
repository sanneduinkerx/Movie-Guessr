//import express
const express = require('express');
const router = express.Router();

//import routes from routes folder
const home = require('./routes/home.js');
const game = require('./routes/game.js');

//routes
router
    .get('/', home)
    .get('/game', game)

module.exports = router;