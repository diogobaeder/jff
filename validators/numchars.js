(function(){



    
// Validates if the number of characters
// is inside the range delimited by the parameters (excluding max)
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.NumChars = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var chars = field.jObj.val && field.jObj.val();
        
        if (!chars) {
            return false;
        }
        if (
            (objRef.min === null && chars.length < objRef.max) ||
            (objRef.max === null && chars.length >= objRef.min) ||
            (chars.length >= objRef.min && chars.length < objRef.max)
            ) {
            return true;
        }
        return false;
    };
};


})();
