/* exported app */
//'use strict';

var DevFest = DevFest || function(){

  function init(){

    if (window['Polymer']  === undefined){

      document.getElementById('unsupport-div').style['display'] = 'block';
      document.getElementById('content').style['display'] = 'none';

    } else {

      // Chargement asynchrone des composants le temps de l'animation de chargement
      loadComponent("partials/contacts.html");
      loadComponent("partials/content.html");
      loadComponent("partials/home.html");
      loadComponent("partials/sponsoring.html");
      loadComponent("partials/sponsors.html");
      loadComponent("partials/what_is_devfest.html");

      window.addEventListener('WebComponentsReady', function() {
        
        // Load FullPage
        document.getElementById('contain').style['display'] = 'none';
          jQuery.fn.fullpage({
            verticalCentered: false,
            resize : true,
            slidesColor: ['#444', '#DDD', '#f2f2f2', '#f2f2f2', '#444', '#f2f2f2', '#f2f2f2', '#444'],
            anchors: ['#home', '#what-is-devfest', 't1', '#devfest-content', 't2', '#sponsoring', '#sponsors', 't3', '#contacts'],
            autoScrolling: false,
            scrollOverflow: false,
            css3: true,
            animateAnchor: true,
            keyboardScrolling: true,
            touchSensitivity: 15,
            animateAnchor: false
        });


        // Load Maps
        var map_canvas = document.getElementById('map_canvas');
        
        var myOptions = {
          zoom:15,
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
