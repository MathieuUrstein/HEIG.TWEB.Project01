(function () {

	angular
		.module('HEIG.TWEB.Project01')
		.controller('HomeController', Home);


	function Home() {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Hello, HEIG.TWEB.Project01!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

	}

})();
