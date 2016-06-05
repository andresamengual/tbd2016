

(function(){
angular.module('angularSpa')
.controller('idpubliCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce',
  function($scope, $routeParams, $http, $location, $sce) {
    $scope.id = $routeParams.id;
    $scope.numero = 0;

    $scope.mostrar = true;


    $scope.deliberatelyTrustDangerousSnippet = function(n) {
           return $sce.trustAsHtml(n);
    };

    $scope.funcion2 = function(z) {
           return $sce.trustAsHtml(z);
    };


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
            $location.path("/publicaciones");
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
      }).error(function(){
          alert("error al cargar comentarios");
      });
    }

    $scope.agregarcomentario = function (){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/comentarios/crearcomentario',
          data: {
            "usuario":{"idUsuario":"23"},
            "publicacion":{"idPublicacion":$scope.id} ,
            "textocomentario": $scope.comentario
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'Comentario realizado';
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
            $scope.mostrarcomentario();
        },
        function(error,status,headers,config){
          $scope.status = 'Error al eliminar comentario';
          alert("Error al eliminar comentario");
          console.log(numero);
        });
    }

    $scope.valorar = function (){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/valoraciones/crearvaloracion',
          data: {
            "usuario":{"idUsuario":"20"},
            "publicacion":{"idPublicacion":$scope.id} ,
            "valorvaloracion":$scope.valoracion
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
          $scope.comprobarval();
        },
        function(error,status,headers,config){
          $scope.status = 'Error al comentar';
          alert("Error al valorar");
          $scope.comentario = "";
          console.log(error);
        });
    }

    $scope.valoracionpubli = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/valoraciones/promediodevaloraciondeunapublicacion/'+$scope.id,
       }).success(function(data){
          $scope.valoracion = data;
          alert($scope.valoracion);
      }).error(function(){
      });
    }
    $scope.comprobarval = function (){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/valoraciones/comprobarsielusuariohavalorado/'+$scope.id+'/20',
       }).success(function(data){
          $scope.comprobar = data;
          if($scope.comprobar == 1){
            $scope.mostrar = false;
          }
      }).error(function(){
      });
    }

    $scope.mostrarpublicaciones();
    $scope.mostrarcomentario();
    $scope.comprobarval();
    if($scope.mostrar == false){
        $scope.valoracionpubli();
    }




  }]);
})();
