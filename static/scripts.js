document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert('Please select one or more files to upload.');
        return; 
    }

    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);

    let progressBar = document.getElementById('progressBar');
    let progressContainer = document.getElementById('progressContainer');

    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            let percentComplete = (e.loaded / e.total) * 100;
            progressBar.style.width = percentComplete + '%';
            progressContainer.style.display = 'block'; 
        }
    });

    xhr.onreadystatechange = function() {
        // Check for successful completion
        if (xhr.readyState == 4 && xhr.status == 200) { 
            progressContainer.style.display = 'none'; // Hide after success
            progressBar.style.width = '0'; 
            // alert('Files uploaded successfully!');
            location.reload();
        } 
    };

    xhr.send(formData); 
});

document.getElementById('selectAllBtn').addEventListener('click', function() {
    // Get all file checkboxes
    const checkboxes = document.querySelectorAll('.file-checkbox');
  
    // Check if ANY checkbox is NOT checked (meaning some might be unchecked)
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
  
    // Toggle based on whether all are currently checked or not
    checkboxes.forEach(checkbox => {
      checkbox.checked = !allChecked; 
    });
  });

 
 
 
 
 
 
  document.getElementById('deleteSelectedBtn').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.file-checkbox:checked');
    const selectedFiles = [];
    
    checkboxes.forEach(function(checkbox) {
        const fileName = checkbox.value;
        selectedFiles.push(fileName);
    });

    if (selectedFiles.length > 0) {
        fetch('/delete_files', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ files: selectedFiles }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Deleted Succesfully files: ' + data.deleted_files.join(', ') + '\n File Not found : ' + data.not_found_files.join(', '));
            // Optionally, you can reload the page or update the file list to reflect the changes
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('No files selected.');
    }
});

 
 
//  download all
document.getElementById('downitem1').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.file-checkbox:checked');
    const selectedFiles = [];
    
    checkboxes.forEach(function(checkbox) {
        const fileName = checkbox.value;
        selectedFiles.push(fileName);
    });

    if (selectedFiles.length > 0) {
        // Use fetch to send selected files to Flask endpoint for download
        selectedFiles.forEach(function(fileName) {
            fetch('/download_files', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ files: [fileName] }),  // Send each file individually
            })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Failed to download file: ' + fileName);
                }
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    } else {
        alert('No files selected.');
    }
});


var footer = document.querySelector("footer");

if (!footer) {
  footer = document.createElement("footer");
  document.body.appendChild(footer);
}


var divElement = document.createElement("div");
divElement.setAttribute("class","");
divElement.setAttribute("style", "background-color: rgba(0, 0, 0, 0); padding: 1px; text-align: center; width: 100vw; margin: 0;");

var pElement = document.createElement("span");
pElement.setAttribute("class", "blinking");

var spanElement1 = document.createElement("span");
spanElement1.setAttribute("class", "blin1");
spanElement1.textContent = "Design & Develop By";

var aElement = document.createElement("a");
aElement.setAttribute("href", "https://nipunsgeeth.github.io");
aElement.setAttribute("target", "_blank");
aElement.setAttribute("id", "blin2");

var spanElement2 = document.createElement("span");
spanElement2.textContent = " SanGeeTH";


aElement.appendChild(spanElement2);
pElement.appendChild(spanElement1);
pElement.appendChild(aElement);
divElement.appendChild(pElement);

footer.appendChild(divElement);