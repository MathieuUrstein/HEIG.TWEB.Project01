(function () {
    angular
        .module('gitHubExplorer')
        .controller('gitHubExplorerController', Home);

    Home.$inject = ['$q', '$scope', '$http', 'gitHubExplorerService'];

    function Home($q, $scope, $http, gitHubExplorerService) {

        $scope.contributors = [];
        $scope.title = "GitHubExplorer";
        $scope.subtitle = "Some statistics on github as graphics";
        $scope.user = 'angular';
        $scope.userRepo = 'angular.js';
        $scope.fetchAPI = function(){fetchAPI($scope, gitHubExplorerService)};
        $scope.setAngularJs = function(){setAngularJs($scope)};
        $scope.setAngular2 = function(){setAngular2($scope)};
        $scope.setReact = function(){setReact($scope)};
        $scope.setEmber = function(){setEmber($scope)};

        fetchAPI($q, $scope, $http);
    }

    function setAngularJs($scope) {
        $scope.user = 'angular';
        $scope.userRepo = 'angular.js';
        $scope.fetchAPI();
    }

    function setAngular2($scope) {
        $scope.user = 'angular';
        $scope.userRepo = 'angular';
        $scope.fetchAPI();
    }

    function setReact($scope) {
        $scope.user = 'facebook';
        $scope.userRepo = 'react';
        $scope.fetchAPI();
    }

    function setEmber($scope) {
        $scope.user = 'emberjs';
        $scope.userRepo = 'ember.js';
        $scope.fetchAPI();
    }

    function fetchAPI($scope, gitHubExplorerService) {
        // start loading
        $scope.loadingStyle = {
            'visibility': 'visible'
        };
        gitHubExplorerService.fetchAPI($scope, prepareForCharts);
    }

    function unixToDate(unixTimeStamp) {
        var a = new Date(unixTimeStamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        return date + ' ' + month + ' ' + year;
    }

    function prepareForCharts($scope) {
        $scope.contributors.reverse();

        $scope.charts = {
            contributors : {
                data : [],
                labels : []
            },
            commit_activity : {
                data : [],
                labels : []
            },
            punch_card : {
                days : {
                    data : [0,0,0,0,0,0,0],
                    labels : [
                        'Dimanche',
                        'Lundi',
                        'Mardi',
                        'Mercredi',
                        'Jeudi',
                        'Vendredi',
                        'Samedi'
                    ]
                },
                hours : {
                    data : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    labels : [
                        'Minuit',
                        '1h',
                        '2h',
                        '3h',
                        '4h',
                        '5h',
                        '6h',
                        '7h',
                        '8h',
                        '9h',
                        '10h',
                        '11h',
                        '12h',
                        '13h',
                        '14h',
                        '15h',
                        '16h',
                        '17h',
                        '18h',
                        '19h',
                        '20h',
                        '21h',
                        '22h',
                        '23h'
                    ]
                }
            }
        };

        for (key in $scope.contributors) {
            $scope.charts.contributors.data.push($scope.contributors[key].total);
            $scope.charts.contributors.labels.push($scope.contributors[key].author.login)
        }

        for (key in $scope.commit_activity) {
            $scope.charts.commit_activity.data.push($scope.commit_activity[key].total);
            $scope.charts.commit_activity.labels.push(unixToDate($scope.commit_activity[key].week));
        }

        for (key in $scope.punch_card) {
            $scope.charts.punch_card.days.data[$scope.punch_card[key][0]] += $scope.punch_card[key][2];
            $scope.charts.punch_card.hours.data[$scope.punch_card[key][1]] += $scope.punch_card[key][2];
        }

        // end loading
        $scope.loadingStyle = {
            'visibility': 'hidden'
        };
    }
})();