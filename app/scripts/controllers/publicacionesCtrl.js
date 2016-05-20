(function(){
angular.module('angularSpa')
.service('dataService', function($http) {

this.getData = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'http://localhost:8080/proyectotbd2016/publicaciones',
     }).success(function(data){
        callbackFunc(data);
    }).error(function(){
        alert("error al cargar publicaciones");
    });
 }
});
})();

(function(){
angular.module('angularSpa')
.controller('publicacionesCtrl', function($scope, dataService) {
    dataService.getData(function(dataResponse) {
        $scope.publicaciones = dataResponse;
    });
});
})();
