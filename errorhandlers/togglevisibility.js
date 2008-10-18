(function($){



jFF.errorhandlers.ToggleVisibility = function(options) {
    var objRef = this;
    this.objects = options[0];
    this.onlyShowOrHide = options[1];
    this.errorVisible = false;
    
    this.show = function(subject) {
        if (!objRef.errorVisible && objRef.onlyShowOrHide != 'only_hide') {
            objRef.objects.show();
            objRef.errorVisible = true;
        }
    };
    
    this.hide = function(subject) {
        if (objRef.errorVisible && objRef.onlyShowOrHide != 'only_show') {
            objRef.objects.hide();
            objRef.errorVisible = false;
        }
    };
};



})(jQuery);
