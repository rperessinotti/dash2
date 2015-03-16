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
        $scope.devices = [];
        $scope.path = $location.path().split('/').pop();
        $scope.pageResult = [];
        $scope.getData = function (date) {
            var daux = date.split('T')[0];
            var taux = date.split('T')[1].split('.')[0];
            return daux + '|' + taux;
        };
        var transformUrl = function (id, token, fullHistory) {
            $scope.today = '2015-3-14';
            var new_url = baseURL.replace('@device_id', id);
            new_url = new_url.replace('@token', token);
            if (typeof fullHistory  === "undefined" || (fullHistory !== false && fullHistory !== true))
                new_url = new_url.replace('@last','');
            else
                new_url = new_url.replace('@last',$scope.today + '/');
            return(new_url);
        };

        var structuredValues = { Temperature: 0, Humidity: 0};
        var structuredData   = { ten : { Temperature: 0, Humidity: 0}, twelve  : { Temperature: 0, Humidity: 0}, fourteen: { Temperature: 0, Humidity: 0}};

        $scope.sensors = [{location: '23a - Terreo',    deviceGroup: '23a', deviceNumber: 1,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/23a/terreo'},
                          {location: '23a - 1o. Piso',  deviceGroup: '23a', deviceNumber: 2,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/23a/1piso'},
                          {location: '23a - 2o. Piso',  deviceGroup: '23a', deviceNumber: 3,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/23a/2piso'},
                          {location: '23b - Terreo',    deviceGroup: '23b', deviceNumber: 4,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/23b/terreo'},
                          {location: '23b - Gefin',     deviceGroup: '23b', deviceNumber: 5,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/23b/gefin'},
                          {location: '23b - 1o. Piso',  deviceGroup: '23b', deviceNumber: 6,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/23b/1piso'},
                          {location: '16 - Corredor 1', deviceGroup: '16',  deviceNumber: 7,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/16/corredor1'},
                          {location: '16 - Corredor 2', deviceGroup: '16',  deviceNumber: 8,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/16/corredor2'},
                          {location: '12 - Corredor 1', deviceGroup: '12',  deviceNumber: 9,  deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/12/corredor1'},
                          {location: '12 - Corredor 2', deviceGroup: '12',  deviceNumber: 10, deviceToken: 'SSPtpxV7JqTHYY4urz-hAw', data: [], parsedData: structuredData, detailPath: '/cps/12/corredor2'}
            ];

        var coverDataParser = function (data, sensorKey) {
            var dados = data;
            var parsedAux = { ten : { Temperature: 0, Humidity: 0}, twelve  : { Temperature: 0, Humidity: 0}, fourteen: { Temperature: 0, Humidity: 0}};;

            $.each(dados, function (chave, valor) {
                var dtaux = $scope.getData(valor.created_at);
                var date_aux = dtaux.split('|')[0];
                var time_aux = dtaux.split('|')[1];
                var swithaux = parseInt(time_aux.split(":")[0]);
                var conta = 0;
                switch(swithaux) {
                    case 10:
                        if (parsedAux.ten.Temperature === 0) {
                            parsedAux.ten.Temperature = valor.body.data.Temperature;
                            parsedAux.ten.Humidity    = valor.body.data.Humidity;
                        }
                    case 12:
                        if (parsedAux.twelve.Temperature === 0) {
                            parsedAux.twelve.Temperature = valor.body.data.Temperature;
                            parsedAux.twelve.Humidity    = valor.body.data.Humidity;
                        }
                    case 14:
                        if (parsedAux.fourteen.Temperature === 0) {
                            parsedAux.fourteen.Temperature = valor.body.data.Temperature;
                            parsedAux.fourteen.Humidity    = valor.body.data.Humidity;
                        }
                }
            });
            $scope.sensors[sensorKey].parsedData = parsedAux;
        };

        var fillPageResults = function() {
            $.each($scope.devices, function (key, value) {
                if ($scope.pageResult.length === 0) {
                    $scope.pageResult.push($scope.sensors[value.key]);
                    setTimeout(function () {
                        g($scope.sensors[value.key].data[0].body.data.Temperature, 'gauge_' + $scope.sensors[value.key].deviceNumber, 'temperature');
                    }, 2000);
                }
                else {
                    var controla = false;
                    $.each($scope.pageResult, function (prKey, prValue) {
                        if (value.deviceNumber === $scope.pageResult[prKey].deviceNumber) {
                            controla = true;
                        }
                    });
                    if (!controla) {
                        $scope.pageResult.push($scope.sensors[value.key]);
                        setTimeout(function () {
                            g($scope.sensors[value.key].data[0].body.data.Temperature, 'gauge_' + $scope.sensors[value.key].deviceNumber, 'temperature');
                        }, 2000);
                    }
                }
            });
        };

        var onReceiveData = function (data, key) {
            $scope.sensors[key].data = data.data;
            coverDataParser($scope.sensors[key].data, key);
            fillPageResults();
        }


        $.each($scope.sensors, function (key, value) {
            if (value.deviceGroup === $scope.path) {
                var deviceStructure = {deviceNumber : '', key: 0};
                deviceStructure.deviceNumber = value.deviceNumber;
                deviceStructure.key = key;
                $scope.devices.push(deviceStructure);
                var urlAux = transformUrl(value.deviceNumber, value.deviceToken, false);
                $http.get(urlAux)
                    .then(function(data, status, headers, config) {
                      onReceiveData(data, key);
                    /*
                        console.log('prometido');
                        if (!$scope.sensors[key].data.length > 0) {
                            $scope.sensors[key].data = data;
                            //$scope.pageResult.push($scope.sensors[key]);
                        }
                        //coverDataParser(data, key);
                        */
                    })
                /*
                    .error(function(data, status, headers, config) {
                        console.log('Erro ao tentar puxar informações do servidor!');
                    });
                    */
            }
        });

    /*
        $.each($scope.devices, function (key, value) {
            coverDataParser($scope.sensors[value.key].data, value.key);
        });
    */
    });
