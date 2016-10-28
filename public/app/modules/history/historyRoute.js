angular.module('history')
	.config(function ($stateProvider) {
		$stateProvider
			.state('root.history', {
			    url: '/history',
			    views: {
			        'content@': {
                        templateUrl: 'app/modules/history/history.html',
						controller: 'historyController'
                    }
                }
			});
	});
