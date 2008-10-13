(function($){



jFF.errorhandlers.ManagerFieldsAppend = function(options) {
    var objRef = this;
    this.mainWrapperText = options[0];
    this.fieldWrapperText = options[1];
    this.jContainer = options[2];
    
    this.jContent = null;
    
    this.show = function(subject) {
        var summedText = '';
        subject.fields.forEach(function(element){
            if (!element.valid) {
                summedText += objRef.fieldWrapperText.replace(/%s/g, element.message);
            }
        });
        var wholeText = $(objRef.mainWrapperText.replace(/%s/g, summedText));
        
        if (objRef.jContent) {
            objRef.jContent.remove();
        }
        objRef.jContent = wholeText;
        objRef.jContainer.append(objRef.jContent);
    };
    
    this.hide = function(subject) {
        if (objRef.jContent) {
            objRef.jContent.remove();
        }
    };
};



})(jQuery);
