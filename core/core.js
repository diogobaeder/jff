(function($){



// Helper methods for arrays
Array.prototype.indexesOf = function(obj) {
    var foundItems = new Array();
    for (var i = 0; i < this.length; i++) {
        if (obj == this[i]) foundItems.push(i);
    }
    return foundItems;
};
Array.prototype.pull = function(index) {
    return this.splice(index, 1);
};
Array.prototype.remove = function(obj) {
    var index = this.indexOf(obj);
    if (index >= 0) this.pull(index);
};
Array.prototype.removeAll = function(obj) {
    this.filter(function(element, index, array){
        return (element != obj);
    });
    return this;
};
// Helper methods for strings
String.prototype.ucfirst = function() {
    var first = this.substring(0,1).toUpperCase();
    var rest = this.substring(1,this.length);
    return first + rest;
};
String.prototype.uToCamel = function() {
    return this.split('_').map(function(word){
        return word.ucfirst();
    }).join('');
};
String.prototype.filtered = function() {
    if (arguments.length == 0) return this;
    
    var tmp = String(this);
    $.makeArray(arguments).forEach(function(filter){
        tmp = tmp.replace(filter, '', 'g');
    });
    return tmp;
};

// Main function, acts as a package
window.jFF = function(message, focusAndBlur) {
    return new jFF.core.FieldManager(message, focusAndBlur);
};

// Field instance helper
window.jFFField = function(jObj, message, focusAndBlur) {
    return new jFF.core.Field(jObj, message, focusAndBlur);
};

// Field instance helper
window.jFFCompositeField = function(message, minValid, focusAndBlur) {
    return new jFF.core.CompositeField(message, minValid, focusAndBlur);
};

// Behaviour instance helper
window.jFFBehaviour = function() {
    var args = (arguments.length > 1) ? $.makeArray(arguments).slice(1, arguments.length) : [];
    return jFF.core.Factories.behaviour(arguments[0], args);
};

// Core package
jFF.core = new Object();



// Field manager for the validations
jFF.core.FieldManager = function(message, focusAndBlur) {
    var objRef = this;
    
    this.fields = new Array();
    this.handlers = new Array();
    this.message = message;
    this.focusAndBlur = focusAndBlur;
    
    // Flag to query if all the fields are valid
    this.valid = true;
    
    // Bypass modifiers
    this.bypass = false;
    this.defaultValid = true;
    
    this.enable = function() {
        objRef.bypass = false;
        
        return objRef;
    }
    
    this.disable = function(defaultValid) {
        objRef.bypass = true;
        objRef.defaultValid = Boolean(defaultValid);
        
        return objRef;
    }
    
    // Maps a callback to all the fields of the list, using the current index and field as arguments
    this.forEach = function(callback) {
        objRef.fields.forEach(callback);
        
        return objRef;
    };
    
    // Adds an error handler
    this.handler = function() {
        if (arguments.length == 1 && typeof arguments[0] != 'string') {
            objRef.handlers.push(arguments[0]);
        }
        else {
            var args = (arguments.length > 1) ? $.makeArray(arguments).slice(1, arguments.length) : [];
            objRef.handlers.push(jFF.core.Factories.handler(arguments[0], args));
        }
        
        return objRef;
    };
    
    // Validates all the fields
    this.validate = function(callback, toggleErrors) {
        objRef.valid = objRef.check(toggleErrors);
        
        if (callback)
            callback(objRef.valid);
            
        if (toggleErrors && !objRef.valid) objRef.showErrors();
        else if (toggleErrors && objRef.valid) objRef.hideErrors();
        
        return objRef;
    };
    
    // Checks for errors in the fields
    this.check = function(toggleErrors) {
        if (objRef.bypass) return objRef.defaultValid;
        
        var allValid = true;
        objRef.fields.forEach(function(field) {
            field.validate(function(fieldValid) {
                // In case the current field is not valid, deny the whole validation
                if (!fieldValid) {
                    allValid = false;
                }
            }, toggleErrors);
        });
        return allValid;
    };
    
    // Shows the error if there's a handler
    this.showErrors = function() {
        if (objRef.handlers.length > 0) {
            objRef.handlers.forEach(function(handler){
                handler.show(objRef);
            });
        }
    };
    
    // Hides the error if there's a handler
    this.hideErrors = function() {
        if (objRef.handlers.length > 0) {
            objRef.handlers.forEach(function(handler){
                handler.hide(objRef);
            });
        }
    };
    
    // Adds one or more items to the field list
    this.add = function() {
        objRef.fields.push.apply(objRef.fields, arguments);
        
        $.makeArray(arguments).forEach(function(field){
            field.managers.push(objRef);
            
            if (objRef.focusAndBlur) {
                field.jObj.not(':checkbox,:radio').focus(function(){
                    objRef.hideErrors();
                });
                field.jObj.not(':checkbox,:radio').blur(function(){
                    objRef.validate(null, true);
                });
            }
        });
        
        return objRef;
    };
    
    // Removes a field from the list
    this.remove = function(field) {
        objRef.fields.removeAll(field);
        
        return objRef;
    };
    
    // Pulls (removes and returns) an item from the field list
    this.pull = function(index) {
        return objRef.fields.pull(index);
    };
    
    // Simple method to link a button and a form to the manager, when not using Ajax
    this.simpleButtonForm = function(jButton, jForm, showErrors) {
        jButton.click(function(event){
            event.preventDefault(); event.stopPropagation();
            
            if (objRef.validate(null, showErrors).valid) {
                jForm.submit();
            }
        });
        
        return objRef;
    };
};



// A field that can be managed. Expects a jQuery object, a jFF validator and a jFF error handler
jFF.core.Field = function(jObj, message, focusAndBlur) {
    var objRef = this;
    
    this.managers = new Array();
    this.validators = new Array();
    this.handlers = new Array();
    
    this.jObj = jObj;
    this.message = message;
    this.focusAndBlur = focusAndBlur;
    
    // Activate validation on focus and blur
    if (objRef.focusAndBlur) {
        objRef.jObj.not(':checkbox,:radio').focus(function(){
            objRef.hideErrors();
        });
        objRef.jObj.not(':checkbox,:radio').blur(function(){
            objRef.validate(null, true);
        });
    }
    
    // Is the field valid?
    this.valid = true;
    
    // Bypass modifiers
    this.bypass = false;
    this.defaultValid = true;
    
    this.enable = function() {
        objRef.bypass = false;
        
        return objRef;
    }
    
    this.disable = function(defaultValid) {
        objRef.bypass = true;
        objRef.defaultValid = Boolean(defaultValid);
        
        return objRef;
    }
    
    // Adds a validator
    this.validator = function() {
        if (arguments.length == 1 && typeof arguments[0] != 'string') {
            objRef.validators.push(arguments[0]);
        }
        else {
            var args = (arguments.length > 1) ? $.makeArray(arguments).slice(1, arguments.length) : [];
            objRef.validators.push(jFF.core.Factories.validator(arguments[0], args));
        }
        
        return objRef;
    };
    
    // Adds an error handler
    this.handler = function() {
        if (arguments.length == 1 && typeof arguments[0] != 'string') {
            objRef.handlers.push(arguments[0]);
        }
        else {
            var args = (arguments.length > 1) ? $.makeArray(arguments).slice(1, arguments.length) : [];
            objRef.handlers.push(jFF.core.Factories.handler(arguments[0], args));
        }
        
        return objRef;
    };
    
    // Validates this specific field
    this.validate = function(callback, toggleErrors) {
        objRef.valid = objRef.check(toggleErrors);
        
        if (toggleErrors && !objRef.valid) objRef.showErrors();
        else if (toggleErrors && objRef.valid) objRef.hideErrors();
        
        if (callback) callback(objRef.valid);
        
        return objRef;
    };
    
    // Checks for errors in the fields
    this.check = function(toggleErrors) {
        if (objRef.bypass) return objRef.defaultValid;
        
        var allValid = true;
        objRef.validators.forEach(function(validator) {
            var valid = validator.validate(objRef);
            // In case the current field is not valid, deny the whole validation
            if (!valid) {
                allValid = false;
            }
        });
        return allValid;
    };
    
    // Shows the error if there's a handler
    this.showErrors = function() {
        if (objRef.handlers.length > 0) {
            objRef.handlers.forEach(function(element){
                element.show(objRef);
            });
        }
    };
    
    // Hides the error if there's a handler
    this.hideErrors = function() {
        if (objRef.handlers.length > 0) {
            objRef.handlers.forEach(function(element){
                element.hide(objRef);
            });
        }
    };
    
    // Adds a listener to this field
    this.manager = function(fieldManager) {
        fieldManager.add(objRef);
        
        return objRef;
    };
    
    // Removes a listener from this field
    this.removeManager = function(fieldManager) {
        fieldManager.remove(objRef);
        
        return objRef;
    };
};



// Composite field. Acts like a Field, but handles a group of Fields
jFF.core.CompositeField = function(message, minValid, focusAndBlur) {
    var objRef = this;
    
    this.managers = new Array();
    this.handlers = new Array();
    this.fields = new Array();
    this.jObj = null;
    
    this.message = message;
    this.minValid = minValid;
    this.focusAndBlur = focusAndBlur;
    
    // Is the composite field valid?
    this.valid = true;
    
    // Bypass modifiers
    this.bypass = false;
    this.defaultValid = true;
    
    this.enable = function() {
        objRef.bypass = false;
        
        return objRef;
    }
    
    this.disable = function(defaultValid) {
        objRef.bypass = true;
        objRef.defaultValid = Boolean(defaultValid);
        
        return objRef;
    }
    
    // Adds an error handler
    this.handler = function() {
        if (arguments.length == 1 && typeof arguments[0] != 'string') {
            objRef.handlers.push(arguments[0]);
        }
        else {
            var args = (arguments.length > 1) ? $.makeArray(arguments).slice(1, arguments.length) : [];
            objRef.handlers.push(jFF.core.Factories.handler(arguments[0], args));
        }
        
        return objRef;
    };
    
    // Validates all the fields
    this.validate = function(callback, toggleErrors) {
        objRef.valid = objRef.check(toggleErrors);
        
        if (callback)
            callback(objRef.valid);
            
        if (toggleErrors && !objRef.valid) objRef.showErrors();
        else if (toggleErrors && objRef.valid) objRef.hideErrors();
        
        return objRef;
    };
    
    // Checks for errors in the fields
    this.check = function(toggleErrors) {
        if (objRef.bypass) return objRef.defaultValid;
        
        var valid = 0;
        objRef.fields.forEach(function(field) {
            field.validate(function(fieldValid) {
                // If the current field is valid, increment the valid fields counter
                if (fieldValid) valid++;
            }, toggleErrors);
        });
        return valid >= objRef.minValid;
    };
    
    // Shows the error if there's a handler
    this.showErrors = function() {
        if (objRef.handlers.length > 0) {
            objRef.handlers.forEach(function(element){
                element.show(objRef);
            });
        }
    };
    
    // Hides the error if there's a handler
    this.hideErrors = function() {
        if (objRef.handlers.length > 0) {
            objRef.handlers.forEach(function(element){
                element.hide(objRef);
            });
        }
    };
    
    // Adds a listener to this field
    this.manager = function(fieldManager) {
        fieldManager.add(objRef);
        
        return objRef;
    };
    
    // Removes a listener from this field
    this.removeManager = function(fieldManager) {
        fieldManager.remove(objRef);
        
        return objRef;
    };
    
    // Adds one or more items to the field list
    this.add = function() {
        objRef.fields.push.apply(objRef.fields, arguments);
        
        $.makeArray(arguments).forEach(function(field){
            if (objRef.jObj) objRef.jObj.add(field.jObj);
            else objRef.jObj = field.jObj;
            
            if (objRef.focusAndBlur) {
                field.jObj.not(':checkbox,:radio').focus(function(){
                    objRef.hideErrors();
                });
                field.jObj.not(':checkbox,:radio').blur(function(){
                    objRef.validate(null, true);
                });
            }
        });
        
        return objRef;
    };
    
    // Removes a field from the list
    this.remove = function(field) {
        objRef.fields.removeAll(field);
        
        return objRef;
    };
    
    // Pulls (removes and returns) an item from the field list
    this.pull = function(index) {
        return objRef.fields.pull(index);
    };
};

// Object factories
jFF.core.Factories = {
    handler: function(name, options) {
        var klass = jFF.errorhandlers[name.uToCamel()];
        return new klass(options);
    },
    
    validator: function(name, options) {
        var klass = jFF.validators[name.uToCamel()];
        return new klass(options);
    },
    
    behaviour: function(name, options) {
        var klass = jFF.behaviours[name.uToCamel()];
        return new klass(options);
    }
};



// Validadores, manipuladores de erros
jFF.validators = new Object();
jFF.errorhandlers = new Object();
jFF.behaviours = new Object();



})(jQuery);
