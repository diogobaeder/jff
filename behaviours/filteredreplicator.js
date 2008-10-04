(function($){



jFF.behaviours.FilteredReplicator = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.jDestination = options[1];
    this.filters = options[2];
    
    this.jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        objRef.filters.forEach(function(element){
            text = text.split(element).join('');
        });
        objRef.jDestination.val(text);
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
