(function($){



jFF.behaviours.FilterChars = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.filters = options[1];
    
    this.jField.bind('keyup.jFF', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        if (objRef.filters.forEach)
            var filtered = text.filtered.apply(text, objRef.filters);
        else
            var filtered = text.filtered(objRef.filters);
        
        objRef.jField.val(filtered);
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
