angular.module('gitHubExplorer')
	.config(function ($stateProvider) {
		$stateProvider
			.state('root.gitHubExplorer', {
			    url: '/',
			    views: {
			        'content@': {
                        templateUrl: 'app/modules/gitHubExplorer/gitHubExplorer.html',
                        controller: 'gitHubExplorerController'
                    }
                }
			});
	});
