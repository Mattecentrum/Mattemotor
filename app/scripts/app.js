'use strict';

/**
 * @ngdoc overview
 * @name mattemotorApp 
 * @description
 * # mattemotorApp
 *
 * Main module of the application.
 */
angular
    .module('mattemotorApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate'
    ])
    .config(['$routeProvider', '$locationProvider', '$translateProvider', 
    function($routeProvider, $locationProvider, $translateProvider) {
        $routeProvider
            .when('/list/:listId/exercise/:exerciseId', {
              templateUrl: '/views/exercise.html',
              controller: 'ExerciseCtrl',
              controllerAs: 'book'
            })
        .otherwise({
            redirectTo: '/list/1/exercise/1'
        });
        
         $translateProvider.translations('sv', {
            NEXTEXERCISE : 'Nästa',
            DONE : 'Klar',
            SHOWANSWER : 'Visa svaret',
            WRONG : 'Fel',
            TRYAGAIN : 'Prova igen',
            CORRECT : 'Rätt!'
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('sv');
        //$locationProvider.html5Mode(true);
  }]);
 