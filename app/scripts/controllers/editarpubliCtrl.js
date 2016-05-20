(function(){
    angular.module('angularSpa')
    .controller('editarpubliCtrl',  ['$scope', '$routeParams', '$http',
      function($scope, $routeParams, $http){
        $scope.id = $routeParams.id;
        $http({
            method: 'GET',
            url: 'http://localhost:8080/proyectotbd2016/publicaciones/buscarpublicacionporid/'+$scope.id,
         }).success(function(data){
           console.log(data);
            $scope.publicaciones = data;

        }).error(function(){
            alert("error al cargar publicaciones");
        });
        $scope.actualizar = function (){
          $http({
              method: 'PUT',
              url: 'http://localhost:8080/proyectotbd2016/publicaciones/editarpublicacion/'+$scope.id,
              data: {
                 "nombrepublicacion":$scope.publicaciones.nombrepublicacion,
                 "descripcionpublicacion":$scope.publicaciones.descripcionpublicacion
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Editado Correctamente';
                alert("Editado Correctamente");
            },
            function(error,status,headers,config){
              $scope.status = 'Error al editar';
              alert("Error al editar");
              console.log(error);
            });
        }
    }]);
})();
