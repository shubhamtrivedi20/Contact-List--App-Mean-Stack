var myApp = angular.module("contactApp", []);

myApp.controller("AppCtrl", function($scope, $http) {
	
	console.log("Hello world from controller");

	var refresh = function() {
		$http.get('/contactpath').success(function (response) {
			$scope.contactList = response;
			$scope.contact = "";
		});
	}

	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactpath', $scope.contact).success(function (response) {
			console.log(response);
			refresh();
		});
	}

	$scope.remove = function(id) {
		console.log("Removing Contact with "+id);
		$http.delete('/contactpath/' + id).success(function (response) {
			refresh();
		});
	}

	$scope.edit = function(id) {
		console.log("Editing Contact with "+id);
		$http.get('/contactpath/' + id).success(function (response) {
			$scope.contact = response;
		});	
	}

	$scope.update = function() {
		console.log("Updating Contact with "+$scope.contact._id);
		$http.put('/contactpath/' + $scope.contact._id, $scope.contact).success(function (response) {
			refresh();
		});
	}

	$scope.reset = function() {
		$scope.contact = "";
	}



});