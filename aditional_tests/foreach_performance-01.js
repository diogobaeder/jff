(function($){



// Foreaches
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}
Array.prototype.forEach2 = function(fun /*, thisp*/)
{
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
};
Array.prototype.forEach3 = Array.prototype.forEach2;

var log = console.debug;

/// Benchmark functions
function time() {
    return new Date().getTime();
}
function dummy() {
}
function benchmark(title, callback) {
    var start, end, difference, arr = [], last = 50000;
    for (var i = 0; i < last; i++) {
        arr.push(i+1);
    }
    
    // bench
    start = time();
    callback(arr, last, end);
    if (!end) end = time();
    difference = end - start;
    
    // log
    log('\n');
    log('===== '+title+' =====');
    log('start: '+start+' ms');
    log('end: '+end+' ms');
    log('difference: '+difference+' ms');
}

// Test 1
benchmark('for', function(arr, last, end){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == last) {
            end = time();
            break;
        }
    }
});

// Test 2
benchmark('forEach', function(arr, last, end){
    arr.forEach(function(element){
        if (element == last) {
            end = time();
        }
    });
});

// Test 3
benchmark('forEach2', function(arr, last, end){
    arr.forEach2(function(element){
        if (element == last) {
            end = time();
        }
    });
});

// Test 4
benchmark('forEach3 (dummy)', function(arr, last, end){
    arr.forEach3(function(element){
        dummy();
        if (element == last) {
            end = time();
        }
    });
});

// Test 6
benchmark('$.each', function(arr, last, end){
    $.each(arr, function(element){
        if (element == last) {
            end = time();
        }
    });
});

// Test 7
benchmark('map', function(arr, last, end){
    arr.map(function(element){
        if (element == last) {
            end = time();
        }
    });
});

// Test 8
benchmark('$.map', function(arr, last, end){
    $.map(arr, function(element){
        if (element == last) {
            end = time();
        }
    });
});

// Test 5
benchmark('for (dummy)', function(arr, last, end){
    for (var i = 0; i < arr.length; i++) {
        dummy();
        if (arr[i] == last) {
            end = time();
            break;
        }
    }
});

// Test 6
benchmark('slice', function(arr, last, end){
    var string = '1234567890';
    for (var i = 0; i < arr.length; i++) {
        string.slice(2,4);
    }
});

// Test 5
benchmark('substring', function(arr, last, end){
    var string = '1234567890';
    for (var i = 0; i < arr.length; i++) {
        string.substring(2,4);
    }
});




})(jQuery);
