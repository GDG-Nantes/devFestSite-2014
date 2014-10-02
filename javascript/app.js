/* exported app */
//'use strict';

var DevFestApp = DevFestApp || function(){

  var nbComponentLoads = 0,
    hoursJson = {},
    speakersJson ={},
    sessionsJson = {},
    modelJson = {};

  function initPartials(){
    return $.when($.ajax("partials/contacts.html?ver="+DevFestSiteVersion),
        $.ajax("partials/content.html?ver="+DevFestSiteVersion),
        $.ajax("partials/speakers.html?ver="+DevFestSiteVersion),
        $.ajax("partials/agenda.html?ver="+DevFestSiteVersion),
        $.ajax("partials/home.html?ver="+DevFestSiteVersion),
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
    initPartials()
    .then(function callBackPartials(contacts, content, speakers, agenda, home, sponsors, presse, what_is_devfest, video_phone, pratique, hoursData, sessionsData, speakersData){
      $('#contacts').html(contacts[0]);
      $('#devfest-content').html(content[0]);
      $('#speakers').html(speakers[0]);
      $('#agenda').html(agenda[0]);
      $('#home').html(home[0]);
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
          , 'nav-agenda' // Slide Agenda
          , 'nav-speakers' // Slide Speakers
          , 'nav-speakers' // Slide Transition
          , 'nav-sponsors' // Slide Sponsor
          , 'nav-sponsors' // Slide  Transition
          , 'nav-presse' // Slide Presse
          , 'nav-pratique' // Slide Pratique
          , 'nav-contacts' // Slide Contacts
          ],
        slidesColor: ['#444' // Slide Home
          , '#444' // Slide Video Phone
          , '#DDD' // Slide What is devfest
          , '#DDD' // Slide Transition
          , '#f2f2f2' // Slide Content
          , '#444' // Slide Agenda
          , '#f2f2f2' // Slide Speakers
          , '#444' // Slide Transition
          , '#f2f2f2' // Slide Sponsors
          , '#f2f2f2' // Slide Transition
          , '#444' // Slide Presse
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

    constructModel(isMobile);
    manageSpeakers(isMobile);
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

  function constructModel(isMobile){
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
        speaker.imgXs = "img-"+keysSpeakers[indexSpeaker]+" circular-img-xs speaker-img"; 
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
        if (session.desc){
          session.descLight = truncateDesc(session.desc);
        }
        if (session.difficulty){          
          session.difficulty = ' Difficulté : <i>'+
              (session.difficulty === 101 ?  'Débutant' : session.difficulty === 202 ? 'Intermédiaire' : 'Avancé')+
              '</i>';
        }        
        if (session.lang){
          session.lang = 'assets/images/lang/'+session.lang+'.png';
        }
        if (session.all){
          session.classCol = 'col-xs-9 col-sm-8 padded border-row grey-gdg';
        }else {
          if (indexSession === 0){
            session.classCol = 'col-xs-9 col-sm-2 padded animated-expand ';
          }else{
            session.classCol = 'col-xs-9 hidden-xs col-sm-2 padded animated-expand ';
          }
          session.classCol += session.type === 'mobile' ? 'green-gdg' : session.type === 'cloud' ? 'blue-gdg' : session.type === 'web' ? 'yellow-gdg' : 'red-gdg';
        }
        session.classCol += localStorage[session.id] === 'true' ?  ' favorites' : '';
        session.classFav = localStorage[session.id] === 'true' ? 'favorites fa fa-star' : 'favorites fa fa-star-o';

        
        
        if (session.speakers && session.speakers.length > 0){
          var newSpeakersSessions = [];
          for (var indexSpeaker = 0; indexSpeaker < session.speakers.length; indexSpeaker++){
            var speaker = speakersJson[session.speakers[indexSpeaker]];
            speaker.titleConf = session.title;
            speaker.session = session;
            speaker.refSession = '#'+ (isMobile ? session.hour : session.id);
            newSpeakersSessions.push(speaker);
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

  function truncateDesc(desc){
    var changeDesc = desc;
    var limit = 100;
    if (desc.length > limit){
      if(desc[limit] === ' '){
        changeDesc = desc.substring(0,limit)+'...';
      }else{
        var lastPos = desc.indexOf(' ',limit);
        changeDesc = desc.substring(0,lastPos)+'...';
      }
    }
    return changeDesc;
  }

  function getSessionsHour(hourId){
    var sessionsArray = [];
    var sessionWeb = null;
    var sessionMobile = null;
    var sessionCloud = null;
    var sessionDiscovery = null;
    for(var indexSession = 0 ; indexSession < sessionsJson.sessions.length; indexSession++){
      var session = sessionsJson.sessions[indexSession];      
      if (session.hour === hourId){
        if (session.type === 'mobile'){
          sessionMobile = session;
        }else if (session.type === 'web'){
          sessionWeb = session;
        }else if (session.type === 'cloud'){
          sessionCloud = session;
        }else if (session.type === 'discovery'){
          sessionDiscovery = session;
        }
        sessionsArray.push(session);
      }
    }

    // Dans le cas classique, on pense à trier les sessions
    if (sessionsArray.length === 4){
      sessionsArray[0] = sessionMobile;
      sessionsArray[1] = sessionWeb;
      sessionsArray[2] = sessionCloud;
      sessionsArray[3] = sessionDiscovery;
    }

    return sessionsArray;
  }

  function expandSession(element, force){
    var parent = element.parent();
    if(element.hasClass('grey-gdg')){
      return;
    }

    if (!force && element.hasClass('col-sm-8')){
      element.removeClass('col-sm-8');
      element.addClass('col-sm-2');
      parent.children('.animated-expand:not(.expand)').removeClass('to-hide');
      element.removeClass('expand');
      //element.children('.resume').addClass('hidden-lg');
    }else {            
      element.addClass('expand');
      parent.children('.animated-expand:not(.expand)').addClass('to-hide');
      element.removeClass('col-sm-2');
      element.addClass('col-sm-8');
      //element.children('.resume').removeClass('hidden-lg');
    }
  }

  function changeTabAgenda(element){
    // On sélectionne le même item sur les 2 menus (le flottant et le principal)
    var sameInMenu = $('.'+$(element).attr('class').split(' ').join('.'));
    var parent = sameInMenu.parent();
    parent.children('.header-agenda .border').removeClass('select');
    sameInMenu.addClass('select');

    // On recherche le track sélectionné pour avoir un affichage cohérent dans le site
    var regExp = /(\w*-gdg)/;
    var trackSelected = regExp.exec($(element).attr('class'))[1];
    $('.animated-expand').addClass('hidden-xs');
    $('.animated-expand.'+trackSelected).removeClass('hidden-xs');
  }

  function manageSpeakers(isMobile){
    modelJson.onSessionSpeakerClick = function(event, scope){
        if (!isMobile){          
          var jQueryElement = $(document.querySelector('#'+scope.speaker.session.id));
          var element = jQueryElement.parent();
          expandSession(element, true);
        }else{
          var classSpeaker = scope.speaker.type === 'mobile' ? 'green-gdg' : 
                scope.speaker.type === 'web' ? 'yellow-gdg' :
                scope.speaker.type === 'cloud' ? 'blue-gdg' : 'red-gdg';
          changeTabAgenda(document.querySelector('#header-agenda-to-copy .border.'+classSpeaker));
        }
      }
    rivets.bind($('#speakers'), modelJson);
  }

  function manageAgenda(isMobile){
      $('#header-agenda-to-copy').clone().attr('id','header-agenda-copy').appendTo('body'); 
      $('#header-agenda-copy').hide(); 

             
      modelJson.onClickTitle = function(event){
        if (isMobile){
          return;
        }
        var jQueryElement = $(event.currentTarget);
        var element = jQueryElement;//.parent().parent();
        expandSession(element);
      };

      modelJson.onMouseEnter = function(event, scope){
        if (isMobile){
          return;
        }
        var jQueryElement = $(event.currentTarget);
        scope.row.desc = scope.session.desc.length > 200 ? scope.session.desc.substring(0,200)+'...' : scope.session.desc;
        scope.row.title = scope.session.title;
        jQueryElement.parent().children('.popup-resume').removeClass('to-hide');
      };

      modelJson.onMouseLeave = function(event, scope){
        if (isMobile){
          return;
        }
        var jQueryElement = $(event.currentTarget);
        jQueryElement.parent().children('.popup-resume').addClass('to-hide');
      };

      modelJson.toggleFavorites = function(event, scope){
        event.stopPropagation();
        var jQueryElement = $(event.currentTarget);
        var value = '-1';
        if (jQueryElement.hasClass('fa-star')){
          localStorage[scope.session.id] = false;
          jQueryElement.parent().removeClass('favorites');
          jQueryElement.removeClass('fa-star');
          jQueryElement.addClass('fa-star-o');
        }else{
          localStorage[scope.session.id] = true;
          jQueryElement.parent().addClass('favorites');
          jQueryElement.addClass('fa-star');
          jQueryElement.removeClass('fa-star-o');
          value = '+1';
        }
        $.ajax('http://gdg.fouchault.net/fav.php?id_session='+scope.session.id+'&value='+value).fail(function(){});
      };



      if (isMobile){
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
