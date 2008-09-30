(function(){



jFF.validators.RegEx = function(options) {
    var objRef = this;
    this.pattern = options[0];
    
    // Validates if the field value matches the pattern
    this.validate = function(field) {
        var fieldValue = field.jObj.val && field.jObj.val();
        
        field.valid = fieldValue && objRef.pattern.test(fieldValue);
    };
};



// Specialized regex validator for e-mails
jFF.validators.Email = function(options) {
    var emailPattern = /^[\w-]+@([\w-]+\.)+[\w-]+$/
    return new jFF.validators.RegEx([emailPattern]);
};


})();
