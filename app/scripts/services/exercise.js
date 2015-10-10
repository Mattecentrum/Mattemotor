'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.Exercise
 * @description
 * # Exercise
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('exercise', function ($http, $q) {
        
    	return({
    		getExercise: getExercise
    	});

        function getExercise(id, lang) {
        	var request = $http({
                    method: "GET",
                    url: "json/"+lang+"/exercise/"+id+".json"
            	});
           
            return( request.then( handleSuccess, handleError ) );
        }

        function handleError( response ) {
            if (!angular.isObject(response.data) || !response.data.message) {
                return( $q.reject( "An unknown error occurred." ) );
            }
           
            return( $q.reject( response.data.message ) );
        }
        
        function handleSuccess( response ) {
            return( response.data );
        }
});
