'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('HEIG.TWEB.Project01')
	.config(function ($stateProvider) {
		$stateProvider
			.state('home', {
				url: '',
				templateUrl: 'app/modules/home/home.html'
			});
	});
