(function(){
angular.module('angularSpa')
.controller('nuevoTagCtrl', ['$scope', '$routeParams', '$http', '$location', '$timeout', '$q', '$log',
  function($scope, $routeParams, $http, $location, $timeout, $q, $log) {

    $scope.tagid2 = 0;
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
          var repos = data;
          console.log($scope.tags);
      }).error(function(){
          alert("error al cargar tags");
      });
    }
    $scope.eliminar = function (tagid2){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/proyectotbd2016/tags/borrartag/'+tagid2,
          data: {
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function(data,status,headers,config){
            $scope.status = 'Agregado Correctamente';
            $scope.mostrartags();
        },
        function(error,status,headers,config){
          $scope.status = 'Error al agregar';
          alert("Error al eliminar");
          alert(tagid2);
          console.log(error);
        });
    }




    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    function querySearch (query) {
      var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
      var repos = [
        {
          'name'      : 'PARO',
        },
        {
          'name'      : 'TOMA',
        },
        {
          'name'      : 'ESTUDIANTES',
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };
    }















    $scope.mostrartags();


  }]);
})();
