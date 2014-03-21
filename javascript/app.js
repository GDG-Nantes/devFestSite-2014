/* exported app */
'use strict';

var app = angular.module('devfest', ['ngRoute', 'ngAnimate', 'devfest.main']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/main',       { controller: 'DevFestCtrl',    templateUrl: 'partials/main.html', direction:'lrt' })
    .otherwise({ redirectTo:  '/main' })
    ;
}]);

/**
 * Un module fonctionnel...
 */
var devfest = angular.module('devfest.main', [])
.run(['$rootScope', '$window', function($rootScope,$window){
    
  // publish current transition direction on rootScope
  $rootScope.direction = '';
  // listen change start events
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.direction){
    	$rootScope.direction = next.direction;
    }else{
    	$rootScope.direction = 'rtl';
    	
    }

    // back
    $rootScope.back = function() {
      $window.history.back();
    }
  });
}]);


/*
* Controler
*/
devfest.controller('DevFestCtrl',	
	['$rootScope', '$scope', '$http', '$location' ,
	function($rootScope, $scope, $http, $location) {




}]);