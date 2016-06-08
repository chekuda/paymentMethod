
var express = require('express');
var bodyParser = require("body-parser");
var paypalM = require("../services/getUserId");

var listFunctions = express.Router();

//In case I receive any JSON data
listFunctions.use(bodyParser.json());

listFunctions.get("/getUserId",paypalM.getUserId);//Login function

exports.listFunctions = listFunctions;