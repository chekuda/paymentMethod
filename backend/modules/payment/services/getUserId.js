/* Copyright 2015-2016 PayPal, Inc. */
// "use strict";
// var paypal = require('../../');//WTF IS THIS
var secret = require('../../../configuration/payconfigure');

exports.getUserId = function(req,res){

    res.json({msg: "success", cliendSecret: secret});
}

//Response
// {
//   "id":"PAY-6RV70583SB702805EKEYSZ6Y",
//   "create_time":"2013-03-01T22:34:35Z",
//   "update_time":"2013-03-01T22:34:36Z",
//   "state":"created",
//   "intent":"sale",
//   "payer":{
//     "payment_method":"paypal"
//   },
//   "transactions":[
//     {
//       "amount":{
//         "total":"7.47",
//         "currency":"USD",
//         "details":{
//           "subtotal":"7.47"
//         }
//       },
//       "description":"This is the payment transaction description."
//     }
//   ],
//   "links":[
//     {
//       "href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-6RV70583SB702805EKEYSZ6Y",
//       "rel":"self",
//       "method":"GET"
//     },
//     {
//       "href":"https://www.sandbox.paypal.com/webscr?cmd=_express-checkout&token=EC-60U79048BN7719609",
//       "rel":"approval_url",
//       "method":"REDIRECT"
//     },
//     {
//       "href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-6RV70583SB702805EKEYSZ6Y/execute",
//       "rel":"execute",
//       "method":"POST"
//     }
//   ]
// }