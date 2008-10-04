(function(){



// Helper method for objects
Object.prototype.toArray = function() {
    if (this.length) {
        return Array.prototype.slice.call(this, this[0], this.length);
    }
};
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

// Main function, acts as a package
window.jFF = function() {
    return new jFF.core.FieldManager();
};

// Field instance helper
window.jFFField = function(jObj, fieldConstraintsMessage) {
    return new jFF.core.Field(jObj, fieldConstraintsMessage);
};

// Field instance helper
window.jFFCompositeField = function(fieldConstraintsMessage, minValid) {
    return new jFF.core.CompositeField(fieldConstraintsMessage, minValid);
};

// Behaviour instance helper
window.jFFBehaviour = function() {
    var args = (arguments.length > 1) ? arguments.toArray().slice(1, arguments.length) : [];
    return jFF.core.Factories.behaviour(arguments[0], args);
};

// Core package
jFF.core = new Object();



// Field manager for the validations
jFF.core.FieldManager = function() {
    var objRef = this;
    
    this.fields = new Array();
    this.handlers = new Array();
    
    // Adds the fields, if passed as arguments
    if (arguments.length > 0) {
        arguments.toArray().forEach(function(element, index, array){
            objRef.fields.push(element);
        });
    }
    
    // Flag to query if all the fields are valid
    this.valid = true;
    
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
            var args = (arguments.length > 1) ? arguments.toArray().slice(1, arguments.length) : [];
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
        
        arguments.toArray().forEach(function(field){
            field.managers.push(objRef);
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
jFF.core.Field = function(jObj, fieldConstraintsMessage) {
    var objRef = this;
    
    this.managers = new Array();
    this.validators = new Array();
    this.handlers = new Array();
    
    this.jObj = jObj;
    this.fieldConstraintsMessage = fieldConstraintsMessage;
    
    // Is the field valid?
    this.valid = true;
    
    // Adds a validator
    this.validator = function() {
        if (arguments.length == 1 && typeof arguments[0] != 'string') {
            objRef.validators.push(arguments[0]);
        }
        else {
            var args = (arguments.length > 1) ? arguments.toArray().slice(1, arguments.length) : [];
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
            var args = (arguments.length > 1) ? arguments.toArray().slice(1, arguments.length) : [];
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
jFF.core.CompositeField = function(fieldConstraintsMessage, minValid) {
    var objRef = this;
    
    this.managers = new Array();
    this.handlers = new Array();
    this.fields = new Array();
    
    this.fieldConstraintsMessage = fieldConstraintsMessage;
    this.minValid = minValid;
    
    // Is the composite field valid?
    this.valid = true;
    
    // Adds an error handler
    this.handler = function() {
        if (arguments.length == 1 && typeof arguments[0] != 'string') {
            objRef.handlers.push(arguments[0]);
        }
        else {
            var args = (arguments.length > 1) ? arguments.toArray().slice(1, arguments.length) : [];
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





    
// Validates if the number of checked fields
// is inside the range delimited by the parameters (excluding max)
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.CheckedInGroup = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var checked = field.jObj.filter(':checked') || field.jObj.find(':checked');
        
        if (!checked) {
            return false;
        }
        if (
            (objRef.min === null && checked.length < objRef.max) ||
            (objRef.max === null && checked.length >= objRef.min) ||
            (checked.length >= objRef.min && checked.length < objRef.max)
            ) {
            return true;
        }
        return false;
    };
};




jFF.validators.HasText = function(options) {
    
    // Valida se existe texto no campo
    this.validate = function(field) {
        return Boolean(field.jObj.val && field.jObj.val());
    };
};




    
// Validates if the number of characters
// is inside the range delimited by the parameters (excluding max)
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.NumChars = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var chars = field.jObj.val && field.jObj.val();
        
        if (!chars) {
            return false;
        }
        if (
            (objRef.min === null && chars.length < objRef.max) ||
            (objRef.max === null && chars.length >= objRef.min) ||
            (chars.length >= objRef.min && chars.length < objRef.max)
            ) {
            return true;
        }
        return false;
    };
};




jFF.validators.RegEx = function(options) {
    var objRef = this;
    this.pattern = options[0];
    
    // Validates if the field value matches the pattern
    this.validate = function(field) {
        var fieldValue = field.jObj.val && field.jObj.val();
        
        return fieldValue && objRef.pattern.test(fieldValue);
    };
};



// Specialized regex validator for e-mails
jFF.validators.Email = function(options) {
    var emailPattern = /^[\w-]+@([\w-]+\.)+[\w-]+$/;
    return new jFF.validators.RegEx([emailPattern]);
};




    
// Validates if the number of selected options
// is inside the range delimited by the parameters (excluding max)
// Pass null as one of the parameters to unlimit the range
// at the respective extremity
jFF.validators.SelectedInGroup = function(options) {
    var objRef = this;
    this.min = options[0];
    this.max = options[1];
    
    this.validate = function(field) {
        var selected = field.jObj.find(':selected') || field.jObj.filter(':selected');
        
        if (!selected) {
            return false;
        }
        
        if (
            (objRef.min === null && selected.length < objRef.max) ||
            (objRef.max === null && selected.length >= objRef.min) ||
            (selected.length >= objRef.min && selected.length < objRef.max)
            ) {
            return true;
        }
        return false;
    };
};




jFF.errorhandlers.Alert = function(options) {
    var objRef = this;
    this.alertText = options[0];
    
    this.show = function(subject) {
        alert(objRef.alertText);
    };
    
    this.hide = function(subject) {};
};





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





jFF.errorhandlers.Console = function(options) {
    var objRef = this;
    this.alertText = options[0];
    
    this.show = function(subject) {
        console.debug(objRef.alertText);
    };
    
    this.hide = function(subject) {};
};





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
                summedText += objRef.fieldWrapperText.replace(/%s/g, element.fieldConstraintsMessage);
            }
        });
        var wholeText = jQuery(objRef.mainWrapperText.replace(/%s/g, summedText));
        
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





jFF.behaviours.FilterChars = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.filters = options[1];
    
    this.jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        objRef.filters.forEach(function(element){
            text = text.split(element).join('');
        });
        objRef.jField.val(text);
    });
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};





jFF.behaviours.FilteredReplicator = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.jDestination = options[1];
    this.filters = options[2];
    
    this.jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        objRef.filters.forEach(function(element){
            text = text.split(element).join('');
        });
        objRef.jDestination.val(text);
    });
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};





jFF.behaviours.MaxChars = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.max = options[1];
    
    this.jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        
        if (text.length > objRef.max - 1) {
            text = text.substring(0, objRef.max);
            objRef.jField.val(text);
        }
    });
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};





jFF.behaviours.MaxChecked = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.max = options[1];
    
    this.checkedBoxes = 0;
    this.checks = this.jField.filter(':checkbox') || this.jField.find(':checkbox');
    
    this.checks.bind('click', function(event){
        if (!objRef.active) return;
        var checkbox = event.target;
        objRef.checkedBoxes = objRef.checks.filter(':checked').length;
        
        if (objRef.checkedBoxes > objRef.max) {
            checkbox.checked = false;
        }
    });
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};





jFF.behaviours.Replicator = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.jDestination = options[1];
    
    this.jField.bind('keyup', function(event){
        if (!objRef.active) return;
        var text = objRef.jField.val();
        objRef.jDestination.val(text);
    });
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};





jFF.behaviours.MaxSelected = function(options) {
    var objRef = this;
    this.active = false;
    
    this.jField = options[0];
    this.max = options[1];
    
    this.selectedOptions = 0;
    this.options = this.jField.find('option') || this.jField.filter('option');
    
    this.options.bind('click', function(event){
        if (!objRef.active) return;
        var option = event.target;
        objRef.selectedOptions = objRef.options.filter(':selected').length;
        
        if (objRef.selectedOptions > objRef.max) {
            option.selected = false;
        }
    });
    
    this.start = function() {
        objRef.active = true;
        return objRef;
    };
    
    this.stop = function() {
        objRef.active = false;
        return objRef;
    };
    
    this.start();
};



})();