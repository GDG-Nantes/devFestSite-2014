/* exported app */
//'use strict';

var DevFestApp = DevFestApp || function(){

  var nbComponentLoads = 0,
    hoursJson = {},
    speakersJson ={},
    sessionsJson = {},
    modelJson = {};

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
      $.ajax("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/$-ui.min.js"),
      $.ajax("//cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"),
      $.ajax("//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"),
      $.ajax("//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.2/fastclick.min.js")
      
      );
  }*/

  function initPartials(){
    return $.when($.ajax("partials/contacts.html?ver="+DevFestSiteVersion),
        $.ajax("partials/content.html?ver="+DevFestSiteVersion),
        $.ajax("partials/speakers.html?ver="+DevFestSiteVersion),
        //$.ajax("partials/cfp.html?ver="+DevFestSiteVersion),
        $.ajax("partials/agenda.html?ver="+DevFestSiteVersion),
        $.ajax("partials/home.html?ver="+DevFestSiteVersion),
        $.ajax("partials/sponsoring.html?ver="+DevFestSiteVersion),
        $.ajax("partials/sponsors.html?ver="+DevFestSiteVersion),
        $.ajax("partials/presse.html?ver="+DevFestSiteVersion),
        $.ajax("partials/what_is_devfest.html?ver="+DevFestSiteVersion),
        $.ajax("partials/video_phone.html?ver="+DevFestSiteVersion),
        $.ajax("partials/pratique.html?ver="+DevFestSiteVersion),
        $.ajax("assets/json/hours.json?ver="+DevFestSiteVersion),
        $.ajax("assets/json/sessions.json?ver="+DevFestSiteVersion),
        $.ajax("assets/json/speakers.json?ver="+DevFestSiteVersion)
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
    .then(function callBackPartials(contacts, content, speakers, /*cfp, */agenda, home, sponsoring, sponsors, presse, what_is_devfest, video_phone, pratique, hoursData, sessionsData, speakersData){
      //console.info(result);
      //console.info('retrieve ajaxCalls');
      $('#contacts').html(contacts[0]);
      $('#devfest-content').html(content[0]);
      $('#speakers').html(speakers[0]);
      //$('#cfp').html(cfp[0]);
      $('#agenda').html(agenda[0]);
      $('#home').html(home[0]);
      $('#sponsoring').html(sponsoring[0]);
      $('#sponsors').html(sponsors[0]);
      $('#what-is-devfest').html(what_is_devfest[0]);
      $('#video-phone').html(video_phone[0]);
      $('#pratique').html(pratique[0]);
      $('#presse').html(presse[0]);
      hoursJson = hoursData[0];
      sessionsJson = sessionsData[0];
      speakersJson = speakersData[0];
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
    //$.fn.fullpage({
    $('#main-content').fullpage({
        verticalCentered: false,
        resize : false,
        anchors: ['nav-home' // Slide Home
          ,'nav-home' // Slide Video Phone
          , 'nav-what-is-devfest' // Slide What is devfest
          ,'nav-what-is-devfest' // Slide Transition
          ,'nav-devfest-content' // Slide content
          //, 'nav-cfp' // Slide CFP
          , 'nav-speakers' // Slide Transition
          , 'nav-speakers' // Slide Speakers
          , 'nav-agenda' // Slide Agenda
          , 'nav-sponsoring' // Slide Dossier
          , 'nav-sponsors' // Slide Sponsor
          , 'nav-sponsors' // Slide  Transition
          , 'nav-presse' // Slide Presse
          //, 'nav-presse' // Slide Caroussel
          , 'nav-pratique' // Slide Pratique
          , 'nav-contacts' // Slide Contacts
          ],
        slidesColor: ['#444' // Slide Home
          , '#444' // Slide Video Phone
          , '#DDD' // Slide What is devfest
          , '#DDD' // Slide Transition
          , '#f2f2f2' // Slide Content
          //, '#444' // Slide CFP
          , '#444' // Slide Transition
          , '#f2f2f2' // Slide Speakers
          , '#444' // Slide Agenda
          , '#f2f2f2' // Slide Dossier
          , '#f2f2f2' // Slide Sponsors
          , '#f2f2f2' // Slide Transition
          , '#444' // Slide Presse
          //, '#f2f2f2' // Slide Caroussel
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
            $('#menu').addClass('show');            
          }else{
            $('#menu').removeClass('show');
          }
        }
    });

    // Gestion corrective de l'affichage du menu pour les mobiles
    if (isMobile){      
      // Fermeture automatique du menu sur clic (pour la version mobile)
      $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
      });
    }

    constructModel();
    manageSpeakers();
    manageAgenda(isMobile);
    scrollManagement(isMobile);
    

    // Load Maps
    var map_canvas = document.getElementById('map_canvas');
    
    var myOptions = {
      zoom:15,
      draggable: false,
      scrollwheel : false,
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

  function constructModel(){
    // On s'occupe d'abord des speakers
    var newSpeakerArray = [];
    var keysSpeakers = Object.keys(speakersJson);
    var modulo = 0;
    var rowSpeaker = null;
    for (var indexSpeaker = 0; indexSpeaker < keysSpeakers.length; indexSpeaker++){
      var speaker = speakersJson[keysSpeakers[indexSpeaker]];
      if (speaker.show){
        if (modulo === 0){
          rowSpeaker = {'speakers':[]};
          newSpeakerArray.push(rowSpeaker);
        }
        speaker.id = "speaker_"+keysSpeakers[indexSpeaker]; 
        speaker.href = "#speaker_"+keysSpeakers[indexSpeaker]; 
        speaker.img = "img-"+keysSpeakers[indexSpeaker]+" circular-img-sm"; 
        speaker.imgXs = "img-"+keysSpeakers[indexSpeaker]+" circular-img-xs"; 
        speaker.colorText = speaker.type === 'mobile' ? 'text-success' : 
              (speaker.type === 'cloud' ? 'text-primary' :
                 (speaker.type === 'web' ? 'text-warning' : 'text-danger'));
        if (speaker.socials){
          for (var indexSocials = 0; indexSocials < speaker.socials.length; indexSocials++){
            var socialLink = speaker.socials[indexSocials];
            socialLink.classSocial = "social_"+(indexSocials+1)+"_"+speaker.socials.length;
            socialLink.classImg = "fa fa-2x fa-"+socialLink.type;
          }
        }
        rowSpeaker['speakers'].push(speaker);
        modulo = (modulo + 1) % 3;
      }
    }

    // On s'occupe ensuite de l'agenda
    var keysHours = Object.keys(hoursJson);    
    var newAgendaArray = [];
    var rowAgenda = null;
    for (var indexHours = 0; indexHours < keysHours.length; indexHours++){
      var hourJson = hoursJson[keysHours[indexHours]];
      var sessionsArray = getSessionsHour(keysHours[indexHours]);
      rowAgenda = {'hour' : hourJson,
              'sessions' : [],
              'show' : true};
      newAgendaArray.push(rowAgenda);
      for (var indexSession = 0; indexSession < sessionsArray.length; indexSession++){
        var session = sessionsArray[indexSession];
        rowAgenda.show = rowAgenda.show && !session.hide;
        rowAgenda.classRow = rowAgenda.show ? 'row' : 'row hide';
        rowAgenda.sessions.push(session);
        session.classTitle = 'title-conf '+(session.title.length > 40 ? 'to-long' : '');
        if (session.difficulty){          
          session.difficulty = ' - Difficulté : <i>'+
              (session.difficulty === 101 ?  'Débutants' : session.difficulty === 202 ? 'Moyens' : 'Avancés')+
              '</i>';
        }        
        if (session.lang){
          session.lang = 'assets/images/lang/'+session.lang+'.png';
        }
        if (session.all){
          session.classCol = 'col-xs-9 col-lg-8 padded border-row grey-gdg';
        }else {
          if (indexSession === 0){
            session.classCol = 'col-xs-9 col-lg-2 padded animated-expand ';
          }else{
            session.classCol = 'col-xs-9 hidden-xs col-lg-2 padded animated-expand ';
          }
          session.classCol += session.type === 'mobile' ? 'green-gdg' : session.type === 'cloud' ? 'blue-gdg' : session.type === 'web' ? 'yellow-gdg' : 'red-gdg';
        }

        
        
        if (session.speakers && session.speakers.length > 0){
          var newSpeakersSessions = [];
          for (var indexSpeaker = 0; indexSpeaker < session.speakers.length; indexSpeaker++){
            newSpeakersSessions.push(speakersJson[session.speakers[indexSpeaker]]);
          }
          session.speakers = newSpeakersSessions;
        }else{
          session.speakers = false;
        }
      }
    }

    modelJson['speakerRow'] = newSpeakerArray;
    modelJson['agendaRow'] = newAgendaArray;
  }

  function getSessionsHour(hourId){
    var sessionsArray = [];
    for(var indexSession = 0 ; indexSession < sessionsJson.sessions.length; indexSession++){
      var session = sessionsJson.sessions[indexSession];
      if (session.hour === hourId){
        sessionsArray.push(session);
      }
    }
    return sessionsArray;
  }

  function manageSpeakers(){
    rivets.bind($('#speakers'), modelJson);
  }

  function manageAgenda(isMobile){
      $('#header-agenda-to-copy').clone().attr('id','header-agenda-copy').appendTo('body'); 
      $('#header-agenda-copy').hide(); 

      if (!isMobile){        
        modelJson.onClickTitle = function(event){
          var jQueryElement = $(event.target);
          var element = jQueryElement.parent().parent();
          var parent = jQueryElement.parent().parent().parent();
          if(element.hasClass('grey-gdg')){
            return;
          }

          if (element.hasClass('col-lg-8')){
            element.removeClass('col-lg-8');
            element.addClass('col-lg-2');
            parent.children('.animated-expand:not(.expand)').removeClass('to-hide');
            element.removeClass('expand');
            element.children('.resume').addClass('hidden-lg');
          }else {            
            element.addClass('expand');
            parent.children('.animated-expand:not(.expand)').addClass('to-hide');
            element.removeClass('col-lg-2');
            element.addClass('col-lg-8');
            element.children('.resume').removeClass('hidden-lg');
          }
        };
        $('.animated-expand .title-conf').on('click',function animateConfClick(){
          var element = $(this).parent().parent();
          var parent = $(this).parent().parent().parent();
          if (element.hasClass('col-lg-8')){
            element.removeClass('col-lg-8');
            element.addClass('col-lg-2');
            parent.children('.animated-expand:not(.expand)').removeClass('to-hide');
            element.removeClass('expand');
            element.children('.resume').addClass('hidden-lg');
          }else{            
            element.addClass('expand');
            parent.children('.animated-expand:not(.expand)').addClass('to-hide');
            element.removeClass('col-lg-2');
            element.addClass('col-lg-8');
            element.children('.resume').removeClass('hidden-lg');
          }
        });

        $('#agenda a').on('click', function linkCancel(event){
          //event.preventDefault();
        });
      }else{
        $('.header-agenda .border').on('click',function animateConfClick(){
          // On sélectionne le même item sur les 2 menus (le flottant et le principal)
          var sameInMenu = $('.'+$(this).attr('class').split(' ').join('.'));
          var parent = sameInMenu.parent();
          parent.children('.header-agenda .border').removeClass('select');
          sameInMenu.addClass('select');

          // On recherche le track sélectionné pour avoir un affichage cohérent dans le site
          var regExp = /(\w*-gdg)/;
          var trackSelected = regExp.exec($(this).attr('class'))[1];
          $('.animated-expand').addClass('hidden-xs');
          $('.animated-expand.'+trackSelected).removeClass('hidden-xs');
          
        });
      }

      rivets.bind($('#agenda'), modelJson);
      // Mapping de Rivet.js
      /*rivets.bind($('#agenda'), {
        test : {data1 : 'data1Value', data2 : 'data2Value'},
        test2 : 'test2Value'
      });*/
  }  

  

  function scrollManagement(isMobile){
    var agendaContainer = document.getElementById('agenda-container');
    window.onscroll = function scrollCallBack(){
      if (isMobile){        
        if (document.getElementById('video-phone').getBoundingClientRect().bottom < 0){
          $('#menu').addClass('show');            
        }else{
          $('#menu').removeClass('show');
        }
      }

      // Gestion du menu fixed pour l'agenda
      $('#header-agenda-to-copy').css({'opacity': agendaContainer.getBoundingClientRect().top < 60 ? 0 : 1});
      if (agendaContainer.getBoundingClientRect().bottom > 60 && agendaContainer.getBoundingClientRect().top < 60){
        $('#header-agenda-copy').show();
      }else{
        $('#header-agenda-copy').hide();
      }
    }
  }

  //$(document).ready(init);

  return{
    init:init
  };
}();
