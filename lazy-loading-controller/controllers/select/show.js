define(function () {
	return function ($scope) {
		$scope.templateUrl = 'controllers/select/show.html';
		$scope.selected = 'Tuesday';
		$scope.items = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	}
});