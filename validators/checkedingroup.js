(function(){



    
// Validates if the number of checked fields
// is inside the range delimited by the parameters (excluding max)
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.CheckedInGroup = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var checked = field.jObj.filter(':checked') || field.jObj.find(':checked');
        
        if (!checked) {
            return false;
        }
        if (
            (objRef.min === null && checked.length < objRef.max) ||
            (objRef.max === null && checked.length >= objRef.min) ||
            (checked.length >= objRef.min && checked.length < objRef.max)
            ) {
            return true;
        }
        return false;
    };
};


})();
