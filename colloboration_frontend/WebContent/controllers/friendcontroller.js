/**
 * FriendController
 */
app.controller('FriendController',function($scope,$location,FriendService,$rootScope){
	function getAllSuggestedUsers(){
	FriendService.getSuggestedUsers().then(
			function(response){
				$scope.suggestedUsers=response.data
			},function(response){
				$rootScope.error=response.data
				if(response.status==401)
				$location.path('/login')
			})
			
	}

			function getPendingRequests(){
				FriendService.getPendingRequests().then(function(response){
					$scope.friendRequests=response.data;
					},
					function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
		})
	}


	$scope.addFriend=function(user){
	  FriendService.addFriend(user).then(function(response){
			getAllSuggestedUsers()
				},function(response){
					$rootScope.error=response.data
					if(response.status==401)
					$location.path('/login')
				})
			}
	

	$scope.updateFriendRequest=function(friendRequest,status){
		friendRequest.status=status 
		FriendService.updateFriendRequest(friendRequest).then(function(response){
			getPendingRequests()
		},function(response){
			$rootScope.error=response.data
				if(response.status==401)
				$location.path('/login')
		})
		
	}
	

		FriendService.listOfFriends().then(function(response){
			$scope.friends=response.data
			},
			function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
	})
	
	
			
		getAllSuggestedUsers();
		getPendingRequests();
	})
