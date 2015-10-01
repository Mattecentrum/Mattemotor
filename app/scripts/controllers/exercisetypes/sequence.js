'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:SequenceCtrl
 * @description
 * # SequenceCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
  .controller('SequenceCtrl', function ($scope) {
    

    /*Maybe move this to directive*/
  	$scope.Remove = function(answer) {
        if(answer.Answer != null && answer.Answer.length > 0) {
            answer.Answer.pop();
        }
    };

    /*Maybe move this to directive*/
    $scope.Add = function(answer, option) {   

        if(answer.Answer == null) {
            answer.Answer = [];
        }

        option = new String(option).toString();
        answer.Answer.push(option);
    };

    $scope.$on('verify', function(event, args) {
        console.log("verify sequence")
        //Declare for the main controller that the verfication is done
        $scope.$emit('verified', []);
    });

    function verify(args) {

    }

});
