(function() {

	angular.module('HEIG.TWEB.Project01', [
		'ngAnimate',
		'ngResource',
		'ui.router',

        'menu',
		'gitHubExplorer'
	])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root', {
                views: {
                    'menu': {
                        templateUrl: 'app/modules/menu/menu.html',
                        controller: 'menuController'
                    },
                    'footer': {
                        templateUrl: 'app/modules/footer/footer.html'
                    }
                }
        });

        // the known route, with missing '/' - let's create alias
        $urlRouterProvider.when('', '/');

        // if no routes found
        $urlRouterProvider.otherwise('/');
    });
})();
