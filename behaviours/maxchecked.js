(function($){



jFF.behaviours.MaxChecked = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.max = options[1];
    
    this.checkedBoxes = 0;
    this.checks = this.jField.filter(':checkbox').add(this.jField.find(':checkbox'));
    
    this.checks.bind('click.jFF', function(event){
        if (!objRef.active) return;
        var checkbox = event.target;
        objRef.checkedBoxes = objRef.checks.filter(':checked').length;
        
        if (objRef.checkedBoxes > objRef.max) {
            checkbox.checked = false;
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



})(jQuery);
