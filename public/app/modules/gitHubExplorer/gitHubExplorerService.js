(function () {
    angular
        .module('gitHubExplorer')
        .factory('gitHubExplorerService', GitHubExplorerService);

    GitHubExplorerService.$inject = ['$http', '$q'];

    function GitHubExplorerService($http, $q) {

        var service = {};

        // fetches the github API based on the given scope parameters
        // if an action is specified, after data are fetched, this action is triggered
        service.fetchAPI = function ($scope, action) {
            var token = '5e7d6783aeeaa2a09c29586e22fb662a3213cf82';
            var url = 'https://api.github.com';
            var repos = '/repos';
            var owner = '/'+$scope.user;
            var repo = '/'+$scope.userRepo;
            var apiUrlCombined = url+repos+owner+repo;
            var options = {
                headers: {'Authorization': 'token '+token}
            };

            // get the contributors list
            var promiseContributors = $http.get(apiUrlCombined + '/stats/contributors', options);

            // get the last year commit activity
            var promiseActivity = $http.get(apiUrlCombined + '/stats/commit_activity', options);

            // get the punch_card
            var promisePunch = $http.get(apiUrlCombined + '/stats/punch_card', options);

            // execute all the promises and wait for them all to be resoved
            // in case of 202 response, github is generating an answer
            // but you have to wait for this answer to be ready
            // https://developer.github.com/v3/repos/statistics/
            $q.all([
                promiseContributors,
                promiseActivity,
                promisePunch

            ]).then(function (ret) {
                // if github have not resolved the statistics
                // then wait 2 seconds
                // and restart the request
                if (
                    Object.keys(ret).length === 0 ||
                    ret[0].status !== 200 ||
                    ret[1].status !== 200 ||
                    ret[2].status !== 200
                ) {
                    console.log('api is preparing results, waiting 2 sec');
                    setTimeout(function () {
                        service.fetchAPI($scope, action);
                    }, 2000);
                    return;
                }
                // define data to the scope
                $scope.contributors = ret[0].data;
                $scope.commit_activity = ret[1].data;
                $scope.punch_card = ret[2].data;
                action($scope);
            }).catch(function(e) {
                console.log(e);
            });
        };

        // save data to backend
        // to do that just use http post method with the data
        // the server will take care of the rest
        service.saveDataToDb = function (data) {
            $http.post('/api/gitHubExplorer/new', data);
            console.log('data sent to server');
        };

        return service;
    }
})();
