(function($){



jFF.errorhandlers.ToggleVisibility = function(options) {
    var objRef = this;
    this.objects = options[0];
    this.errorVisible = false;
    
    this.show = function(subject) {
        if (!objRef.errorVisible) {
            objRef.objects.show();
            objRef.errorVisible = true;
        }
    };
    
    this.hide = function(subject) {
        if (objRef.errorVisible) {
            objRef.objects.hide();
            objRef.errorVisible = false;
        }
    };
};



})(jQuery);
