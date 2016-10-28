(function () {
    angular
        .module('gitHubExplorer')
        .factory('gitHubExplorerService', GitHubExplorerService);

    GitHubExplorerService.$inject = ['$http', '$q'];

    function GitHubExplorerService($http, $q) {

        service = {

            fetchAPI: function ($scope, action) {
                var token = '4ff527905e6cea7a2dafe27f9f784695eea0d44b';
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

                // execute tous les appels et attend toutes les réponses avant de passer au callback
                // en cas de réponse avec status 202 l'objet retourné est vide
                // il faut donc attendre un moment et relancer la requête
                // https://developer.github.com/v3/repos/statistics/
                $q.all([
                    promiseContributors,
                    promiseActivity,
                    promisePunch

                ]).then(function (ret) {
                    // github n'a pas fini de formuler le résultat,
                    // retenter dans 2 seconde
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

                    $scope.contributors = ret[0].data;
                    $scope.commit_activity = ret[1].data;
                    $scope.punch_card = ret[2].data;
                    action($scope);

                }).catch(function(e) {
                    console.log(e);
                });
            }
        };

        return service;
    }
})();

