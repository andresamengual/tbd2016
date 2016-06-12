(function(){
    angular.module('angularSpa')
    .controller('editarpubliCtrl',  ['$scope', '$routeParams', '$http',  '$location',
      function($scope, $routeParams, $http, $location){
        $scope.id = $routeParams.id;
        $scope.array = [];
        var j = 0;
        var z = 0;
        var idnum = 0;
        $scope.mostraredi = function (){
          $http({
              method: 'GET',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/buscarpublicacionporid/'+$scope.id,
           }).success(function(data){
             $scope.nombre = data.nombrepublicacion;
             $scope.descripcion = data.descripcionpublicacion;
          }).error(function(){
              alert("error al cargar publicaciones");
          });
        }

        $scope.actualizar = function (){
          $http({
              method: 'PUT',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/editarpublicacion/'+$scope.id,
              data: {
                "usuario":{"idUsuario":"35"},
                 "nombrepublicacion":$scope.nombre,
                 "descripcionpublicacion":$scope.descripcion,
                 "prioridadPublicacion":{"idPrioridadpublicacion":"36"}
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Editado Correctamente';
                $scope.recorrer();
            },
            function(error,status,headers,config){
              $scope.status = 'Error al editar';
              alert("Error al editar");
              console.log(error);
            });
        }
        $scope.mostrartags = function (){
          $http({
              method: 'GET',
              url: 'http://localhost:8080/proyectotbd2016/tags/',
           }).success(function(data){
              $scope.tags = data;
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
        $scope.agregartagpubli = function (idnum){
          $http({
              method: 'POST',
              url: 'http://localhost:8080/proyectotbd2016/publicaciontags/crearpublicaciontag',
              data: {
                "tag":{"idTag":idnum},
                "publicacion":{"idPublicacion":$scope.id}
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Agregado Correctamente';
                $location.path("/idpubli/"+$scope.id);
            },
            function(error,status,headers,config){
              console.log(error);
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

        $scope.mostraredi();
        $scope.mostrartags();


    }]);
})();
