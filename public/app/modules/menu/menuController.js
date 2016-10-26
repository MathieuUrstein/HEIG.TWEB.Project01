(function () {

	angular
		.module('menu')
		.controller('menuController', menu);


	function menu($scope) {
		$scope.menus = {
            'GitHubExplorer' : 'gitHubExplorer',
            'About' : 'about'
		};
	}

})();
