#!/usr/bin/env python
import jsmin

reference = "// jQuery Form Framework - http://sourceforge.net/projects/jff - Release under GPL and MIT\n"

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
        
    return '(function($){\n'+finalFile+'\n})(jQuery);'
    
def pack_to(files, outputName):
    processedFiles = processed_file_list(files)
    output = open(outputName, 'w')
    output.write(reference+processedFiles)
    
def minimize_to(files, outputName):
    processedFiles = processed_file_list(files)
    processedFiles = jsmin.jsmin(processedFiles)
    output = open(outputName, 'w')
    output.write(reference+processedFiles)



########################################################
if __name__ == '__main__':
    files = [
        # Core
        'core/core.js',
        # Validators
        'validators/numchecked.js',
        'validators/hastext.js',
        'validators/hasvalue.js',
        'validators/selectedhasvalue.js',
        'validators/numchars.js',
        'validators/regex.js',
        'validators/numselected.js',
        'validators/custom.js',
        # Error handlers
        'errorhandlers/alert.js',
        'errorhandlers/append.js',
        'errorhandlers/console.js',
        'errorhandlers/managerfieldsappend.js',
        'errorhandlers/custom.js',
        'errorhandlers/togglevisibility.js',
        'errorhandlers/toggleclasses.js',
        # Behaviours
        'behaviours/filterchars.js',
        'behaviours/filteredreplicator.js',
        'behaviours/maxchars.js',
        'behaviours/maxchecked.js',
        'behaviours/replicator.js',
        'behaviours/maxselected.js',
        'behaviours/checkmonitor.js',
        'behaviours/selectmonitor.js',
        'behaviours/charmonitor.js',
    ]
    minimize_to(['core/core.js'], 'core/core.min.js')
    pack_to(files, 'core/jff.pack.js')
    minimize_to(files, 'core/jff.pack.min.js')
