'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:etDropdown
 * @description
 * # etDropdown
 */
angular.module('mattemotorApp')
    .directive('etDropdown', function () {
        return {
            scope: {
                items: '=',
                answer: '='
            },

        controller: ['$scope', function($scope){
            $scope.ResetField = function(key) {
                $scope.answer[key].Error = $scopeanswer[key].Correct = false;
            };

            $scope.GetAnswerClass = function(key) {
                return $scope.answer[key].Error ? ['incorrect'] : $scope.answer[key].Correct ? ['correct']  : [];
            };
      }],
      
      templateUrl: '/views/templates/et-dropdown.html'
   };
});
