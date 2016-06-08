/* Copyright 2015-2016 PayPal, Inc. */
var secret = require('../../../configuration/payconfigure');
var request = require('request');

exports.acceptpaybypaypal = function(req,res){

	var userID = new Buffer(secret.client_id+":"+secret.client_secret).toString('base64');//Set the USERID on base64 before send
	
	var paymentData = req.body;//This save the paymentData from the frontEnd

	if(userID)
	{
		
	    //Set token call
		var tokenCall  = 
		{
				  url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
			      method: 'POST',
			      headers: {
						 "Accept" : "application/json",
						 "Content-Type": "application/x-www-form-urlencoded",
				         "Authorization": "Basic " + userID//Credentials for get the token
	    			},
			      form: 'grant_type=client_credentials'
		};

		// Start the request
		request(tokenCall , function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        // Print out the response body
		        var bodyParsed = JSON.parse(body);
		        //Token got it in the body.access_token
		       //@@$scope.token, token to get access
		       if(bodyParsed.access_token)
		       {

		       		var createPaymentCall  = 
					{
							  url: 'https://api.sandbox.paypal.com/v1/payments/payment',
						      method: 'POST',
						      headers: {
									 "Accept" : "application/json",
									 "Content-Type": "application/json",
							         "Authorization": "Bearer " + bodyParsed.access_token//Credentials for get the token
				    					},
						      body: JSON.stringify(paymentData) //This got the values from the creditCard or payPal, remember use body for send this Content-type
					};


		   			request(createPaymentCall , function (error, response, body) {
		   				if (!error) {
		   					res.json({tokenPaypal:bodyParsed.access_token,payCreated: body});
		   				}
		   				else
		   				{
		   					res.send("ERROR>>>>>>>>>>Payment Failed>>"+error);
		   				}
						  	

		       }
		       else
		       {
		       	res.send("ERROR>>>Success request for token but its not retrieved");
		       }
			   
		    }
		    else//if error when try to request the token
		    {
		    	res.send(error);
		    }
		    	
		});

	}
	else
	{
		res.send("Error:>>>>>User_ID credential couldn't be retrieved");
	}
	
  }
