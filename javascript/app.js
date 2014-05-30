/* exported app */
//'use strict';

var DevFestApp = DevFestApp || function(){

  var nbComponentLoads = 0;

  function initImages(){
    return $.when($.ajax("assets/images/logo.png"),
      $.ajax("assets/images/gdg_stats.png"),
      $.ajax("assets/images/chevron_small.png"),
      $.ajax("assets/images/sponsors/google.png"),
      $.ajax("assets/images/sponsors/logo-asi.png"),
      $.ajax("assets/images/sponsors/logo-restlet.png"),
      $.ajax("assets/images/sponsors/mozilla.png"),
      $.ajax("assets/images/sponsors/sii.png"),
      $.ajax("assets/images/sponsors/sqli.png"),
      $.ajax("assets/images/sponsors/zenika.png"),
      $.ajax("assets/images/2013/angular.png"),
      $.ajax("assets/images/2013/cyril.png"),
      $.ajax("assets/images/2013/glass_200.png"),
      $.ajax("assets/images/2013/hall_200.png"),
      $.ajax("assets/images/2013/oculus_200.png"),
      $.ajax("assets/images/2013/team.png")
      );
  }

  function initPartials(){
    return $.when($.ajax("partials/contacts.html"),
        $.ajax("partials/content.html"),
        $.ajax("partials/home.html"),
        $.ajax("partials/sponsoring.html"),
        $.ajax("partials/sponsors.html"),
        $.ajax("partials/what_is_devfest.html"),
        $.ajax("partials/pratique.html")
      );
  }

  function init(){

    // Chargement asynchrone des composants le temps de l'animation de chargement
    initImages()
    .then(function(){
      return initPartials();
    })
    .then(function(contacts, content, home, sponsoring, sponsors, what_is_devfest, pratique){
      //console.info(result);
      console.info('retrieve ajaxCalls');
      $('#contacts').html(contacts[0]);
      $('#devfest-content').html(content[0]);
      $('#home').html(home[0]);
      $('#sponsoring').html(sponsoring[0]);
      $('#sponsors').html(sponsors[0]);
      $('#what-is-devfest').html(what_is_devfest[0]);
      $('#pratique').html(pratique[0]);
      finishLoad();
    })
    .fail(function(error){
      console.error(error);
    });    
  }

  function finishLoad() {
        
    // Load FullPage
    document.getElementById('contain').style['display'] = 'none';
    document.getElementById('main-content').style['display'] = '';
    jQuery.fn.fullpage({
        verticalCentered: false,
        resize : false,
        slidesColor: ['#444', '#DDD', '#f2f2f2', '#f2f2f2', '#444', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#444'],
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
