(function($){



/* Original functionality idea by Juliano Affonso */
jFF.behaviours.CheckMonitor = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.checks = this.jField.filter(':checkbox').add(this.jField.find(':checkbox'));
    
    this.listeners = new Array();
    this.checked = null;
    this.trackerContainer = null;
    this.checkedContentCallback = null;
    this.uncheckerCallback = null;
    this.trackersWrapper = null;
    
    this.checks.bind('click.jFF', function(event){
        if (!objRef.active) return;
        
        objRef.notify();
    });
    
    this.reset = function() {
        objRef.checked = objRef.checks.filter(':checked');
        
        return objRef;
    };
    
    this.none = function() {
        objRef.checks.each(function(){
            this.checked = false;
        });
        objRef.notify();
        
        return objRef;
    };
    
    this.all = function() {
        objRef.checks.each(function(){
            this.checked = true;
        });
        objRef.notify();
        
        return objRef;
    };
    
    this.invert = function() {
        objRef.checks.each(function(){
            this.checked = !this.checked;
        });
        objRef.notify();
        
        return objRef;
    };
    
    this.notify = function() {
        if (!objRef.active) return;
        objRef.reset();
        objRef.listeners.forEach(function(listener){
            listener(objRef.checked);
        });
        
        if (objRef.checkedContentCallback) {
            objRef.trackerContainer.html('');
            objRef.checked.each(function(){
                var currentChecked = $(this);
                var tracker = $(objRef.checkedContentCallback(currentChecked));
                objRef.trackerContainer.append(tracker);
                var unchecker = objRef.uncheckerCallback(tracker);
                unchecker.bind('click.jFF', function(event){
                    event.preventDefault();
                    currentChecked.attr('checked', false);
                    objRef.notify();
                });
            });
            if (objRef.trackersWrapper) {
                objRef.trackerContainer.contents().wrapAll(objRef.trackersWrapper);
            }
        }
        
        return objRef;
    };
    
    this.listener = function(listener) {
        objRef.listeners.push(listener);
        
        return objRef;
    };
    
    this.tracker = function(jContainer, checkedContentCallback, uncheckerCallback, trackersWrapper) {
        objRef.checkedContentCallback = checkedContentCallback;
        objRef.uncheckerCallback = uncheckerCallback;
        objRef.trackerContainer = jContainer;
        objRef.trackersWrapper = trackersWrapper;
        
        return objRef;
    };
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};



})(jQuery);
