(function($){



/* Original functionality idea by Juliano Affonso */
jFF.behaviours.SelectMonitor = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.selects = this.jField.filter('option').add(this.jField.find('option'));
    
    this.listeners = new Array();
    this.selected = null;
    this.trackerContainer = null;
    this.selectedContentCallback = null;
    this.unselecterCallback = null;
    this.trackersWrapper = null;
    
    this.selects.bind('click', function(event){
        if (!objRef.active) return;
        
        objRef.notify();
    });
    
    this.reset = function() {
        objRef.selected = objRef.selects.filter(':selected');
        
        return objRef;
    };
    
    this.none = function() {
        objRef.selects.each(function(){
            this.selected = false;
        });
        objRef.notify();
        
        return objRef;
    };
    
    this.all = function() {
        objRef.selects.each(function(){
            this.selected = true;
        });
        objRef.notify();
        
        return objRef;
    };
    
    this.invert = function() {
        objRef.selects.each(function(){
            this.selected = !this.selected;
        });
        objRef.notify();
        
        return objRef;
    };
    
    this.notify = function() {
        if (!objRef.active) return;
        objRef.reset();
        objRef.listeners.forEach(function(listener){
            listener(objRef.selected);
        });
        
        if (objRef.selectedContentCallback) {
            objRef.trackerContainer.html('');
            objRef.selected.each(function(){
                var currentSelected = $(this);
                var tracker = $(objRef.selectedContentCallback(currentSelected));
                objRef.trackerContainer.append(tracker);
                var unselecter = objRef.unselecterCallback(tracker);
                unselecter.click(function(event){
                    event.preventDefault();
                    currentSelected.attr('selected', false);
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
    
    this.tracker = function(jContainer, selectedContentCallback, unselecterCallback, trackersWrapper) {
        objRef.selectedContentCallback = selectedContentCallback;
        objRef.unselecterCallback = unselecterCallback;
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
