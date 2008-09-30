(function(){



jFF.errorhandlers.Console = function(options) {
    var objRef = this;
    this.alertText = options[0];
    
    this.show = function(subject) {
        console.debug(objRef.alertText);
    };
    
    this.hide = function(subject) {};
};



})();
