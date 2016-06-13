(function(){
angular.module('angularSpa')
.controller('nuevoTagCtrl', ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {

    $scope.agregar = function (){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/tags/creartag',
          data: {
            "nombretag":$scope.nombre,
            "descripciontag":$scope.descripcion
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'Agregado Correctamente';
            $scope.mostrartags();
            $scope.nombre = "";
            $scope.descripcion = "";
            $location.path("/nuevoTag");
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
    $scope.mostrartags();


  }]);
})();
