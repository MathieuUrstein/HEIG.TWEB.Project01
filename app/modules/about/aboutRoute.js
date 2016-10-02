angular.module('HEIG.TWEB.Project01')
	.config(function ($stateProvider) {
		$stateProvider
			.state('root.about', {
			    url: '/about',
			    views: {
			        'content@': {
                        templateUrl: 'app/modules/about/about.html'
                    }
                }
			});
	});
