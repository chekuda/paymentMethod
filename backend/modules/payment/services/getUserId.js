/* Copyright 2015-2016 PayPal, Inc. */
// "use strict";
// var paypal = require('../../');//WTF IS THIS
var secret = require('../../../configuration/payconfigure');

exports.getUserId = function(req,res){

    res.json({msg: "success", cliendSecret: secret});
}