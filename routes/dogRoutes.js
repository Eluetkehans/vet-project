var express = require('express');
var Pet = require(__dirname + '/../models/pet');

var dogsRoute = module.exports = exports = express.Router();