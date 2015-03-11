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
        $scope.pageResult = [];
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

        var coverDataParser = function (data) {
            $.each(data, function (key, value) {
                // @todo: Verificar se esta iterrando no cara certo, tenho a impressao que preciso andar mais um nivel pra poder gravar a temperatura e humidade certa
                var dtaux = $scope.getData(value.created_at);
                var date_aux = dtaux.split('|')[0];
                var time_aux = dtaux.split('|')[1];
                var d = new Date();
                var today = d.getFullYear()+'-'+("0" + (d.getMonth() + 1)).slice(-2)+'-'+("0" + d.getDate()).slice(-2);

                switch(parseInt(time_aux.split(":")[0])) {
                    case 10:
                        if (value.parsedData.ten.Temperature.length == 0) {
                          value.parsedData.ten.Temperature = value.data.Temperature;
                          value.parsedData.ten.Humidity = v.body.data.Humidity;
                        };
                        break;
                    case 12:
                        if (value.parsedData.twelve.Temperature.length == 0) {
                          value.parsedData.twelve.Temperature = v.body.data.Temperature;
                          value.parsedData.twelve.Humidity = v.body.data.Humidity;
                        }
                    break;
                    case 14:
                        if (value.parsedData.fourteen.Temperature.length == 0) {
                          value.parsedData.fourteen.Temperature = v.body.data.Temperature;
                          value.parsedData.fourteen.Humidity = v.body.data.Humidity;
                        }
                        break;
                };
            });
        };

        var structuredValues = { Temperature: '', Humidity: ''};
        var structuredData   = { ten : structuredValues, twelve  : structuredValues, fourteen: structuredValues};

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
        $.each($scope.sensors, function (key, value) {
            if (value.deviceGroup === $scope.path) {
                var urlAux = transformUrl(value.deviceNumber, value.deviceToken, false);
                $http.get(urlAux)
                    .success(function(data, status, headers, config) {
                        if (!$scope.sensors[key].data.length > 0) {
                            $scope.sensors[key].data = data;
                            $scope.pageResult.push($scope.sensors[key]);
                        }
                    })
                    .error(function(data, status, headers, config) {
                        console.log('fracasso');
                    });
            }
        });
    });
