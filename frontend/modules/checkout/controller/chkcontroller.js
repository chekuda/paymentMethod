angular.module('paymentCtr',[]).
controller('paymentMethod', function($scope,$http,$window) {


	/*******************************
		Check if the payment have been aprroved or not
		#By the post information throught paypal into the URL
	********************************/

	$scope.checkifApprovedByPaypal = function(){

		if(location.search)
		{

			$scope.paymentByURL = location.search.match(/PAY.\w+/);
			$scope.tokenByURL = localStorage.getItem("tokenPaypal");//location.search.match(/EC.\w+/);
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
						console.log("PAYMENT SUCCESS>>>>>>>>>>"+data);
					})
					.error(function(err){
						console.log(err.name+" : DebugID"+err.debug_id);
					})

			}
			else{
				console.log(">>>>>>>>>>>>>>>Error: Couldn't get the paymentId from URL");
			}
		}
		else{
			console.log(">>>>>>>>>>>>>>>Checkout page not approved yet");
		}
	}()

  /******************************
		Payment by paypal
  ******************************/

  	$scope.token = "";//token variable
	
	$scope.sale = {//Var for sale information
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
          currency:"USD"
        },
        description:"This is the payment transaction description."
      }
    ]
  };

  $scope.paypalPayment = function(){

/****************************
		Calling the APi for client credentials
	*****************************/
	$http.get('/api/paypalMethod')
      .success(function(res){
      	console.log(res.msg);

      	//After to get the information, making a call for get the token in order to bein authorize for the payment      	
      	$http({
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        method: 'POST',
        headers: {
        		 'Accept': 'application/json',
    			 'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization': 'Basic ' + btoa(res.cliendSecret.client_id+":"+res.cliendSecret.client_secret)//Credentials for get the token
                  },
        data: 'grant_type=client_credentials'
		}).success(function (data, status, headers, config) {
            console.log(data);
            $scope.token = data.access_token;//give the token to the $scope variable
            localStorage.setItem("tokenPaypal", $scope.token);//save the token into the sessionstorage
             //if I get the token try to make payment
            //@@data.access_token, token to get access
            $http({
	        url: 'https://api.sandbox.paypal.com/v1/payments/payment',
	        method: 'POST',
	        headers: {
	        		 'Accept': 'application/json',
	    			 'Content-Type': 'application/json',
	                 'Authorization': 'Bearer ' + $scope.token//Token taken for the server
	                  },

	        data: JSON.stringify($scope.sale)})//Information sent as a string to the paypal API
		  .success(function (data, status, headers, config)
		  {
		  	console.log(data);
		  	if(data.links[1].method == "REDIRECT")
		  	{
		  		window.location = data.links[1].href;
		  	}
		  	else{
		  		console.log("Error: Couldnt redirect to paypal page");
		  	}
		  })
		  .error(function(data){
	        console.log("Error: Cant get access with the token >>>>>> "+data);
	        console.log($scope.token);
	      });

		}).error(function (data, status, headers, config) {
            console.log("Error: Can't get the token with the credentials >>>>>>"+data)
		});

      })
      .error(function(data){
        console.log("Error: Impossible to get the clientID>>>>>> "+data);
      });
	
	
  }
	

});