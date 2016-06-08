angular.module('paymentCtr',[]).
controller('paymentMethod', function($scope,$http,$window) {

	$scope.displayAlert = 1;//var for display if the payment is success
  	$scope.token = "";//token variable
    $scope.client_id="";//Id retrieve from backEnd 
    $scope.client_secret="";//Secret retrieved from Backend
    $scope.paymentM = "";//Payment method sent by ngClick from DOM

	$scope.paypalSale = {//Var for paypal Sale
    intent:"sale",
    redirect_urls:{
      return_url:"http://localhost:3000",
      cancel_url:"http://youtube.com"
    },
    payer:{
      payment_method:"paypal"
    },
    transactions:[
      {
        amount:{
          total:"10.00",
          currency:"GBP"
        },
        description:"Paypal payment"
      }
    ]
  };

  $scope.paypalCreditCardSale = {//var for credit cart
    intent:"sale",
    redirect_urls:{
      return_url:"http://localhost:3000",
      cancel_url:"http://youtube.com"
    },
    payer:{
      payment_method:"credit_card",
      funding_instruments:[
        {
        	credit_card:{
        		// number:"4137355479710937",
        		// type:"VISA",
        		// expire_month:"07",
        		// expire_year:"2021",
        		// cvv2:"479",
        		// first_name:"test",
        		// last_name:"test"
        		number:"",
        		type:"",
        		expire_month:"",
        		expire_year:"",
        		cvv2:"",
        		first_name:"",
        		last_name:""
        	}
        }
      ]
    },
    transactions:[
      {
        amount:{
          total:"5.00",
          currency:"GBP"
        },
        description:"Credit card payment"
      }
    ]
  };

	/*******************************
		Check if the payment have been aprroved or not
		#By the post information throught paypal into the URL
	********************************/

	$scope.checkifApprovedByPaypal = function(){

		if(location.search)
		{

			$scope.paymentByURL = location.search.match(/PAY.\w+/);
			$scope.tokenByURL = sessionStorage.getItem("tokenPaypal");//location.search.match(/EC.\w+/);
			$scope.payerByURL = location.search.match(/\w+\w$/);
			
			if($scope.paymentByURL && $scope.tokenByURL && $scope.payerByURL){
				//@paymentId payerByURL[0]

					$http({
			        url: 'https://api.sandbox.paypal.com/v1/payments/payment/'+$scope.paymentByURL[0]+'/execute/',
			        method: 'POST',
			        headers: {
			        		 'Accept': 'application/json',
			    			 'Content-Type': 'application/json',
			                 'Authorization': 'Bearer ' + $scope.tokenByURL//Credentials for get the token
			                  },
			        data: JSON.stringify({payer_id: $scope.payerByURL[0]})
			    	})
					.success(function (data, status, headers, config){
						console.log("PAYMENT SUCCESS>>>>>>>>>>"+data.transactions);
						$scope.displayAlert = "success";
						//Total->data.transactions[0].amount.total
						//Currency ->data.transactions[0].amount.currency
						//Description that I added before ->data.transactions[0].description

					})
					.error(function(err){
						console.log(err.name+" : DebugID"+err.debug_id);
						$scope.displayAlert = "fail";
					})

			}
			else{
				console.log(">>>>>>>>>>>>>>>Error: Couldn't get the paymentId from URL");
			}
		}
		else{
			console.log(">>>>>>>>>>>>>>>Checkout page not approved yet");
		}
	}();

  /******************************
		Calling the APi for client credentials
  ******************************/

  $scope.paypalPayment = function(methodSelected){//passing the value to check which paymentMethod is selected

	$http.get('/api/getUserId')
      .success(function(res){
      	console.log(res.msg);
      	$scope.client_id=res.cliendSecret.client_id;//Add the res value to client_id
      	$scope.client_secret=res.cliendSecret.client_secret;//Add the res value to client_secret
      	if(res.cliendSecret.client_id && res.cliendSecret.client_secret)
      	{
      		$scope.getToken(methodSelected);//Call the get token function

      	}
      	else{
      		console.log("Error:>>>>>User_ID credential couldn't be retrieved from Backend");
      	}
      	
      })
      .error(function(data){
        console.log("Error: Impossible to get the clientID>>>>>> "+data);
      });
	
	
  };

  $scope.getToken = function(methodSelected){
	//After to get the information, making a call for get the token in order to bein authorize for the payment
  	$http({
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        method: 'POST',
        headers: {
        		 'Accept': 'application/json',
    			 'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization': 'Basic ' + btoa($scope.client_id+":"+$scope.client_secret)//Credentials for get the token
                  },
        data: 'grant_type=client_credentials'
		})
  		.success(function (data, status, headers, config) {
            console.log(data);
            $scope.token = data.access_token;//give the token to the $scope variable
            sessionStorage.setItem("tokenPaypal", $scope.token);//save the token into the sessionstorage

      		$scope.createPayment(methodSelected);//Calling the payment method
        })
        .error(function (data, status, headers, config) {
            console.log("Error: Can't get the token with the credentials >>>>>>"+data)
		});
  };

  $scope.createPayment = function(methodSelected){//need to receive a var for data to send

  	if(methodSelected == "creditCard")
  	{
  		$scope.paymentM = $scope.paypalCreditCardSale;
  	}
  	else if(methodSelected == "paypal")
  	{
  		$scope.paymentM = $scope.paypalSale;
  	}
  	else
  	{
  		console.log("Error:>>>>>Method wrong spel it");
  	}
  	//if I get the token try to make payment
     //@@$scope.token, token to get access
    $http({
    url: 'https://api.sandbox.paypal.com/v1/payments/payment',
    method: 'POST',
    headers: {
    		 'Accept': 'application/json',
			 'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + $scope.token//Token taken for the server
              },
    data: JSON.stringify($scope.paymentM)//This got the values from the creditCard or payPal
    })//Information sent as a string to the paypal API
    .success(function (data, status, headers, config)
	  {
	  	console.log(data);
	  	if(data.payer.payment_method == "paypal")
	  	{
	  		if(data.links[1].method == "REDIRECT")//Only for paypal
		  	{
		  		window.location = data.links[1].href;
		  	}
		  	else
		  	{
		  		console.log("Error: Couldnt redirect to paypal page");
		  	}
	  	}
	  	else if(data.payer.payment_method == "credit_card")
	  	{
	  		console.log("Message>>>>>"+data);
	  	}
	  	
	 })
	  .error(function(data){
        console.log("Error: Cant get access with the token >>>>>> "+data);
        console.log($scope.token);
      });
  }

	

});