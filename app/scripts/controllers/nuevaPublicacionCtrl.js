(function(){
    angular.module('angularSpa')
    .controller('nuevaPublicacionCtrl', function($scope,$http){
        $scope.agregar = function (){
          $http({
              method: 'POST',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/crearpublicacion',
              data: {
                "usuario":{"idUsuario":"16"},
                 "prioridadPublicacion":{"idPrioridadpublicacion":"7"},
                 "nombrepublicacion":$scope.nombrepublicacion,
                 "descripcionpublicacion":$scope.descripcionpublicacion
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Agregado Correctamente';
                alert("Agregado Correctamente");
            },
            function(error,status,headers,config){
              $scope.status = 'Error al agregar';
              alert("Error al agregar");
              console.log(error);
            });
        }
    });
})();
