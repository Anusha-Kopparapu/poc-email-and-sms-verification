var app = angular.module("myApp", []);
app.controller ("myCtrl",function($scope, $location){

$scope.register = function(){

$location.path("login.html");
}
});