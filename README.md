

<h1>Share Files Effortlessly on Your Network</h1>

<p>This easy-to-use server, powered by Python Flask, lets you share files between devices on the same network, like your home Wi-Fi. No internet connection is needed!</p>

<h3 align="center">See It in Action</h3>
<p align="center">
  <img src="https://raw.githubusercontent.com/NipunSGeeTH/github-readme-images-host/main/Local-Network-files-Sharing-server/1.png" alt="Demo Image" style="width: auto; height: auto;">
</p>

<h2>Get Up and Running</h2>

<ol>
  <li><strong>Install Python:</strong> 
    <ul>
      <li>Don't have Python? Download the latest version from <a href="https://www.python.org/downloads/" target="_blank">https://www.python.org/downloads/</a> and install it.</li>
      <li>Make sure to check the "Add Python to PATH" option during installation.</li>
    </ul>
  </li>
  <li><strong>Download the Project:</strong> Grab the files from this repository. You can use the "Code" button above to download as a ZIP file.</li>
  <li><strong>Open Your Terminal:</strong> 
    <ul>
      <li><strong>Windows:</strong> Search for "cmd" or "Command Prompt".</li>
      <li><strong>macOS:</strong> Search for "Terminal" in Spotlight.</li>
      <li><strong>Linux:</strong> You likely know how to do this! :)</li>
    </ul>
  </li>
  <li><strong>Navigate to the Files:</strong> In your terminal, use the <code>cd</code> command to go to the directory where you downloaded the project files. For example:
    <pre><code>cd C:\Users\YourName\Downloads\Local-Network-Files-Sharing-Server-main</code></pre> 
  </li>
  <li><strong>Install Flask:</strong> Run the following command:
    <pre><code>pip install Flask</code></pre>
  </li>
  <li><strong>Start Sharing:</strong>  Type this command and press Enter:
    <pre><code>python app.py</code></pre>
  </li>
  <li><strong>Access the Server:</strong> Your terminal will display a URL like <code>http://127.0.0.1:5000</code> or <code>http://192.168.8.106:80 </code>. Copy and paste this into your web browser.</li>
</ol>

<h2>Connect From Your Phone or Tablet</h2>

<ol>
  <li><strong>Same Wi-Fi:</strong> Ensure your phone/tablet is connected to the same Wi-Fi network as your computer.</li>
  <li><strong>Enter the URL:</strong> Open a web browser on your device and type in the URL from Step 7 above.</li>
</ol>

<h2>Want to Share More File Types?</h2>

<ol>
  <li>Open the <code>app.py</code> file in a text editor.</li>
  <li>Find the line that looks like <code>ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}</code></li>
  <li>Add the extensions of the file types you want to allow, separated by commas and within the curly braces <code>{}</code>. For example, to add MP3 files: <code>ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3'}</code></li>
  <li>Save the <code>app.py</code> file and restart the server by pressing Ctrl + C in the terminal and then running <code>python app.py</code> again.</li>
</ol>

<h2>Stopping the Server</h2>

<p>To stop sharing, simply press Ctrl + C in the terminal window where the server is running.</p>
