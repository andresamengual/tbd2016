

(function(){
angular.module('angularSpa')
.controller('idpubliCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;
    $http({
        method: 'GET',
        url: 'http://localhost:8080/proyectotbd2016/publicaciones/buscarpublicacionporid/'+$scope.id,
     }).success(function(data){
        $scope.publicaciones = data;
    }).error(function(){
        alert("error al cargar publicaciones");
    });

    $scope.eliminar = function (){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/publicaciones/borrarpublicacion/'+$scope.id,
          data: {

          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'eliminado Correctamente';
            alert("Eliminado Correctamente");
            redirectTo: '/home'
        },
        function(error,status,headers,config){
          $scope.status = 'Error al eliminar';
          alert("Error al eliminar");
          console.log(error);
        });
    }


  }]);
})();
