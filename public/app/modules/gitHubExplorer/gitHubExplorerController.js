(function () {
    angular
        .module('gitHubExplorer')
        .controller('gitHubExplorerController', Home);

    Home.$inject = ['$scope', 'gitHubExplorerService'];

    function Home($scope, gitHubExplorerService) {
        // GitHubExplorer page title and subtitle
        $scope.title = "GitHubExplorer";
        $scope.subtitle = "Some statistics on github as graphics";

        // Default repo to show
        $scope.user = 'angular';
        $scope.userRepo = 'angular.js';

        // let the methods be available from the frontend
        $scope.fetchAPI = function(isCustom){methods.fetchAPI(isCustom)};
        $scope.setAngularJs = function(){methods.setAngularJs()};
        $scope.setAngular2 = function(){methods.setAngular2()};
        $scope.setReact = function(){methods.setReact()};
        $scope.setEmber = function(){methods.setEmber()};

        // if it's a custom request, then we will save it in the database
        $scope.isCustom = false;

        // let the controller have his methods like a class.
        // this way we don't need to pass $scope to every methods
        var methods = {};

        // set repo to angularjs
        methods.setAngularJs = function() {
            $scope.user = 'angular';
            $scope.userRepo = 'angular.js';
            $scope.fetchAPI();
        };
        // set repo to angular2
        methods.setAngular2 = function() {
            $scope.user = 'angular';
            $scope.userRepo = 'angular';
            $scope.fetchAPI();
        };
        // set repo to react
        methods.setReact = function() {
            $scope.user = 'facebook';
            $scope.userRepo = 'react';
            $scope.fetchAPI();
        };
        // set repo to ember
        methods.setEmber = function() {
            $scope.user = 'emberjs';
            $scope.userRepo = 'ember.js';
            $scope.fetchAPI();
        };
        // fetch the github api and then display it with charts
        methods.fetchAPI = function(isCustom) {
            // start loading
            $scope.loadingStyle = {
                'visibility': 'visible'
            };
            if (isCustom) {
                $scope.isCustom = isCustom;
            }
            // let's fetch it, and with the second argument, call the following action
            // which is to display data as charts
            gitHubExplorerService.fetchAPI($scope, methods.prepareForCharts);
        };
        // unix date to readable date
        methods.unixToDate = function(unixTimeStamp) {
            var a = new Date(unixTimeStamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            return date + ' ' + month + ' ' + year;
        };
        // process data to match chart.js then display them on the frontend
        methods.prepareForCharts = function($scope) {
            // most commits to less commits
            $scope.contributors.reverse();
            // prepare the charts object
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
                            'Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'
                        ]
                    },
                    hours : {
                        data : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        labels : [
                            'Minuit',
                            '1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h',
                            '14h','15h','16h','17h','18h','19h','20h','21h','22h','23h'
                        ]
                    }
                }
            };
            // from api contributors to chart.js contributors
            for (key in $scope.contributors) {
                $scope.charts.contributors.data.push($scope.contributors[key].total);
                $scope.charts.contributors.labels.push($scope.contributors[key].author.login)
            }
            // from api commits activities to chart.js commits activities
            for (key in $scope.commit_activity) {
                $scope.charts.commit_activity.data.push($scope.commit_activity[key].total);
                $scope.charts.commit_activity.labels.push(methods.unixToDate($scope.commit_activity[key].week));
            }
            // from api punch card to chart.js punch card
            for (key in $scope.punch_card) {
                $scope.charts.punch_card.days.data[$scope.punch_card[key][0]] += $scope.punch_card[key][2];
                $scope.charts.punch_card.hours.data[$scope.punch_card[key][1]] += $scope.punch_card[key][2];
            }

            // end loading
            $scope.loadingStyle = {
                'visibility': 'hidden'
            };

            // save if custom search
            if ($scope.isCustom) {
                // data to be saved
                var sentData = {
                    contributors: $scope.contributors,
                    charts: $scope.charts,
                    user: $scope.user,
                    userRepo: $scope.userRepo
                };
                gitHubExplorerService.saveDataToDb(sentData);
                // reset isCustom
                $scope.isCustom = false;
            }
        };

        // default repo fetched
        methods.fetchAPI();
    }
})();