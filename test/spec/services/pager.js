'use strict';

describe('Service: pager', function () {

  // load the service's module
  beforeEach(module('mattemotorApp'));

  // instantiate service
  var pager, location, exerciseList;

  beforeEach(inject(function (_pager_, _$location_, _exerciseList_) {
    pager = _pager_;
    exerciseList = _exerciseList_;
    exerciseList.GetCurrent = function() {
        return {
            "exercises":[
              {"id":"1","name":"Vilket är störst"},
              {"id":"2","name":"Vilket är nästa tal"},
              {"id":"3","name":"Vilket är minst"},
              {"id":"4","name":"Rätt ordning"},
              {"id":"5","name":"Dela upp tal"}
            ]
        };
    };
    location = _$location_;
    location.$$path = "/list/1/exercise/2";
    location.path = function(newPath) {
        location.$$path = newPath;
    };
  }));

    it('should return next exercise url', function () {
        pager.next();
        expect(location.$$path).toBe("/list/1/exercise/3");
    });

    it('should return exerciseurl on index', function () {
        pager.goTo(3)
        expect(location.$$path).toBe("/list/1/exercise/4");
    });

    it('should return true if last', function () {
        location.$$path = "/list/1/exercise/5";
        expect(pager.last()).toBe(true);
    });

    it('should return false if not last', function () {
        location.$$path = "/list/1/exercise/2";
        expect(pager.last()).toBe(false);
    });
});
