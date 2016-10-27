angular.module('HEIG.TWEB.Project01')
	.config(function ($stateProvider) {
		$stateProvider
			.state('root.history', {
			    url: '/history',
			    views: {
			        'content@': {
                        templateUrl: 'app/modules/history/history.html'
                    }
                }
			});
	});
