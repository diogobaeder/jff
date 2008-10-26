(function($){



jFF.behaviours.MaxChars = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.max = options[1];
    
    this.jField.bind('keyup.jFF', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        if (text.length > objRef.max - 1) {
            text = text.substring(0, objRef.max);
            objRef.jField.val(text);
        }
    });
    
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
