(function(){



jFF.errorhandlers.Append = function(options) {
    var objRef = this;
    this.message = options[0];
    this.jContainer = options[1];
    
    var jMessage = (objRef.message instanceof jQuery) ? objRef.message : $('<span>'+objRef.message+'</span>');
    
    this.show = function(subject) {
        if (!subject.errorVisible) {
            objRef.jContainer.append(jMessage);
        }
    };
    
    this.hide = function(subject) {
        if (subject.errorVisible) {
            jMessage.remove();
        }
    };
};



})();
