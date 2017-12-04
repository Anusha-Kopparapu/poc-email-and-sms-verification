var app = angular.module("myApp", []);
app.controller ("myCtrl",function($scope, $location){

$scope.register = function(){

window.open('public/login.html');
console.log("Anusha");
}
});