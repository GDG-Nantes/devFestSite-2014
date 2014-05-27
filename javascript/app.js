/* exported app */
//'use strict';

var DevFestApp = DevFestApp || function(){

  var nbComponentLoads = 0;

  function init(){

    // Chargement asynchrone des composants le temps de l'animation de chargement
    loadComponent("contacts", "partials/contacts.html");
    loadComponent("devfest-content", "partials/content.html");
    loadComponent("home", "partials/home.html");
    loadComponent("sponsoring", "partials/sponsoring.html");
    loadComponent("sponsors", "partials/sponsors.html");
    loadComponent("what-is-devfest", "partials/what_is_devfest.html");

  }

  function loadComponent(id, filename){
    $('#'+id).load(filename, function(){
      nbComponentLoads++;
      if (nbComponentLoads == 6){
        finishLoad();
      }
    });
  }

  function finishLoad() {
        
    // Load FullPage
    document.getElementById('contain').style['display'] = 'none';
    jQuery.fn.fullpage({
        verticalCentered: false,
        resize : false,
        slidesColor: ['#444', '#DDD', '#f2f2f2', '#f2f2f2', '#444', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#444'],
        autoScrolling: false,
        scrollOverflow: false,
        css3: true,
        keyboardScrolling: true,
        animateAnchor: false
    });
    

    // Load Maps
    var map_canvas = document.getElementById('map_canvas');
    
    var myOptions = {
      zoom:15,
      draggable: false,
      center:new google.maps.LatLng(47.2139677,-1.5430134000000635),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(map_canvas, myOptions);
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(47.2139677, -1.5430134000000635)
    }); 

    var infowindow = new google.maps.InfoWindow({content:"<span style='height:auto !important; display:block; white-space:nowrap; overflow:hidden !important;'><strong style='font-weight:400;'>DevFest Nantes 2014</strong><br>Cit&eacute; de congr&egrave;s,  Quai Ferdinand Favre<br> Nantes</span>" }); 
    google.maps.event.addListener(marker, "click", function(){infowindow.open(map,marker);});
    infowindow.open(map,marker);

  }  

  init();

  return{
    
  };
}();
