'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.equalService
 * @description
 * # equalService
 * Service in the mattemotorApp. 
 * Note NOT! recursive (deep checking) and ONLY primitive types
 */
angular.module('mattemotorApp')
  .service('equalService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {
        arraysEqual : function(a1, a2) {

            if(a1.length !== a2.length) {
                return false;
            };

            for(var i = 0; i < a1.length; i++) {
                if(a1[i] != a2[i]) {
                    return false;
                }       
            }     

            return true;
        },

        arraysContainsSameElements : function(a1, a2) {
            var copy1 = a1.slice(0).sort(),
                copy2 = a2.slice(0).sort();

            return service.arraysEqual(copy1, copy2);
        },

        objectEquals : function(o1, o2) {
            return false;
        }
    };

    return service;
 });
