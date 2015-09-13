/*'use strict';

describe('Service: exerciseList', function () {
  var $httpBackend;
  
  // load the service's module
  beforeEach(module('mattemotorApp'));

  // instantiate service
  var exerciseList;
  beforeEach(inject(function (_exerciseList_, $injector) {
    exerciseList = _exerciseList_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('Should send request with the correct url', function () {
    console.log("Exercises",exerciseList);

      $httpBackend.expect('GET', 'json/sv/list/5.json').respond(200, 'success');

      exerciseList.Load(1,'sv', function(data) {
        
      });

      $httpBackend.flush();
  });

});*/

 