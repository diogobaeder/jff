(function(){



jFF.behaviours.FilteredReplicator = function(jField, jDestination, filters) {
    var objRef = this;
    this.active = false;
    
    jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = jField.val();
        
        filters.forEach(function(element, index, array){
            text = text.split(element).join('');
        });
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
