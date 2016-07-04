(function(){
angular.module('angularSpa')
.controller('perfilCtrl', ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {

    $scope.id = 3;
    $scope.valor = "inicio";
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
    $scope.agregar = function (){
      var selects = document.getElementById("myselect");
      var selectedText = selects.options[selects.selectedIndex].text;// gives u value2
      //alert(selectedText);
      $scope.buscar(selectedText);
    }

    $scope.buscar = function (selectedText){
      $http({
          method: 'GET',
          url: 'http://localhost:8080/proyectotbd2016/tags/buscarpornombreeltag/'+selectedText,
       }).success(function(data){
          var num = data;
          $scope.modificar(num);
      }).error(function(){
      });
    }
    $scope.modificar = function (num){
      $http({
          method: 'PUT',
          url: 'http://localhost:8080/proyectotbd2016/preferencias/editarpreferencia/'+$scope.id,
          data: {
            "usuario":{"idUsuario":$scope.id},
            "tag":{"idTag":num}
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            //alert("editado");
        },
        function(error,status,headers,config){
          $scope.status = 'Error al editar';
          alert("Error al editar");
          console.log(error);
        });
    }


    $scope.mostrartags();


  }]);
})();
