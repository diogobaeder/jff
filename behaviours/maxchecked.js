(function(){



jFF.behaviours.MaxChecked = function(jField, max) {
    var objRef = this;
    this.active = false;
    
    this.checkedBoxes = 0;
    this.checks = jField.filter(':checkbox') || jField.find(':checkbox');
    
    this.checks.bind('click', function(event){
        if (!objRef.active) return;
        var checkbox = event.target;
        objRef.checkedBoxes = objRef.checks.filter(':checked').length;
        
        if (objRef.checkedBoxes > max) {
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



})();
