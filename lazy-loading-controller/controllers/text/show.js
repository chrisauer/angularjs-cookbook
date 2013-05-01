define(function () {
	return function ($scope) {

		$scope.input = ''
		$scope.templateUrl = 'controllers/text/show.html';
		$scope.submit = function () {
			$scope.templateUrl = 'controllers/text/done.html';
		}
	};
});