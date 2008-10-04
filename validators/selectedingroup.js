(function($){



    
// Validates if the number of selected options
// is inside the range delimited by the parameters
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.SelectedInGroup = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var selected = field.jObj.filter(':selected').add(field.jObj.find(':selected'));
        
        if (!selected) {
            return false;
        }
        
        if (
            (objRef.min === null && selected.length <= objRef.max) ||
            (objRef.max === null && selected.length >= objRef.min) ||
            (selected.length >= objRef.min && selected.length <= objRef.max)
            ) {
            return true;
        }
        return false;
    };
};



// Shortcuts
jFF.validators.MaxSelected = function(max) {
    return new jFF.validators.SelectedInGroup([null, max]);
};
jFF.validators.MinSelected = function(min) {
    return new jFF.validators.SelectedInGroup([min, null]);
};


})(jQuery);
