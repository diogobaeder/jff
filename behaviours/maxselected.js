(function(){



jFF.behaviours.MaxSelected = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.max = options[1];
    
    this.selectedOptions = 0;
    this.options = this.jField.find('option') || this.jField.filter('option');
    
    this.options.bind('click', function(event){
        if (!objRef.active) return;
        var option = event.target;
        objRef.selectedOptions = objRef.options.filter(':selected').length;
        
        if (objRef.selectedOptions > objRef.max) {
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
