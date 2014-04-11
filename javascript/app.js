/* exported app */
//'use strict';

var DevFest = DevFest || function(){

  function init(){

    if (window['Polymer']  === undefined){
      document.getElementById('unsupport-div').style['display'] = 'block';
      document.getElementById('content').style['display'] = 'none';
    }else{

      // Chargement asynchrone des composans histoire d'afficher l'animation de chargement
      loadComponent("partials/contacts.html");
      loadComponent("partials/content.html");
      loadComponent("partials/home.html");
      loadComponent("partials/sponsoring.html");
      loadComponent("partials/what_is_devfest.html");
      loadComponent("partials/when_where_how.html");
      window.addEventListener('WebComponentsReady', function() {
        document.getElementById('contain').style['display'] = 'none';
        jQuery.fn.fullpage({
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
      });     
    }
  }

  function loadComponent(filename){
    var fileref=document.createElement("link");
    fileref.setAttribute("rel", "import");    
    fileref.setAttribute("href", filename);   
    if (typeof fileref!="undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref)  
  }

  init();

  return{
    
  };
}();
