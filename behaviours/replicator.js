(function(){



jFF.behaviours.Replicator = function(jField, jDestination) {
    var objRef = this;
    this.active = false;
    
    jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = jField.val();
        jDestination.val(text);
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



})();
