(function(){



jFF.behaviours.MaxSelected = function(jField, max) {
    var objRef = this;
    this.active = false;
    
    this.selectedOptions = 0;
    this.options = jField.find('option') || jField.filter('option');
    
    objRef.options.bind('click', function(event){
        if (!objRef.active) return;
        var option = event.target;
        objRef.selectedOptions = objRef.options.filter(':selected').length;
        
        if (objRef.selectedOptions > max) {
            option.selected = false;
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
