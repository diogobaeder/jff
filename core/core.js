(function($){



$.fn.jFF = function(options) {
    var objRef = this;
    
    var _settings = $.extend({
        valid: true
    }, options);
    
    var _valid = settings.valid,
        _enabled = true;
    
    this.extend({
        jff: true,
        fields: [],
        handlers: [],
        
        addField: function(field) {
            if (arguments.length > 1) $.each(arguments, this.addField);
            this.fields.push(field);
            return this;
        },
        
        eachField: function(callback) {
            return $.each(this.fields, callback);
        },
        
        disable: function(defaultValid, hideErrors) {
            _valid = !!arguments.length ? defaultValid : settings.valid;
            _enabled = false;
            if (hideErrors) this.hideErrors();
        },
        
        enable: function(showErrors) {
            _enabled = true;
            if (showErrors) this.showErrors();
        },
        
        validate: function(showErrors) {
            
        },
        
        check: function() {
            
        }
    });
};



})(jQuery);
