(function($){



    
// Validates if the number of checked fields
// is inside the range delimited by the parameters
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.CheckedInGroup = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var checked = field.jObj.filter(':checked').add(field.jObj.find(':checked'));
        
        if (!checked) {
            return false;
        }
        if (
            (objRef.min === null && checked.length <= objRef.max) ||
            (objRef.max === null && checked.length >= objRef.min) ||
            (checked.length >= objRef.min && checked.length <= objRef.max)
            ) {
            return true;
        }
        return false;
    };
};



// Shortcuts
jFF.validators.MaxChecked = function(max) {
    return new jFF.validators.CheckedInGroup([null, max]);
};
jFF.validators.MinChecked = function(min) {
    return new jFF.validators.CheckedInGroup([min, null]);
};


})(jQuery);
