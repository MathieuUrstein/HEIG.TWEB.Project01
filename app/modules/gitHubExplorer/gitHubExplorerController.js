(function () {

	angular
		.module('gitHubExplorer')
		.controller('gitHubExplorerController', Home);


	function Home($scope) {
		$scope.title = "GitHubExplorer";
        $scope.subtitle = "Some statistics on github as graphics";
        $scope.chartTitle = "Plein d'informations incroyable";
        $scope.chartSubtitle = "Faudrait trouver un texte";

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
	}

})();
