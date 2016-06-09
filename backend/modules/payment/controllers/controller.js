
var express = require('express');
var bodyParser = require("body-parser");
var acceptbypaypal = require("../services/paymentbypaypal");
var executeP = require("../services/executepayment");

var listFunctions = express.Router();

//In case I receive any JSON data
listFunctions.use(bodyParser.json());

listFunctions.post("/connectPaypal",acceptbypaypal.acceptpaybypaypal);//geToken, create a payment

listFunctions.post("/executepayment",executeP.executePayment);//geToken, create a payment

exports.listFunctions = listFunctions;