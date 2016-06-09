/* Copyright 2015-2016 PayPal, Inc. */
var request = require('request');

exports.executePayment = function(req,res)
{
	var executePaymentDetails = "";
	var uRL = "";

	if(req.body)
	{
		executePaymentDetails = req.body;//Data retrived from the frontEnd
		uRL = "https://api.sandbox.paypal.com/v1/payments/payment/"+executePaymentDetails.paymentByURL[0]+"/execute/";
		//Set up the Call
		var executeCall  = 
		{
				  url: uRL,
			      method: 'POST',
			      headers: {
							 "Accept" : "application/json",
							 "Content-Type": "application/json",
					         "Authorization": "Bearer " + executePaymentDetails.tokenByURL//Credentials for get the token
		    					},
			      body: JSON.stringify({payer_id: executePaymentDetails.payerByURL[0]})
		};

		//Doing the call
		request(executeCall , function (error, response, body) 
		{
			if (!error) {
				res.json({msg:body});
			}
			else
			{
				res.send("ERROR>>>>>>>>>>Payment Failed>>"+error);
			}
		  	
		})


	}
	else{
		res.send("ERROR nothing recived at the backEnd");
	}
}
