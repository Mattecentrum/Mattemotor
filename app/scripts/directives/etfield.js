'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:etField
 * @description
 * # etField
 */
angular.module('mattemotorApp')
    .directive('etField', function () {
        return {
            templateUrl: '/views/templates/et-field.html',
            scope: {
                items: '=',
                answer: '=',
                variables: '='    
            },
            controller: ['$scope', 'equalService', function($scope, equalService) {
                $scope.evaluateExpression = function(expr) {
                    return equalService.getCorrectAnswer($scope.variables, expr)
                };

                $scope.ResetField = function(key) {
                    $scope.answer[key].Error = $scope.answer[key].Correct = false;
                };

                $scope.GetAnswerClass = function(key) {
                    return $scope.answer[key].Error ? ['incorrect'] : $scope.answer[key].Correct ? ['correct']  : [];
                };
            }]
        };
});
