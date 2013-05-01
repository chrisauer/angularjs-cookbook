var app = angular.module('myApp',[]);
app.config(['$routeProvider', '$controllerProvider', '$provide', function ($routeProvider, $controllerProvider, $provide) {
	require.config({baseUrl: '.', catchError: true});
	$provide.value('$controllerProvider', $controllerProvider);
	$routeProvider.when('/delegate/:type/:controller', {
		template: '<div ng-include="templateUrl"></div>',
		controller: ['$scope', '$routeParams', '$injector', '$controllerProvider', '$controller', '$route', function ($scope, $routeParams, $injector, $controllerProvider, $controller, $route) {	

			// build the expected javascript path for this controller
			var path = 'controllers/' + $routeParams['type'] + '/' + $routeParams['controller'] + '.js';

			require([path], function (controller) {
				try {
					$controller(path, {$scope: $scope, $routeParams: $injector.get('$routeParams')});
					console.log('did not need to register controller');
				} catch (e) {
					console.log('FIRST USE: need to register this controller first');
					$controllerProvider.register(path, controller);
					$controller(path, {$scope: $scope, $routeParams: $injector.get('$routeParams')});
				}
				$scope.$apply();
				}, function (err) {
					$scope.templateUrl='controllers/error/error.html';
					$scope.type = $routeParams['type'];
					$scope.controller = $routeParams['controller'];
					$scope.$apply();

				}
			);

		}]
	});
}])