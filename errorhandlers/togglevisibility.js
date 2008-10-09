(function($){



jFF.errorhandlers.ToggleVisibility = function(options) {
    var objRef = this;
    this.toShow = options[0];
    this.toHide = options[1];
    this.errorVisible = false;
    
    this.show = function(subject) {
        if (!objRef.errorVisible) {
            if (objRef.toShow.length) {
                objRef.toShow.forEach(function(element){
                    element.show();
                });
            }
            else if(objRef.toShow) {
                objRef.toShow.show();
            }
            objRef.errorVisible = true;
        }
    };
    
    this.hide = function(subject) {
        if (objRef.errorVisible) {
            if (objRef.toHide.length) {
                objRef.toHide.forEach(function(element){
                    element.hide();
                });
            }
            else if(objRef.toHide) {
                objRef.toHide.hide();
            }
            objRef.errorVisible = false;
        }
    };
};



})(jQuery);
