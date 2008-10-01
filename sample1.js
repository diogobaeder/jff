$(document).ready(function(){
    
    // Some fields to manage, each one handling a different type of error
    var sampleField1 = jFFField($('#sampleInput1'), 'Required field!')
        .validator('has_text')
        .handler('append', $('<p class="error">Required field!</p>'), $('#sampleInput1').parent());
    var sampleField2 = jFFField($('#sampleInput2'), 'Only digits here!')
        .validator('reg_ex', /^\d*$/)
        .handler('append', $('<p class="error">Only digits here!</p>'), $('#sampleInput2').parent());
    var sampleField3 = jFFField($('#sampleInput3'), 'Not a valid e-mail!')
        .validator('email')
        .handler('append', $('<p class="error">Not a valid e-mail!</p>'), $('#sampleInput3').parent());
    var sampleField4 = jFFField($('.sampleCheck1'), 'Select only from 2 to 4 checkboxes!')
        .validator('checked_in_group', 2, 5)
        .handler('append', $('<p class="error">Select only from 2 to 4 checkboxes!</p>'), $('.sampleCheck1').parent().parent());
    var sampleField5 = jFFField($('.sampleCheck2'), 'Select at most 2 checkboxes!')
        .validator('checked_in_group', null, 3)
        .handler('append', $('<p class="error">Select at most 2 checkboxes!</p>'), $('.sampleCheck2').parent().parent());
    var sampleField6 = jFFField($('.sampleCheck3'), 'Select at least 2 checkboxes!')
        .validator('checked_in_group', 2, null)
        .handler('append', $('<p class="error">Select at least 2 checkboxes!</p>'), $('.sampleCheck3').parent().parent());
    var sampleField7 = jFFField($('#sampleInput4'), 'Required textarea field!')
        .validator('has_text')
        .handler('append', $('<p class="error">Required textarea field!</p>'), $('#sampleInput4').parent());
    var sampleField8 = jFFField($('#sampleInput5'), 'The number of characters must be between 10 and 20!')
        .validator('num_chars', 10, 21)
        .handler('append', $('<p class="error">The number of characters must be between 10 and 20!</p>'), $('#sampleInput5').parent());
    var sampleField9 = jFFField($('#sampleSelect1'), 'Select only from 2 to 4 options!')
        .validator('selected_in_group', 2, 5)
        .handler('append', $('<p class="error">Select only from 2 to 4 options!</p>'), $('#sampleSelect1').parent());
    
    // Adding the fields to the manager, and then setting the validations to be made once the button is pressed
    var sampleManager = jFF().add(sampleField1, sampleField2, sampleField3, sampleField4, sampleField5, sampleField6, sampleField7, sampleField8, sampleField9)
        .simpleButtonForm($('#sampleButton'), $('#sampleForm'), true)
        .handler('manager_fields_append', '<div class="error">Something in the form is not right... let\'s see:<ul>%s</ul></div>', '<li>%s</li>', $('div#formErrors'));
        
    // Adding some validations on blur events of the text input ones
    sampleField1.jObj.blur(function(event){
        sampleField1.validate(null, true);
    });
    sampleField1.jObj.focus(function(event){
        sampleField1.hideErrors();
    });
    sampleField2.jObj.blur(function(event){
        sampleField2.validate(null, true);
    });
    sampleField3.jObj.blur(function(event){
        sampleField3.validate(null, true);
    });
    sampleField7.jObj.blur(function(event){
        sampleField7.validate(null, true);
    });
    sampleField8.jObj.blur(function(event){
        sampleField8.validate(null, true);
    });
    sampleField9.jObj.blur(function(event){
        sampleField9.validate(null, true);
    });
    
    // Some sample behaviours
    new jFF.behaviours.MaxChars($('#sampleInput5'), 20);
    new jFF.behaviours.FilterChars($('#sampleInput6'), [/\W/]);
    new jFF.behaviours.Replicator($('#sampleInput7'), $('#sampleInput7_2'));
    new jFF.behaviours.FilteredReplicator($('#sampleInput8'), $('#sampleInput8_2'), [/\W/]);
    new jFF.behaviours.MaxChecked($('.sampleCheck2'), 2);
    new jFF.behaviours.MaxSelected($('#sampleSelect1'), 4).stop().start();

    window.sampleManager = sampleManager;
});
