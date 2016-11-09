var files = null;

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    files = evt.dataTransfer.files; // FileList object.

    // // files is a FileList of File objects. List some properties.
    // var output = [];
    // for (var i = 0, f; f = files[i]; i++) {
    //     output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //         f.size, ' bytes, last modified: ',
    //         f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    //         '</li>');
    // }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

    document.getElementById('file-name').textContent = files[0].name;
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);



function readBlob(opt_startByte, opt_stopByte) {

    // files = document.getElementById('files').files;
    // if (!files.length) {
    //     alert('Please select a file!');
    //     return;
    // }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            document.getElementById('byte_content').textContent = evt.target.result;
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}

document.getElementById('readFileButton').addEventListener('click', function(evt) {

if (!files) {
files = document.getElementById('files').files;  
}



if (!files.length) {
        alert('Please select a file!');
        return;
    }   
        readBlob();
   
}, false);


