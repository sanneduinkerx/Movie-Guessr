//import express
const express = require('express');
const router = express.Router();

//import routes from routes folder
const home = require('./routes/home.js');
const game = require('./routes/game.js');
const error = require('./routes/error.js');

//routes
router
    .get('/', home)
    .get('/game', game)
    .get('/error', error)

module.exports = router;