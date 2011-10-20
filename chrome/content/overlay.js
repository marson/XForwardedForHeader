/**
 * Add window eventListener for 
 */
window.addEventListener("load", function() {XForwardedForHeader.overlay.init();},false);


/**
 * XForwardedForHeader Namespace
 */
if ("undefined" == typeof(XForwardedForheader)) {
  var XForwardedForHeader = {};
};

XForwardedForHeader.overlay = {
    init: function (){
      console.log("XForwardedForHeader: Init function running.");
      //TODO: add button on first run
    },
    
    toggle: function(){
      XForwardedForHeader.observer.toggle();
    }
};