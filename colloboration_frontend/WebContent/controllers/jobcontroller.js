/**
 * JobController
 */
	app.controller('JobController',function($scope,JobService,$location,$rootScope,$routeParams) {
		var id=$routeParams.id
		if(id!=undefined){
		JobService.getJob(id).then(function(response){
				$scope.job=response.data
			},function(response){
				if(response.status==401)
					$location.path('/login')
			})
		}
		
		
		JobService.getAllJobs().then(function(response){
			$scope.jobs=response.data // Array of Jobs in JSON fmt
		},function(response){
			$rootScope.error=response.data //ErrorClazz
			$location.path('/login')
		})
		
		$scope.addJob = function() {
			console.log($scope.job)
			JobService.addJob($scope.job).then(function(response) {
			alert('Job details posted successfully')
			$location.path('/getalljobs')
		}, function(response) {
			$rootScope.error=response.data;
			if (response.status==401) {
				if(response.data.code==5)
			{
				alert('you are not authorized to post job details')
				$location.path('/home')
			}
				else{
					$location.path('/login')
			     }
			}		
				
			})
		}
	})
	