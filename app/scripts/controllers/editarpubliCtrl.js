(function(){
    angular.module('angularSpa')
    .controller('editarpubliCtrl',  ['$scope', '$routeParams', '$http',  '$location',
      function($scope, $routeParams, $http, $location){
        $scope.id = $routeParams.id;

        $http({
            method: 'GET',
            url: 'http://localhost:8080/proyectotbd2016/publicaciones/buscarpublicacionporid/'+$scope.id,
         }).success(function(data){
           $scope.nombre = data.nombrepublicacion;
           $scope.descripcion = data.descripcionpublicacion;
        }).error(function(){
            alert("error al cargar publicaciones");
        });
        $scope.actualizar = function (){
          $http({
              method: 'PUT',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/editarpublicacion/'+$scope.id,
              data: {
                "usuario":{"idUsuario":"1"},
                 "nombrepublicacion":$scope.nombre,
                 "descripcionpublicacion":$scope.descripcion,
                 "prioridadPublicacion":{"idPrioridadpublicacion":"1"}
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Editado Correctamente';
                $location.path("/idpubli/"+$scope.id);
            },
            function(error,status,headers,config){
              $scope.status = 'Error al editar';
              alert("Error al editar");
              console.log(error);
            });
        }


    }]);
})();
