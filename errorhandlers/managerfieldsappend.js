(function(){



jFF.errorhandlers.ManagerFieldsAppend = function(options) {
    var objRef = this;
    this.mainWrapperText = options[0];
    this.fieldWrapperText = options[1];
    this.jContainer = options[2];
    
    this.jContent = null;
    
    this.show = function(subject) {
        subject.resetError = true;
        if (!subject.errorVisible || true) {
            var summedText = '';
            subject.fields.forEach(function(element, index){
                if (!element.valid) {
                    summedText += objRef.fieldWrapperText.replace(/%s/g, element.fieldConstraintsMessage);
                }
            });
            var wholeText = objRef.mainWrapperText.replace(/%s/g, summedText);
            
            if (!objRef.jContent) {
                objRef.jContent = jQuery(wholeText);
            }
            else {
                objRef.jContent.remove();
                objRef.jContent = null;
                objRef.jContent = jQuery(wholeText);
            }
            objRef.jContainer.append(objRef.jContent);
        }
    };
    
    this.hide = function(subject) {
        if (subject.errorVisible && objRef.jContent) {
            objRef.jContent.remove();
        }
    };
};



})();
