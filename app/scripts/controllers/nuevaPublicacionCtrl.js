(function(){
    var a = angular.module('angularSpa');
    a.controller('nuevaPublicacionCtrl', ['$scope', '$http',  '$location',
      function($scope,$http, $location){

        $scope.array = [];
        var j = 0;
        var z = 0;
        var idnum = 0;
        $scope.ultimo = 0;
        $scope.agregar = function (){
          $http({
              method: 'POST',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/crearpublicacion',
              data: {
                "usuario":{"idUsuario":"35"},
                 "prioridadPublicacion":{"idPrioridadpublicacion":"36"},
                 "nombrepublicacion":$scope.nombrepublicacion,
                 "descripcionpublicacion":$scope.descripcionpublicacion
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Agregado Correctamente';
                $scope.recorrer();
                $location.path("/publicaciones");
            },
            function(error,status,headers,config){
              $scope.status = 'Error al agregar';
              alert("Error al agregar");
              console.log(error);
            });
        }
        $scope.mostrartags = function (){
          $http({
              method: 'GET',
              url: 'http://localhost:8080/proyectotbd2016/tags/',
           }).success(function(data){
              $scope.tags = data;
              console.log($scope.tags);
          }).error(function(){
              alert("error al cargar tags");
          });
        }

        $scope.agregartag = function (tagid){
          if(j != 0){
            for(var  i = 0; i < z; i++){
              if($scope.array[i] == tagid){
                if($scope.array[i+1] == 0){
                    $scope.array[i+1] = 1;
                }
                else{
                    $scope.array[i+1] = 0;
                }
                 i = z;
              }
              if(i+1 == z){
                $scope.array[j] = tagid;
                j = j + 1;
                $scope.array[j] = 1;
                j = j + 1;
                i = z;
              }
            }
            z = j;
          }else{
            $scope.array[j] = tagid;
            j = j + 1;
            $scope.array[j] = 1;
            j = j + 1;
            z = j;
          }
        }
        $scope.idnuevapublicacion = function (){
          $http({
              method: 'GET',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones',
           }).success(function(data){
              $scope.publicaciones = data;
              for (var i in $scope.publicaciones) {
              }
              $scope.ultimo = $scope.publicaciones[i].idPublicacion + 1;
          }).error(function(){
              alert("error al cargar publicaciones");
          });
        }

        $scope.recorrer = function (){
          for(var  i = 1; i < z; i=i+2){
            if($scope.array[i] == 1){
              idnum = $scope.array[i-1];
              $scope.agregartagpubli(idnum);
            }
          }
        }
        $scope.agregartagpubli = function (idnum){
          $http({
              method: 'POST',
              url: 'http://localhost:8080/proyectotbd2016/publicaciontags/crearpublicaciontag',
              data: {
                "tag":{"idTag":idnum},
                "publicacion":{"idPublicacion":$scope.ultimo}
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Agregado Correctamente';
            },
            function(error,status,headers,config){
              console.log(error);
            });
        }
        $scope.mostrartags();
        $scope.idnuevapublicacion();


    }]);
})();
