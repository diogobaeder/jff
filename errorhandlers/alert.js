(function($){



jFF.errorhandlers.Alert = function(options) {
    var objRef = this;
    this.alertText = options[0];
    
    this.show = function(subject) {
        alert(objRef.alertText);
    };
    
    this.hide = function(subject) {};
};



})(jQuery);
