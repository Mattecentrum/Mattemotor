'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.sharedExerciseData
 * @description
 * # sharedExerciseData
 * Service in the mattemotorApp.
 */
angular.module('mattemotorApp')
  .service('sharedExerciseData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var mathVars = {},
    	exercise = {},
    	HasError = false;

    return {
    	setExercise : function(exercise) {

    	}
    };
 });
