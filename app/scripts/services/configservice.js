'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.configServiceProvider
 * @description
 * # configServiceProvider
 * Provider in the mattemotorApp.
 */
angular.module('mattemotorApp')
  .provider('configService', function () {

    // Private variables
    var options =  {};

    // Private constructor
    function Greeter() {
      this.greet = function () {
        return options;
      };
    }

    // Public API for configuration
     this.config = function (opt) {
        angular.extend(options, opt);
    };

    // Method for instantiating
     this.$get = [function () {
        if (!options) {
            throw new Error('Config options must be configured');
        }
        return options;
    }];
  });
