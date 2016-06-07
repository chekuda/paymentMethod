
var express = require('express');
var bodyParser = require("body-parser");
var paypalM = require("../services/paypalMethod");

var listFunctions = express.Router();

//In case I receive any JSON data
listFunctions.use(bodyParser.json());

listFunctions.get("/paypalMethod",paypalM.paypalMethod);//Login function

exports.listFunctions = listFunctions;