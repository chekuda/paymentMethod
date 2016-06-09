# paymentMethod
##Using Paypal API

##BackEnd:
	###NodeJS
	###Expressjs
	###Request
		For request information to PayPal API

##FrontEnd:
	###HTML
	###CSS
	###Angular


##More information
	##Complete a whole payment
	###1-Get the token for autentication
	Front-End will send the type of payment.
	Client_id and Client secret for the token are in the payconfigure.json file.
	Use the service at the backend "paymentbypaypal" to get the token and create the payment
		-Calling paypal API "https://api.sandbox.paypal.com/v1/oauth2/token" to get the token.
		-Calling PayPal API "https://api.sandbox.paypal.com/v1/payments/payment" to create the payment
	###2-Execute the payment
	OnLoad the Front-End will check if the token, payId and payerId exist and call the backEnd for execute the payment.
	Use the service at the backend "executepayment" to get the execute payment fron PayPal.
		-Calling the Paypal API "https://api.sandbox.paypal.com/v1/payments/payment/PAY-xxxxxxxxxxxxxxxxxx/execute/" for the execution.

###Amendments
	##Remember to change the client_id & client_secret to get the token.
	##Change the PayPal API urls from sandbox to production.
	##Modify the selectors in order to capture the Amount and Currency.
	##Active in your account different currency accepted.
