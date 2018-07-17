/**
 * Angular module
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'views/registrationform.html',
		controller:'UserController'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controller:'UserController'
	})
	.when('/editprofile',{
		templateUrl:'views/updateform.html',
		controller:'UserController'
	})
	.when('/home',{
		templateUrl:'views/home.html',
		controller:'NotificationController'
	})
	.when('/addjob',{
		templateUrl:'views/jobform.html',
		controller:'JobController'
	})
	
	.when('/getalljobs',{
		templateUrl:'views/jobslist.html', 
		controller:'JobController'
	})
	
	.when('/getjob/:id',{// C to V
		templateUrl:'views/jobdetail.html',
		controller:'JobController'
	})
	
		.when('/addblog',{
			templateUrl:'views/blogform.html',
			controller:'BlogController'
		})
		
		.when('/getblogs',{
			templateUrl:'views/bloglist.html',
			controller:'BlogController'
		})
		
	.when('/getblog/:id',{
		templateUrl:'views/blogpostdetail.html',
		controller:'BlogPostDetailController'
	})
	
	.when('/getapprovalform/:id',{
		templateUrl:'views/approvalform.html',
		controller:'BlogPostDetailController'
	})
	.when('/getnotification/:id',{
		templateUrl:'views/notificationdetails.html',
		controller:'NotificationController'
	})
	.when('/uploadprofilepic',{
		templateUrl:'views/uploadprofilepic.html'
	})
	.when('/suggestedusers',{
		templateUrl:'views/suggestedusers.html',
		controller:'FriendController'
	})

	
	.when('/pendingrequests',{
		templateUrl:'views/pendingrequests.html',
		controller:'FriendController'
	})
	
	
	.when('/friends',{
		templateUrl:'views/friendlist.html',
		controller:'FriendController'
	})

	.when('/chat',{
		templateUrl:'views/chat.html',
		controller:'ChatController'
	})

	
	.otherwise({
		templateUrl:'views/login.html',
		controller:'UserController'

	})
	
})
app.run(function($rootScope,$cookieStore,UserService,$location){

	if($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get('loggedInUser')
	
		$rootScope.logout=function(){
		UserService.logout().then(function(response){
			$rootScope.successMessage="Loggedout Successfully.."
			delete $rootScope.loggedInUser
			$cookieStore.remove("loggedInUser")
				$location.path('/login')
		},function(response){
			$rootScope.errorMessage="Please login.."
				$location.path('/login')
		})
		
	}
})