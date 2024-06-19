import os
from flask import Flask, render_template, request, redirect, url_for, send_from_directory, flash, jsonify ,send_file
from collections import OrderedDict

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 * 1024  # 16GB file size limit
app.secret_key = 'supersecretkey'

ALLOWED_EXTENSIONS = {
    'exe', 'png', 'jpg', 'jpeg', 'gif', 'txt', 'zip', 'rar', 'docx', 'xlsx', 'pptx', 'mp3', 'mp4',
    'doc', 'pdf', 'xls', 'ppt', 'csv', 'wav', 'ogg', 'flac', 'avi', 'mkv', 'mov',
    'bmp', 'tiff', 'webp', 'svg', '7z', 'tar', 'gz', 'bz2', 'aac', 'm4a', 'wmv',
    'flv', 'webm', 'py', 'js', 'html', 'css', 'java', 'cpp', 'c', 'cs', 'php', 'rb',
    'swift', 'go', 'json', 'xml', 'yaml', 'md'
}
def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_file_size(file_path):
    """Get file size in a human-readable format."""
    size = os.path.getsize(file_path)
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size < 1024.0:
            return f"{size:.1f} {unit}"
        size /= 1024.0

@app.route('/', methods=['GET', 'POST'])
def index():
    
    if request.method == 'POST':
        # Handle file uploads
        if 'files[]' in request.files:
            files = request.files.getlist('files[]')
            for file in files:
                if file and allowed_file(file.filename):
                    filename = file.filename
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                else:
                    flash(f"File {file.filename} is not allowed.")
            flash('Files successfully uploaded')
        
        # Handle file deletions
        elif 'selected_files' in request.form:
            selected_files = request.form.getlist('selected_files')
            for filename in selected_files:
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                if os.path.exists(file_path):
                    os.remove(file_path)
            flash('Selected files deleted successfully!')

        return redirect(url_for('index'))

    # Get file list and sizes for display
    files = OrderedDict()
    file_sizes = {}

    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        files[filename] = filename  # Store just the filename
        file_sizes[filename] = get_file_size(file_path)

    return render_template('index.html', files=files, file_sizes=file_sizes)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serves uploaded files for download or viewing."""
    action = request.args.get('action') # Get the 'action' query parameter

    if action == 'download':
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    else:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    # as_attachment=True forces the browser to download instead of displaying in the browser


#delete files

@app.route('/delete_files', methods=['POST'])
def delete_files():
    files_to_delete = request.json.get('files', [])
    
    deleted_files = []
    not_found_files = []

    for file_name in files_to_delete:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
        if os.path.exists(file_path):
            os.remove(file_path)
            deleted_files.append(file_name)
        else:
            not_found_files.append(file_name)
    
    return jsonify({
        'deleted_files': deleted_files,
        'not_found_files': not_found_files
    })

#download ALL

@app.route('/download_files', methods=['POST'])
def download_files():
    files_to_download = request.json.get('files', [])
    downloaded_files = []
    not_found_files = []

    for file_name in files_to_download:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
        if os.path.exists(file_path):
            downloaded_files.append(file_name)
            return send_file(file_path, as_attachment=True)
        else:
            not_found_files.append(file_name)
    
    return jsonify({
        'downloaded_files': downloaded_files,
        'not_found_files': not_found_files
    })






if __name__ == '__main__':
     # Use this line if you are running locally
    app.run(debug=True, host='0.0.0.0', port=80)  # Use this line with your specific IP and port for network access 