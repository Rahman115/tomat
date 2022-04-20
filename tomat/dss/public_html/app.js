var app = angular.module('dssApp', []);

app.factory('Dataset', ['$http', function ($http) {
        var Url = "src/dataset.json";
        var Dataset = $http.get(Url).then(function (response) {
            return response.data;
        });
        return Dataset;
    }]);



app.controller('dssCtrl', ['$scope', 'Dataset', function ($scope, Dataset) {

        $scope.val = {};
        $scope.val.lebar = 1000;
        $scope.val.panjang = 1000;
        
        $scope.pen = false;
        
        Dataset.then(function (successResponse) {


            $scope.bedeng = successResponse.bedeng[0];
            $scope.tanam = successResponse.tanam[0];
            $scope.pohon = successResponse.pohon[0];
            $scope.pupuk = successResponse.pupuk[0];
            $scope.harga = successResponse.harga[0];

            console.log($scope.pupuk.dosis);
            console.log(successResponse);

            $scope.nilaiBedeng = function () {
                if ($scope.val.panjang < 50) {
                    return "Tidak dapat dijadikan bedeng";
                }
                if ($scope.val.panjang >= 50 && $scope.val.panjang <= 100 && $scope.val.lebar >= 50) {
                    var bedeng = $scope.val.panjang % 50;

                    return bedeng;
                }
            };

            $scope.nilaiTanamLajur = function () {
                if ($scope.val.panjang > $scope.tanam.jaraklajur && $scope.val.lebar > $scope.tanam.jaraklubang) {
                    var mod = $scope.val.panjang % $scope.tanam.jaraklajur;
                    var bagi = ($scope.val.panjang - mod) / $scope.tanam.jaraklajur;
//                    $scope.nilaiTanam = [{ 'lajur': bagi }];
                    return bagi;
                }

                if ($scope.val.panjang > 5 && $scope.val.panjang <= $scope.tanam.jaraklajur && $scope.val.lebar > 5 && $scope.val.lebar <= $scope.tanam.jaraklubang) {
                    return 1;
                } else {
                    return 0;
                }

            };

            $scope.nilaiTanamLubang = function () {
                if ($scope.val.panjang > $scope.tanam.jaraklajur && $scope.val.lebar > $scope.tanam.jaraklubang) {
                    var mod = $scope.val.lebar % $scope.tanam.jaraklubang;
                    var bagi = ($scope.val.lebar - mod) / $scope.tanam.jaraklubang;
//                    var n = bagi * $scope.nilaiTanamLajur();
//                    $scope.nilaiTanam = [{ 'lajur': bagi }];
                    return bagi;
                }

                if ($scope.val.panjang > 5 && $scope.val.panjang <= $scope.tanam.jaraklajur && $scope.val.lebar > 5 && $scope.val.lebar <= $scope.tanam.jaraklubang) {
                    return 1;
                } else {
                    return 0;
                }

            };

            $scope.totalLubang = function () {
                var n = $scope.nilaiTanamLubang() * $scope.nilaiTanamLajur();
                return n;
            };

            $scope.dosisTanaman = function () {
                var dos = ($scope.pupuk.dosis * $scope.totalLubang()) * $scope.pupuk.beri;
                return dos;
            };
            $scope.hargaDosisTanaman = function () {
                var harga = $scope.pupuk.harga * $scope.dosisTanaman();
                return harga;
            };


//            POHON
            $scope.jumlahBuahPerPohon = function () {
                var jml = ($scope.pohon.buah * $scope.totalLubang());
                return jml;
            };
            $scope.beratBuahPerPohon = function () {
                var jml = ($scope.pohon.berat * $scope.totalLubang());
                return jml;
            };
            
            $scope.hargaJual = function () {
                var v = ($scope.harga.uang * $scope.beratBuahPerPohon());
                return v;
            };
            $scope.hargaBersih = function () {
                var v = ($scope.hargaJual() - $scope.hargaDosisTanaman());
                return v;
            }; 
        });
    }]);