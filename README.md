# paymentMethod
##Using Paypal API

##BackEnd:
	###NodeJS
	###Expressjs

##FrontEnd:
	###HTML
	###CSS
	###Angular


##More information
	##Complete a whole payment
	###1-Get the token for autentication
	Client_id and Client secret for the token are in the payconfigure.json file.
	Calling "/api/paypalMethod" for request the client_id and client_secret from the backend.
	Calling paypal API "https://api.sandbox.paypal.com/v1/oauth2/token" to get the token.
	###2-Create a payment
	POST the token to "https://api.sandbox.paypal.com/v1/payments/payment" in order to create the payment.
	Need to add where the client should be redirect after its accept/cancel the payment
	The response will give the redirect URL for the client
	###3-Accept the payment
	The client will go to paypal page and after accept the payment the client will be redirected to the page added before
	###4-Execute the payment
	Post to paypal API "https://api.sandbox.paypal.com/v1/payments/payment/paymentID/execute/" to execute the payment and wait for receive the answer from the API
