'use strict';

/**
 * @ngdoc function
 * @name dashApp.controller:SensoresCtrl
 * @description
 * # SensoresCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
    .controller('SensoresCtrl', function ($scope, $location, $http) {
        var devices = [];
        var baseURL = 'http://ciot.kadu.com.br/v1/device/@device_id/streams/@last?token=@token';
        var d = new Date();
        $scope.today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        $scope.now = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

        $scope.devices = null;
        $scope.path = $location.path().split('/').pop();

        $scope.getData = function (date) {
            var daux = date.split('T')[0];
            var taux = date.split('T')[1].split('.')[0];
            return daux + '|' + taux;
        };

        var transformUrl = function (id, token, fullHistory) {
            var new_url = baseURL.replace('@device_id', id);
            new_url = new_url.replace('@token', token);

            if (typeof fullHistory  === "undefined" || (fullHistory !== false && fullHistory !== true))
                new_url = new_url.replace('@last','');
            else
                new_url = new_url.replace('@last',$scope.today + '/');

            return(new_url);
        };

        $scope.sensors = [{location: '23a - Terreo',    deviceGroup: '23a', deviceNumber: 1,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/23a/terreo'},
                          {location: '23a - 1o. Piso',  deviceGroup: '23a', deviceNumber: 2,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/23a/1piso'},
                          {location: '23a - 2o. Piso',  deviceGroup: '23a', deviceNumber: 3,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/23a/2piso'},
                          {location: '23b - Terreo',    deviceGroup: '23b', deviceNumber: 4,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/23b/terreo'},
                          {location: '23b - Gefin',     deviceGroup: '23b', deviceNumber: 5,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/23b/gefin'},
                          {location: '23b - 1o. Piso',  deviceGroup: '23b', deviceNumber: 6,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/23b/1piso'},
                          {location: '16 - Corredor 1', deviceGroup: '16',  deviceNumber: 7,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/16/corredor1'},
                          {location: '16 - Corredor 2', deviceGroup: '16',  deviceNumber: 8,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/16/corredor2'},
                          {location: '12 - Corredor 1', deviceGroup: '12',  deviceNumber: 9,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/12/corredor1'},
                          {location: '12 - Corredor 2', deviceGroup: '12',  deviceNumber: 10, deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], detailPath: '/cps/12/corredor2'}
            ];

        var getDevicesByGroup = function () {
            console.log('litros');
                /*
            $.each($scope.sensors, function (key, value) {
                console.log(key);

                if ($scope.sensors[key].deviceGroup === $scope.path) {
                    devices.push($scope.sensors[key]);
                    console.log(key);
                }
            });
                */
        };

        $scope.getDevicesByGroup = function () {
            getDevicesByGroup();
        }
    });
