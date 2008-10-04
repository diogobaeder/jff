(function($){



jFF.behaviours.FilterChars = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.filters = options[1];
    
    this.jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        objRef.filters.forEach(function(element){
            text = text.split(element).join('');
        });
        objRef.jField.val(text);
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
