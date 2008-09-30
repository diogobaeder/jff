(function(){



jFF.validators.HasText = function(options) {
    
    // Valida se existe texto no campo
    this.validate = function(field) {
        field.valid = Boolean(field.jObj.val && field.jObj.val());
    };
};


})();
