'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.Exercise
 * @description
 * # Exercise
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('exercise', function (config, $http, $q) {
        
    	return({
    		getExercise: getExercise
    	});

        function getExercise(id, lang) {
        	//falback
            var url = "json/:lang/exercise/:id.json";

            if(config != null && config.endpoints != null) {
                url = config.endpoints.exercise;
            }

            url = url.replace(":id",id).replace(":lang", lang);

            var request = $http({
                    method: "GET",
                    url: url
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
