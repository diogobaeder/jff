(function($){



jFF.errorhandlers.Custom = function(options) {
    var objRef = this;
    this.callback = options[0];
    
    this.show = function(subject) {
        objRef.callback(subject, true);
    };
    
    this.hide = function(subject) {
        objRef.callback(subject, false);
    };
};



})(jQuery);
