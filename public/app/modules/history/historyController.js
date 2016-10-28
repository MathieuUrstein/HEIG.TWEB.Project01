(function () {
    angular
        .module('history')
        .controller('historyController', History);

    History.$inject = ['historyService'];

    function History(historyService) {
        historyService.getHistory();
    }
})();