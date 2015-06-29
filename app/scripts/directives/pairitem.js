'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:pairItem
 * @description
 * # pairItem
 */
angular.module('mattemotorApp')
    .directive('pairItem', function ($compile) {
        var pairTemplate = '<span>{{content.question}}{{name.name}}</span>' +
            '<select ng-focus="$parent.$parent.$parent.ResetField($parent.$parent.$parent.answer[key])" ng-model="$parent.$parent.$parent.answer[key].Answer" ng-class="$parent.$parent.$parent.GetAnswerClass($parent.$parent.$parent.answer[key])" >' +
            '<option ng-repeat="option in content.options track by $index">{{option}}</option>' +
            '<select>' +
            '<span></span>';

        var linker = function (scope, element) {
            element.html(pairTemplate);
            $compile(element.contents())(scope);
        };

        return {
            restrict: 'A',
            replace: true,
            link: linker,
            scope: {
                content: '=',
                key: '='
            }
        };
    }
);
