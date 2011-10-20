/**
 * XForwardedForHeader Namespace
 */
if ("undefined" == typeof(XForwardedForheader)) {
  var XForwardedForHeader = {};
};

XForwardedForHeader.observer = {
 observe: function(subject, topic, data)  
  {  
    if (topic == "http-on-modify-request") {
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
  },
  
  enabled: false,
  
  toggle: function(){
    if (this.enabled)
    {
      console.log("XForwardedForHeader: Observer enabled.");
      this.unregister();
      this.enabled = false;
    }
    else{
      console.log("XForwardedForHeader: Observer disabled.");
      this.register();
      this.enabled = true;
    }
  }
};