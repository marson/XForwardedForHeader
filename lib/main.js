exports.main = function() {

     // access to XPCOM
    var {Cc,Ci} = require("chrome")
    // Create observer 
    var httpRequestObserver =  
    {  
      observe: function(subject, topic, data)  
      {  
        if (topic == "http-on-modify-request") {
            //console.log('http-on-modify-request event');
            var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);  
            httpChannel.setRequestHeader("X-Forwarded-For", "8.8.8.8", false);  
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
