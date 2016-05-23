(function(){
    angular.module('angularSpa')
    .controller('nuevaPublicacionCtrl', ['$scope', '$http',  '$location',
      function($scope,$http, $location){
        $scope.agregar = function (){
          $http({
              method: 'POST',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/crearpublicacion',
              data: {
                "usuario":{"idUsuario":"23"},
                 "prioridadPublicacion":{"idPrioridadpublicacion":"12"},
                 "nombrepublicacion":$scope.nombrepublicacion,
                 "descripcionpublicacion":$scope.descripcionpublicacion
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Agregado Correctamente';
                $location.path("/publicaciones");
            },
            function(error,status,headers,config){
              $scope.status = 'Error al agregar';
              alert("Error al agregar");
              console.log(error);
            });
        }
    }]);
})();
