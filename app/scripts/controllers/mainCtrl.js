(function(){
angular.module('angularSpa')
.controller('MainCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

    $scope.mostrarpublicaciones = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/publicaciones',
       }).success(function(data){
          $scope.publicaciones = data;
          $scope.buscartag();
      }).error(function(){
          alert("error al cargar tags de la publicacion");
      });
    }
    $scope.mostrartags = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/tags/',
       }).success(function(data){
          $scope.tags = data;
          for (var i in $scope.tags) {
            if($scope.nombrebuscar == $scope.tags[i].nombretag){
              $scope.tagid = $scope.tags[i].idTag;
              $scope.buscar();
            }
          }
      }).error(function(){
          alert("error al mostrar tags");
      });
    }
    $scope.buscartag = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/preferencias/obtenerpreferenciadeunusuario/36',
       }).success(function(data){
          $scope.nombrebuscar = data;
          $scope.mostrartags();
      }).error(function(){
      });
    }
    $scope.buscar = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/publicaciontags/obtenerpublicacionesconunmismotag/9',
       }).success(function(data){
          $scope.recomendaciones = data;
      }).error(function(){
          alert("error al buscar");
      });
    }

    $scope.nombrebuscar = "";
    $scope.mostrarpublicaciones();


  }]);
})();
