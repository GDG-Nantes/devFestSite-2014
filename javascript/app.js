/* exported app */
//'use strict';

var DevFest = DevFest || function(){

  function init(){

    if (window['Polymer']  === undefined){
      document.getElementById('unsupport-div').style['display'] = 'block';
      document.getElementById('content').style['display'] = 'none';
    }else{
      jQuery(document).ready(function() {
        setTimeout(function() {
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
        }, 1000);
        });
    }
  }

  init();

  return{
    
  };
}();
