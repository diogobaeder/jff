(function($){



jFF.behaviours.Replicator = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.jDestination = options[1];
    
    this.jField.bind('keyup.jFF', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        objRef.jDestination.val(text);
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
