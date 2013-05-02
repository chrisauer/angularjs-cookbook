!(function (ng) {
	var app = ng.module('myApp', []);
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/manager.html', 
			controller: 'LayoutManagerController'
		});
	}]);

	app.controller('LayoutManagerController', ['$scope', '$route', '$compile', '$http', function ($scope, $route, $compile, $http) {
		$scope.layouts = ['full', '2column', '3column'];
		$scope.controllers = ['PanelOneController', 'PanelTwoController', 'PanelThreeController'];
		$scope.broadcast = function () {
			$scope.$broadcast('broadcast', 'event');
		}
	}]);

	app.directive('layout', function ($compile, $http, $templateCache) {
		return {
			restrict: 'EA',
			scope: true,
			replace: true, 
			link: function (scope, element, attr) {
				var lastScope;

				function update() {
					if (lastScope) {
						lastScope.$destroy();
						lastScope = null;
					}

					lastScope = scope.$new();
					$http.get('layouts/' + lastScope.layout + '.html', {cache: $templateCache}).success(function (data) {
						element.html(data);
						$compile(element.contents())(lastScope);
					});
				}

				scope.$watch('layout', update);
			}
		};
	});

	app.directive('partial', function ($compile, $http, $templateCache, $controller) {
		return {
			restrict: 'E',
			template: '<div></div>',
			scope: true,
			link: function (scope, element, attr) {
				var index = attr['index'];
				var controller = scope.controllers[index];
				
				scope.$on('$layoutChangeStart', function () {
					scope.$destroy();
				});

				$controller(controller, {$scope: scope});

				scope.$watch('partial', function () {
					var promise = $http.get(scope.partial, {cache: $templateCache}).success(function (data) {
						element.html(data);
						$compile(element.contents())(scope);
					});
				});
			}
		};
	});


	app.controller('PanelOneController', ['$scope', function ($scope) {
		$scope.partial = 'views/panel-one.html';
		$scope.$on('broadcast', function () {
			$scope.event = 'PanelOneController Received Event at ' + new Date();
		});
	}]);

	app.controller('PanelTwoController', ['$scope', function ($scope) {
		$scope.partial = 'views/panel-two.html';
		$scope.$on('broadcast', function () {
			$scope.event = 'PanelTwoController Received Event at ' + new Date();
		});
	}]);

	app.controller('PanelThreeController', ['$scope', function ($scope) {
		$scope.partial = 'views/panel-three.html';
		$scope.$on('broadcast', function () {
			$scope.event = 'PanelThreeController Received Event at ' + new Date();
		});

	}]);

} (angular));