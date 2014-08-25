/* exported app */
//'use strict';

var DevFestApp = DevFestApp || function(){

  var nbComponentLoads = 0;

  /*function initImages(){
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
      $.ajax("assets/images/2013/photo_cfp_ludovic.jpg"),
      $.ajax("assets/images/speakers/dgageot.jpg"),
      $.ajax("assets/images/speakers/fharper.jpg"),
      $.ajax("assets/images/speakers/cmottier.png"),
      $.ajax("assets/images/speakers/mgorner.png"),
      $.ajax("assets/images/speakers/jmouton.png"),
      $.ajax("assets/images/2013/team.png")
      
      );
  }
    
  function initCDN(){
    return $.when($.ajax("//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"),
      $.ajax("//maxcdn.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap-theme.min.css"),
      $.ajax("//maxcdn.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"),
      $.ajax("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"),
      $.ajax("//cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"),
      $.ajax("//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"),
      $.ajax("//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.2/fastclick.min.js")
      
      );
  }*/

  function initPartials(){
    return $.when($.ajax("partials/contacts.html?ver="+DevFestSiteVersion),
        $.ajax("partials/content.html?ver="+DevFestSiteVersion),
        $.ajax("partials/speakers.html?ver="+DevFestSiteVersion),
        $.ajax("partials/cfp.html?ver="+DevFestSiteVersion),
        $.ajax("partials/agenda.html?ver="+DevFestSiteVersion),
        $.ajax("partials/home.html?ver="+DevFestSiteVersion),
        $.ajax("partials/sponsoring.html?ver="+DevFestSiteVersion),
        $.ajax("partials/sponsors.html?ver="+DevFestSiteVersion),
        $.ajax("partials/presse.html?ver="+DevFestSiteVersion),
        $.ajax("partials/what_is_devfest.html?ver="+DevFestSiteVersion),
        $.ajax("partials/video_phone.html?ver="+DevFestSiteVersion),
        $.ajax("partials/pratique.html?ver="+DevFestSiteVersion)
      );
  }

  function init(){

    // Chargement asynchrone des composants le temps de l'animation de chargement
    // initImages()
    // .then(function(){
      // return initCDN();
    // })
    // .then(function(){
      // return initPartials();
    // })  
    initPartials()
    .then(function callBackPartials(contacts, content, speakers, cfp, agenda, home, sponsoring, sponsors, presse, what_is_devfest, video_phone, pratique){
      //console.info(result);
      //console.info('retrieve ajaxCalls');
      $('#contacts').html(contacts[0]);
      $('#devfest-content').html(content[0]);
      $('#speakers').html(speakers[0]);
      $('#cfp').html(cfp[0]);
      $('#agenda').html(agenda[0]);
      $('#home').html(home[0]);
      $('#sponsoring').html(sponsoring[0]);
      $('#sponsors').html(sponsors[0]);
      $('#what-is-devfest').html(what_is_devfest[0]);
      $('#video-phone').html(video_phone[0]);
      $('#pratique').html(pratique[0]);
      //$('#presse').html(presse[0]);
      finishLoad();
    })
    .fail(function(error){
      document.getElementById('contain').style['display'] = 'none';
      document.getElementById('error-div').style['display'] = '';
      console.error(error);
    });    
  }

  function finishLoad() {

    var isMobile = document.querySelector('.navbar-toggle').getBoundingClientRect().width > 0;
        
    // Load FullPage
    document.getElementById('contain').style['display'] = 'none';
    document.getElementById('main-content').style['display'] = '';
    //jQuery.fn.fullpage({
    jQuery('#main-content').fullpage({
        verticalCentered: false,
        resize : false,
        anchors: ['nav-home' // Slide Home
          ,'nav-home' // Slide Video Phone
          , 'nav-what-is-devfest' // Slide What is devfest
          ,'nav-what-is-devfest' // Slide Transition
          ,'nav-devfest-content' // Slide content
          , 'nav-cfp' // Slide CFP
          , 'nav-speakers' // Slide Speakers
          , 'nav-speakers' // Slide Transition
          , 'nav-agenda' // Slide Agenda
          , 'nav-sponsoring' // Slide Dossier
          , 'nav-sponsors' // Slide Sponsor
          , 'nav-sponsors' // Slide Transition
          , 'nav-sponsors' // Slide Caroussel
          , 'nav-pratique' // Slide Pratique
          , 'nav-contacts' // Slide Contacts
          ],
        slidesColor: ['#444' // Slide Home
          , '#444' // Slide Video Phone
          , '#DDD' // Slide What is devfest
          , '#DDD' // Slide Transition
          , '#f2f2f2' // Slide Content
          , '#444' // Slide CFP
          , '#f2f2f2' // Slide Speakers
          , '#444' // Slide Transition
          , '#444' // Slide Agenda
          , '#f2f2f2' // Slide Dossier
          , '#f2f2f2' // Slide Sponsors
          , '#f2f2f2' // Slide Transition
          , '#f2f2f2' // Slide Caroussel
          , '#f2f2f2' // Slide Pratique
          ,  '#444' // Slide Contacts
          ],
        autoScrolling: false, // A passer à true eventuellement
        scrollOverflow: false,
        css3: true,
        keyboardScrolling: true,
        animateAnchor: true,
        menu:'#menu',
        afterLoad: function(anchorLink, index){
          if (isMobile)
            return;

          //console.debug("AfterLoad : "+anchorLink+" | "+index);
          // On affiche le menu que si on est au slide a propos
          if (index>2){
            jQuery('#menu').addClass('show');            
          }else{
            jQuery('#menu').removeClass('show');
          }
        }
    });

    // Gestion corrective de l'affichage du menu pour les mobiles
    if (isMobile){      
      // Fermeture automatique du menu sur clic (pour la version mobile)
      jQuery('.navbar-collapse a').click(function(){
        jQuery(".navbar-collapse").collapse('hide');
      });
    }


    manageAgendaHeader(isMobile);
    scrollManagement(isMobile);
    

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

  function manageAgendaHeader(isMobile){
      jQuery('#header-agenda-to-copy').clone().attr('id','header-agenda-copy').appendTo('body'); 
      jQuery('#header-agenda-copy').hide(); 

      if (!isMobile){        
        jQuery('.animated-expand').on('click',function animateConfClick(){
          var parent = $(this).parent();
          if ($(this).hasClass('col-lg-8')){
            $(this).removeClass('col-lg-8');
            $(this).addClass('col-lg-2');
            parent.children('.animated-expand:not(.expand)').removeClass('to-hide');
            $(this).removeClass('expand');
            $(this).children('.resume').addClass('hidden-lg');
          }else{            
            $(this).addClass('expand');
            parent.children('.animated-expand:not(.expand)').addClass('to-hide');
            $(this).removeClass('col-lg-2');
            $(this).addClass('col-lg-8');
            $(this).children('.resume').removeClass('hidden-lg');
          }
        });
      }
  }  

  function scrollManagement(isMobile){
    var agendaContainer = document.getElementById('agenda-container');
    window.onscroll = function scrollCallBack(){
      if (isMobile){        
        if (document.getElementById('video-phone').getBoundingClientRect().bottom < 0){
          jQuery('#menu').addClass('show');            
        }else{
          jQuery('#menu').removeClass('show');
        }
      }

      // Gestion du menu fixed pour l'agenda
      jQuery('#header-agenda-to-copy').css({'opacity': agendaContainer.getBoundingClientRect().top < 60 ? 0 : 1});
      if (agendaContainer.getBoundingClientRect().bottom > 60 && agendaContainer.getBoundingClientRect().top < 60){
        jQuery('#header-agenda-copy').show();
      }else{
        jQuery('#header-agenda-copy').hide();
      }
    }
  }

  //$(document).ready(init);

  return{
    init:init
  };
}();
