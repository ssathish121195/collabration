/**
 * UserController
 */

app.controller('UserController',function($scope,UserService,$rootScope,$location,$cookieStore){
	if($rootScope.loggedInUser!=undefined)
		UserService.getUser().then(function(response){//only for loggedInUser - only if user is loggedin
		$scope.user=response.data
	},function(response){
		console.log(response.status)
		$scope.error=response.data
		$location.path('/login')
})
	
		$scope.register=function(){
		UserService.register($scope.user).then(
		 function(response){
			alert('Registered successfully.. please login..')
			$location.path('/login')
		 }
		,function(response){
			$scope.error=response.data  //ErrorClazz object
		})
	}
	
	
	$scope.login=function(){
		UserService.login($scope.user).then(function(response){
			$rootScope.loggedInUser=response.data
			$cookieStore.put('loggedInUser',response.data)
			$location.path('/home')
			},function(response){
				$scope.error=response.data
				$location.path('/login')
			})
		
	}
		$scope.update=function(){
			UserService.update($scope.user).then(function(response){
				alert('Updated details successfully...')
				$rootScope.loggedInUser=response.data
				$cookieStore.put('loggedInUser',response.data)
				$location.path('/home')
			},function(response){
				console.log(response.status)
				if(response.status==401)
				$location.path('/login')
			
			})
		}
	
})


