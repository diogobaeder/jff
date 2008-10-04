#!/usr/bin/env python
import jsmin

def file_filtered_content(filename):
    try:
        lines = open(filename).readlines()
        linesNum = len(lines)
        return ''.join(lines[1:linesNum-2])
        
        
    except (IOError):
        print 'File read error with '+filename

def processed_file_list(fileList):
    finalFile = ''
    for filename in fileList:
        finalFile += file_filtered_content(filename)
        
    return '(function(){\n'+finalFile+'\n})();'



########################################################
if __name__ == '__main__':
    files = [
        # Core
        'core/core.js',
        # Validators
        'validators/checkedingroup.js',
        'validators/hastext.js',
        'validators/numchars.js',
        'validators/regex.js',
        'validators/selectedingroup.js',
        # Error handlers
        'errorhandlers/alert.js',
        'errorhandlers/append.js',
        'errorhandlers/console.js',
        'errorhandlers/managerfieldsappend.js',
        # Behaviours
        'behaviours/filterchars.js',
        'behaviours/filteredreplicator.js',
        'behaviours/maxchars.js',
        'behaviours/maxchecked.js',
        'behaviours/replicator.js',
        'behaviours/maxselected.js',
    ]
    processedFiles = processed_file_list(files)
    packed = open('core/jff.pack.js', 'w')
    packed.write(processedFiles)
    minifiedFiles = jsmin.jsmin(processedFiles)
    minified = open('core/jff.pack.min.js', 'w')
    minified.write(minifiedFiles)
