

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
  }]);
})();
