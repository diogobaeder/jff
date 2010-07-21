(function($){

// Constants for expando referencing
var EXPANDO_MANAGER = 'jff.manager',
    EXPANDO_FIELD = 'jff.field';

function Manager(element) {
    this._element = element;
    this._fields = [];
    
    this.initialized = true;
    
    element.data(EXPANDO_MANAGER, this);
}

Manager.prototype = {
    
    fields: function() {
        if (!arguments.length) {
            return this._fields;
        }
        for (var i = 0, len = arguments.length; i < len; i++) {
            this._initField(arguments[i]);
        }
    },
    
    _initField: function(fieldEl) {
        fieldEl = this._element.find(fieldEl);
        var field = new Field(this, fieldEl);
        this._fields.push(field);
    }
};



function Field(manager, fieldEl) {
    this._element = fieldEl;
    this._manager = manager;
    
    this.initialized = true;
    
    fieldEl.data(EXPANDO_FIELD, this);
}

Field.prototype = {
    
};



$.fn.jff = function() {
    var manager, methods,
        previousManager = this.data(EXPANDO_MANAGER);
    
    if (!previousManager) {
        manager = new Manager(this);
    } else {
        manager = previousManager;
    }
    
    newMethods = {
        fields: function() {
            return manager.fields.apply(manager, arguments);
        }
    };
    
    this.extend(newMethods);
    
    return this;
};

})(jQuery);
