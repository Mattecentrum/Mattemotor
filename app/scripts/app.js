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
            .when('/:language/list/:listId/exercise/:exerciseId', {
              templateUrl: '/views/exercise.html',
              controller: 'ExerciseCtrl',
            })
            .when('/:language/list/:listId/result', {
                templateUrl: '/views/result.html',
                controller: 'ResultCtrl',
            })
        .otherwise({
            redirectTo: '/sv/list/1/exercise/1'
        });
        
        $translateProvider.translations('sv', {
            EXERCISES : 'Övningsuppgifter:',
            NEXTEXERCISE : 'Nästa',
            DONE : 'Klar',
            SHOWANSWER : 'Visa svaret',
            WRONG : 'Fel',
            TRYAGAIN : 'Prova igen',
            REDO_EXERCISES: 'Gör uppgifterna igen',
            NEXT_CHAPTER: 'Nästa avdelning',
            CORRECT : 'Rätt!',
            CHAPTER_EXERCISES_FINISHED: '',
            RESULT_MESSAGE: 'Du hade {{numberOfCorrectAnswers}} ut av {{numberOfExercises}} rätt',
        });

        $translateProvider.translations('en', {
            EXERCISES : 'Exercises:',
            NEXTEXERCISE : 'Next',
            DONE : 'Done',
            SHOWANSWER : 'Show the correct answer',
            WRONG : 'Wrong',
            TRYAGAIN : 'Try again',
            REDO_EXERCISES: 'Do exercises again',
            NEXT_CHAPTER: 'Next chapter',
            CORRECT : 'Correct!',
            CHAPTER_EXERCISES_FINISHED: '',
            RESULT_MESSAGE: 'You had {{numberOfCorrectAnswers}} out of {{totalNumberOfExercises}} correct',
        });

        $translateProvider.translations('da', {
            EXERCISES : 'Opgaver:',
            NEXTEXERCISE : 'Næste opgave',
            DONE : 'Svar',
            SHOWANSWER : 'Se svaret',
            WRONG : 'Forkert',
            TRYAGAIN : 'Prøv igen',
            REDOEXERCISES: 'Lav opgaven igen',
            NEXTCHAPTER: 'Næste afsnit',
            CORRECT : 'Korrekt!',
            CHAPTER_EXERCISES_FINISHED: '',
            RESULT_MESSAGE: 'Du havde {{numberOfCorrectAnswers}} ud af {{totalNumberOfExercises}} korrekt',
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('sv');
        //$locationProvider.html5Mode(true);
  }]);
 