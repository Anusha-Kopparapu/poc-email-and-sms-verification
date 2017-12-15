var app = angular.module('smsApp',['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/register.html"
    })
    .when("/sms", {
        templateUrl : "/views/sms.html"
    })
     .when("/email", {
        templateUrl : "/views/email.html"
    })
    .when("/verification", {
        templateUrl : "/views/verification.html"
    });
});

app.controller('myCtrl', function($scope,$http,$location){
$scope.register = function(name,email,phone)
{
   var body = {
        
            name: $scope.name,
            email:$scope.email,
            phone:$scope.phone
    };
   $http({
    method: 'POST',
    url: 'http://localhost:8080/Post',
    data:body,
    headers:{'Content-Type': 'application/json'},
  }).then(function successCallback(response) {
        console.log("Entered in successCallback ");
        console.log(JSON.stringify(response.data));
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.statusText);
        }, function errorCallback(response) {
        console.log("Entered in errorCallback ");
        console.log(response.xhrStatus);
        console.log(response.status);
        console.log(response.statusText);
}); 
  $location.path('/verification');
   };

});
app.controller('appCtrl',function($scope,$http){
	$scope.verifyotp =function (){
          var body = {
        
            otp :$scope.otp
            
    };

$http({
    method: 'POST',
    url: 'http://localhost:8080/verify',
    data:body,
    headers:{'Content-Type': 'application/json'},
  }).then(function successCallback(response) {
        console.log("Entered in successCallback ");
        console.log(JSON.stringify(response.data));
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.statusText);
        alert('your otp is verified');
        }, function errorCallback(response) {
        console.log("Entered in errorCallback ");
        console.log(response.xhrStatus);
        console.log(response.status);
        console.log(response.statusText);
        alert('your otp is not verified');
}); 


}
});