var app = angular.module('smsApp',[]);

app.controller('myCtrl',function($scope,$http) {

	$scope.submit =function (){
		 var body = $scope.Mobilenumber;
		
	$http({
    method: 'POST',
   url: 'http://localhost:8080/phone',
    // url: 'http://localhost:8086/Postbird',
    data:body,
    headers:{'Content-Type': 'application/json'},
  }).then(function successCallback(response) {
        console.log("Entered in successCallback ");
        console.log(JSON.stringify(response.data));
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.statusText);
        //$scope.birdsapi = response.data;
        alert('Success');
    }, function errorCallback(response) {
        console.log("Entered in errorCallback ");
        console.log(response.xhrStatus);
        console.log(response.status);
        console.log(response.statusText);
});

}
});