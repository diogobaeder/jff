(function(){



jFF.behaviours.MaxChars = function(jField, max) {
    var objRef = this;
    this.active = false;
    
    jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = jField.val();
        
        if (text.length > max-1) {
            text = text.substring(0, max);
            jField.val(text);
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



})();
