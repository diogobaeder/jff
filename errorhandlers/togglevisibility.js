(function($){



jFF.errorhandlers.ToggleVisibility = function(options) {
    var objRef = this;
    this.objects = options[0];
    this.toggleMode = options[1];
    this.errorVisible = false;
    if (objRef.toggleMode == 'hide_only') {
        this.errorVisible = this.objects.is(':visible');
    }
    
    this.show = function(subject) {
        if (!objRef.errorVisible && objRef.toggleMode != 'hide_only') {
            objRef.objects.show();
            objRef.errorVisible = true;
        }
    };
    
    this.hide = function(subject) {
        if (objRef.errorVisible && objRef.toggleMode != 'show_only') {
            objRef.objects.hide();
            objRef.errorVisible = false;
        }
    };
};



})(jQuery);
