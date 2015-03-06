'use strict';

/**
 * @ngdoc function
 * @name dashApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
