(function(){



jFF.errorhandlers.Append = function(options) {
    var objRef = this;
    this.message = options[0];
    this.jContainer = options[1];
    this.errorVisible = false;
    
    var jMessage = (objRef.message instanceof jQuery) ? objRef.message : jQuery('<span>'+objRef.message+'</span>');
    
    this.show = function(subject) {
        if (!objRef.errorVisible) {
            objRef.jContainer.append(jMessage);
            objRef.errorVisible = true;
        }
    };
    
    this.hide = function(subject) {
        if (objRef.errorVisible) {
            jMessage.remove();
            objRef.errorVisible = false;
        }
    };
};



})();
