'use strict';

// modules
const {Cc,Ci} = require("chrome");
const prefs = require("sdk/simple-prefs");

// fields
var httpRequestObserver;

exports.main = function(options,callbacks) {
		
		// Get IP address from Addon Preferences
		var ip = prefs.prefs["ip"];

		// Update ip address when prefrences are updated
	  prefs.on("ip", function (prefName) {	
				ip = prefs.prefs["ip"];
		});

    // Create observer 
    httpRequestObserver =  
    {  
      observe: function(subject, topic, data)  
      {  
        if (topic == "http-on-modify-request") {
            var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);  
            httpChannel.setRequestHeader("X-Forwarded-For", ip, false);  
        }  
      }, 
      
      register: function()  
      { 
        var observerService = Cc["@mozilla.org/observer-service;1"]  
                .getService(Ci.nsIObserverService);  
        observerService.addObserver(this, "http-on-modify-request", false);  
      },  
      
      unregister: function()  
      {
        var observerService = Cc["@mozilla.org/observer-service;1"]  
                .getService(Ci.nsIObserverService);  
        observerService.removeObserver(this, "http-on-modify-request");  
      }  
    };

    //register observer
    httpRequestObserver.register();
};

exports.onUnload = function(reason) {

	httpRequestObserver.unregister();
};
