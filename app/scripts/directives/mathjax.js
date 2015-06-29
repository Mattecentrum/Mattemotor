'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:mathJax
 * @description
 * # mathJax
 */
angular.module('mattemotorApp')
  .directive('mathJax', function ($window) {
    var mathJax = $window.MathJax;
    return {
        restrict: 'A',
        priority: 1000,
        link: function () {
            setTimeout(function () {
                mathJax.Hub.Queue(['Typeset', mathJax.Hub]);
            }, 200);

            setTimeout(function () {
                mathJax.Hub.Queue(['Typeset', mathJax.Hub]);
            }, 500);
            setTimeout(function () {
                mathJax.Hub.Queue(['Typeset', mathJax.Hub]);
            }, 1000);

            setTimeout(function () {
                mathJax.Hub.Queue(['Typeset', mathJax.Hub]);
            }, 2000);
        }
    };
});

