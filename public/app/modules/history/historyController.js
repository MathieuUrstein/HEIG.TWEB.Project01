(function () {
    angular
        .module('history')
        .controller('historyController', History);

    History.$inject = ['$scope', 'historyService'];

    function History($scope, historyService) {

        // get the history
        historyService.getHistory().then(function (res) {
            // store it
            $scope.history = res.data;
            // end loading
            $scope.loadingStyle = {
                'visibility': 'hidden'
            };
        });
    }
})();