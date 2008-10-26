(function($){



jFF.behaviours.FilteredReplicator = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.jDestination = options[1];
    this.filters = options[2];
    
    this.jField.bind('keyup.jFF', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        if (objRef.filters.forEach)
            var filtered = text.filtered.apply(text, objRef.filters);
        else
            var filtered = text.filtered(objRef.filters);
        
        objRef.jDestination.val(filtered);
        objRef.jDestination.trigger('keyup');
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
