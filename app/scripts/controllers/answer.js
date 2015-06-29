'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:AnswerCtrl
 * @description
 * # AnswerCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
    .controller('AnswerCtrl',['$scope', '$location', 'pager', function ($scope, $location, pager) {
    
        $scope.next = function() {
            var path = $location.$$path, 
                segments = path.split('/');

            if (pager.last()) {
                //remove last item
                segments.pop();
                segments.push('result');
                $location.path(segments.join('/'));
            } else {
                pager.next();
            }
        };
    }
]);
