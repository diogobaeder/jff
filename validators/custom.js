(function($){



jFF.validators.Custom = function(options) {
    var objRef = this;
    
    this.callback = options[0];
    
    // Valida se existe texto no campo
    this.validate = function(field) {
        return objRef.callback(field);
    };
};


})(jQuery);
