var express = require('express');
var Pet = require(__dirname + '/../models/pet');

var catsRoute = module.exports = exports = express.Router();