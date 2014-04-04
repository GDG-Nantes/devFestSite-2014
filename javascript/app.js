/* exported app */
'use strict';

var app = angular.module('devfest', [/*'ngRoute', */'ngAnimate', 'devfest.main']);

app.config([/*'$routeProvider', */'$locationProvider', function(/*$routeProvider, */$locationProvider) {
/*    $routeProvider
    .when('/',       { controller: 'DevFestCtrl',    templateUrl: 'partials/main.html', direction:'lrt' })
    .otherwise({ redirectTo:  '/' })
    ;*/
    $locationProvider.html5Mode(true);
}]);


/**
 * Un module fonctionnel...
 */
var devfest = angular.module('devfest.main', []).run([/*'$rootScope', '$window', */function(/*$rootScope,$window*/) {
    
  // publish current transition direction on rootScope
  //$rootScope.direction = '';

  // listen change start events
  /*$rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.direction){
      $rootScope.direction = next.direction;
    }else{
      $rootScope.direction = 'rtl';
    }

    // back
    $rootScope.back = function() {
      $window.history.back();
    };

  });*/
}]);


/*
* Controler
*/
devfest.controller('DevFestCtrl',	['$rootScope', '$scope', '$http', /*'$location', */function($rootScope, $scope, $http/*, $location*/) {

  /*var contentLoad = 0;
  $scope.$on('$includeContentLoaded', function(evtName, args){
    contentLoad++;
    if (contentLoad === 6 ){
      
    }
    console.log(contentLoad);
    console.log(evtName);
    console.log(args);
  });
/*
  setTimeout(function() {
    $.fn.fullpage({
        verticalCentered: true,
            resize : false,
            slidesColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2'],
            anchors: ['slide01', 'slide02', 'slide03', 'slide04', 'slide05', 'slide06', 'slide07'],
            scrollingSpeed: 700,
            easing: 'easeInQuart',
            menu: true,
            navigation: true,
            navigationPosition: 'top',
            slidesNavigation: false,
            slidesNavPosition: 'bottom',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            autoScrolling: true,
            scrollOverflow: false,
            css3: false,
            keyboardScrolling: true,
            touchSensitivity: 15,
            animateAnchor: true
      });
  }, 1000);*/

}]);