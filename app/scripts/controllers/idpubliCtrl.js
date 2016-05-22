

(function(){
angular.module('angularSpa')
.controller('idpubliCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;
    $scope.numero = 0;


    $scope.mostrarpublicaciones = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/publicaciones/buscarpublicacionporid/'+$scope.id,
       }).success(function(data){
          $scope.publicaciones = data;
      }).error(function(){
          alert("error al cargar publicaciones");
      });
    }

    $scope.eliminar = function (){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/publicaciones/borrarpublicacion/'+$scope.id,
          data: {

          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'eliminado Correctamente';
            alert("Publicacion eliminada correctamente");
        },
        function(error,status,headers,config){
          $scope.status = 'Error al eliminar';
          alert("Error al eliminar");
          console.log(error);
        });
    }

    $scope.mostrarcomentario = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/publicaciones/buscarcomentariosdeunapublicacion/'+$scope.id,
       }).success(function(data){
          $scope.comentarios = data;
          console.log($scope.comentarios[0]);
      }).error(function(){
          alert("error al cargar comentarios");
      });
    }

    $scope.agregarcomentario = function (){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/comentarios/crearcomentario',
          data: {
            "usuario":{"idUsuario":"16"},
            "publicacion":{"idPublicacion":$scope.id} ,
            "textocomentario": $scope.comentario
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'Comentario realizado';
            alert("Comentario realizado");
            $scope.mostrarcomentario();
            $scope.comentario = "";
        },
        function(error,status,headers,config){
          $scope.status = 'Error al comentar';
          alert("Error al comentar");
          $scope.comentario = "";
          console.log(error);
        });
    }

    $scope.eliminarcomentario = function (numero){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/comentarios/borrarcomentario/'+numero,
          data: {
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'Comentario realizado';
            alert("Comentario eliminado");
            $scope.mostrarcomentario();
        },
        function(error,status,headers,config){
          $scope.status = 'Error al eliminar comentario';
          alert("Error al eliminar comentario");
          console.log(numero);
        });
    }

    $scope.mostrarpublicaciones();
    $scope.mostrarcomentario();

  }]);
})();
