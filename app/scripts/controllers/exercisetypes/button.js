'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:ButtonCtrl
 * @description
 * # ButtonCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
  .controller('ButtonCtrl', function ($scope) {
   	
   	$scope.$on('someEvent', function(event, args) {

   		console.log("button controller")

    });


    
  });
