(function($){



jFF.behaviours.CharMonitor = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.inputs = this.jField.filter(':text,textarea,:password,:hidden').add(this.jField.find(':text,textarea,:password,:hidden'));
    
    this.listeners = new Array();
    this.chars = null;
    
    this.inputs.bind('keyup.jFF', function(event){
        if (!objRef.active) return;
        
        objRef.notify();
    });
    
    this.reset = function() {
        objRef.chars = '';
		objRef.inputs.each(function(){
			objRef.chars += $(this).val();
		});
        
        return objRef;
    };
    
    this.notify = function() {
        if (!objRef.active) return;
        objRef.reset();
        objRef.listeners.forEach(function(listener){
            listener(objRef.chars);
        });
        
        return objRef;
    };
    
    this.listener = function(listener) {
        objRef.listeners.push(listener);
        
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
