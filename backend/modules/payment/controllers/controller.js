
var express = require('express');
var bodyParser = require("body-parser");
var getUser = require("../services/getUserId");
var acceptbypaypal = require("../services/paymentbypaypal");

var listFunctions = express.Router();

//In case I receive any JSON data
listFunctions.use(bodyParser.json());

listFunctions.get("/getUserId",getUser.getUserId);//Get crient_id and client_secret

listFunctions.post("/connectPaypal",acceptbypaypal.acceptpaybypaypal);//geToken, create a payment

exports.listFunctions = listFunctions;