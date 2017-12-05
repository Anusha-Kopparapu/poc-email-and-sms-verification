var app = angular.module("myApp", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "index.html"
  })
  .when("/login", {
    templateUrl : "public/login.html"
  });
});

app.controller ("myCtrl",function($scope, $location){

$scope.register = function(){

$location.path('public/login.html');
}

$scope.emailsms =function(){
	if ($scope.emailR) {
                    window.alert("CheckBox is checked.");
                } else {
                    window.alert("CheckBox is not checked.");
                }

}
});