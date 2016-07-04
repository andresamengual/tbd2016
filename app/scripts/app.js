(function(){

    angular.module('angularSpa', [
    'ngRoute', 'froala', 'ngSanitize'
    ])
    .value('froalaConfig', {
    toolbarInline: false,
    language: 'es'
    })

    .config(function($routeProvider){
        $routeProvider
        .when('/home', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
        .when('/publicaciones', {
            templateUrl: 'views/publicaciones.html',
            controller: 'publicacionesCtrl'
          })
          .when('/perfil', {
              templateUrl: 'views/perfil.html',
              controller: 'perfilCtrl'
            })
          .when('/idpubli/:id', {
              templateUrl: 'views/idpubli.html',
              controller: 'idpubliCtrl'
          })
          .when('/nuevaPublicacion', {
              templateUrl: 'views/nuevaPublicacion.html',
              controller: 'nuevaPublicacionCtrl'
          })
          .when('/editarpubli/:id', {
              templateUrl: 'views/editarpubli.html',
              controller: 'editarpubliCtrl'
          })
          .when('/editarcomentario/:id', {
              templateUrl: 'views/editarcomentario.html',
              controller: 'editarcomentarioCtrl'
          })
          .when('/nuevoTag', {
              templateUrl: 'views/nuevoTag.html',
              controller: 'nuevoTagCtrl'
          })
        .otherwise({
            redirectTo: '/home'
          });
    });

})();
