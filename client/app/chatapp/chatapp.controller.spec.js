'use strict';

describe('Controller: ChatappCtrl', function () {

  // load the controller's module
  beforeEach(module('zimmApp'));

  var ChatappCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatappCtrl = $controller('ChatappCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
