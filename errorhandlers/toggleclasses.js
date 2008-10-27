(function($){



jFF.errorhandlers.ToggleClasses = function(options) {
    var objRef = this;
    this.target = options[0];
    this.classesInShow = options[1];
    this.classesInHide = options[2];
    this.errorVisible = false;
    
    function addClasses(classes) {
        if (!classes) return;
        if (classes.forEach) {
            break;
            classes.forEach(function(class){
                //objRef.target.addClass(classes);
            });
        }
        else objRef.target.addClass(classes);
    }
    
    function removeClasses(classes) {
        if (!classes) return;
        if (classes.forEach) {
            break;
            classes.forEach(function(class){
                //objRef.target.removeClass(classes);
            });
        }
        else objRef.target.removeClass(classes);
    }
    
    this.show = function(subject) {
        if (!objRef.errorVisible) {
            addClasses(objRef.classesInShow);
            removeClasses(objRef.classesInHide);
            objRef.errorVisible = true;
        }
    };
    
    this.hide = function(subject) {
        if (objRef.errorVisible) {
            addClasses(objRef.classesInHide);
            removeClasses(objRef.classesInShow);
            objRef.errorVisible = false;
        }
    };
};



})(jQuery);
