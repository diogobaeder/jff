(function($){

function Manager(form) {
    this.form = form;
    this.fields = [];
    this.initialized = true;
}

Manager.prototype = {
    
    field: function() {
        if (!arguments.length) {
            return this.fields;
        }
        
    },
    
    _initFields: function() {
        
    }
};

$.fn.jff = function() {
    var manager, methods,
        previousManager = this.data('_jff_manager');
    
    if (!previousManager) {
        manager = new Manager(this);
        this.data('_jff_manager', manager);
    } else {
        manager = previousManager;
    }
    
    methods = {
        field: function() {
            return manager.field.apply(manager, arguments);
        }
    };
    
    this.extend(methods);
    
    return this;
};

})(jQuery);
