// var files = null;
var file = null;

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    file = evt.dataTransfer.files[0];

    document.getElementById('file-name').textContent = file.name;
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
dropZone.addEventListener('click', function () {
    document.getElementById('files').click()
});

function readBlob() {

    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2


            s = evt.target.result;

            if (s.replace('ISO-8859-1', 'UTF-8') == s) {
                document.getElementById('file-name').textContent = 'The file is not an HTML ISO-8859-1';
                document.getElementById('file-name').style.color = '#fd5959';
                return;
            }

            s = s.replace('ISO-8859-1', 'UTF-8');

            s = s.replace(/\u2014/g, "\u002D"); //&mdash
            s = s.replace(/\u201C/g, "\u0022"); //&ldquo
            s = s.replace(/\u201D/g, "\u0022"); //&rdquo
            s = s.replace(/\u2018/g, "\u0027"); //&lsquo
            s = s.replace(/\u2019/g, "\u0027"); //&rsquo

            var blob = new Blob([s], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, file.name.replace('.html', '-utf.html'));

        }
    };

    reader.readAsText(file, 'ISO-8859-1');
}


document.getElementById('files').addEventListener('change', function(e) {

    file = document.getElementById('files').files[0];

    document.getElementById('file-name').style.color = '';
    document.getElementById('file-name').textContent = document.getElementById('files').files[0].name;
})

document.getElementById('read-file').addEventListener('click', function(evt) {

    if (!file) {
        document.getElementById('file-name').textContent = 'Please select a file!';
        document.getElementById('file-name').style.color = '#fd5959';
        evt.stopPropagation();
        return;
    }

    evt.stopPropagation();
    readBlob();


}, false);

