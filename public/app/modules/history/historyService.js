(function () {
    angular
        .module('history')
        .factory('historyService', HistoryService);

    HistoryService.$inject = ['$http'];

    function HistoryService($http) {

        return {
            getHistory: function () {
                console.log('historyService')
            }
        }
    }
})();
