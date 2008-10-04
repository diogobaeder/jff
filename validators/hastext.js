(function($){



jFF.validators.HasText = function(options) {
    
    // Valida se existe texto no campo
    this.validate = function(field) {
        return Boolean(field.jObj.val && field.jObj.val());
    };
};


})(jQuery);
