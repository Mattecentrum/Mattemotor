'use strict';

describe('Service: configService', function () {

  // instantiate service
  var configServiceProvider,
    init = function () {
      inject(function (_configServiceProvider_) {
        configServiceProvider = _configServiceProvider_;
      });
    };

  // load the service's module
  beforeEach(module('mattemotorApp'));

  it('should do something', function () {
    init();

    expect(!!configServiceProvider).toBe(true);
  });

  it('should be configurable', function () {
    module(function (configServiceProviderProvider) {
      configServiceProviderProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(configServiceProvider.greet()).toEqual('Lorem ipsum');
  });

});
