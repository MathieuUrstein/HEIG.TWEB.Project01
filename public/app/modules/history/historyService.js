(function () {
    angular
        .module('history')
        .factory('historyService', HistoryService);

    HistoryService.$inject = ['$http'];

    function HistoryService($http) {

        return {
            getHistory: function () {
                // promise of the backend last 10 history data
                return $http.get('/api/gitHubExplorer/lasts');
            }
        }
    }
})();
