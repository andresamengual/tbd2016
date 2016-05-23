(function(){
    angular.module('angularSpa')
    .controller('editarcomentarioCtrl',  ['$scope', '$routeParams', '$http',  '$location',
      function($scope, $routeParams, $http, $location){
        $scope.id = $routeParams.id;
        $http({
            method: 'GET',
            url: 'http://localhost:8080/proyectotbd2016/comentarios/buscarcomentarioporid/'+$scope.id,
         }).success(function(data){
           $scope.textocomentario = data.textocomentario;
           $scope.publica = data.publicacion;
        }).error(function(){
            alert("error al cargar el comentario");
        });
        $scope.actualizar = function (num){
          $http({
              method: 'PUT',
              url: 'http://localhost:8080/proyectotbd2016/comentarios/editarcomentario/'+$scope.id,
              data: {
                "usuario":{"idUsuario":"1"},
                "publicacion":{"idPublicacion":num} ,
                 "textocomentario":$scope.textocomentario,
              },
              headers: {'Content-Type': 'application/json'}
            }).then(function(data,status,headers,config){
                $scope.status = 'Editado Correctamente';
                $location.path("/idpubli/"+num);
            },
            function(error,status,headers,config){
              $scope.status = 'Error al editar';
              alert("Error al editar");
              console.log(error);
            });
        }


    }]);
})();
