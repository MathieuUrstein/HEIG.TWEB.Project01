(function () {
	angular
		.module('menu')
		.controller('menuController', menu);


	function menu($scope) {
		// header menus
		// DisplayName : module
		$scope.menus = {
            'GitHubExplorer' : 'gitHubExplorer',
			'History' : 'history',
            'About' : 'about'
		};
	}
})();
