'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.decorator:Sharedexercisedata
 * @description
 * # Sharedexercisedata
 * Decorator of the mattemotorApp
 */
angular.module('mattemotorApp')
  .config(function ($provide) {
    $provide.decorator('sharedExerciseData', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });
