(function($){



jFF.validators.SelectedHasValue = function(options) {
    
    // Valida se existe texto no campo
    this.validate = function(field) {
        var jSelected = field.jObj.filter(':selected').add(field.jObj.find(':selected'));
        return Boolean(jSelected.val && jSelected.val());
    };
};


})(jQuery);
