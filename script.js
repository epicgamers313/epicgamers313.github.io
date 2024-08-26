const fileInput = document.getElementById('fileInput');
const displayImage = document.getElementById('displayip');
const displayVideo = document.getElementById('displayvideo');
const backButton = document.getElementById('backbutton');
const nextButton = document.getElementById('nextbutton');

let files = [];
let currentIndex = 0;

// Detect the platform (desktop or mobile)
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Configure file input based on platform
function configureFileInput() {
    if (isMobileDevice()) {
        // Mobile devices: multiple file selection only
        fileInput.removeAttribute('webkitdirectory');
        fileInput.removeAttribute('mozdirectory');
        fileInput.removeAttribute('msdirectory');
        fileInput.removeAttribute('odirectory');
        fileInput.setAttribute('multiple', 'multiple');
    } else {
        // Desktop devices: folder selection
        fileInput.setAttribute('webkitdirectory', 'webkitdirectory');
        fileInput.setAttribute('mozdirectory', 'mozdirectory');
        fileInput.setAttribute('msdirectory', 'msdirectory');
        fileInput.setAttribute('odirectory', 'odirectory');
        fileInput.removeAttribute('multiple');
    }
}

// Call configureFileInput on page load
configureFileInput();

// Handle folder or file selection
document.getElementById('openbutton').addEventListener('click', function() {
    fileInput.click(); // Trigger file input click
});

fileInput.addEventListener('change', function(event) {
    files = Array.from(event.target.files); // Get all selected files
    if (files.length > 0) {
        currentIndex = 0; // Reset index
        displayMedia(files[currentIndex]); // Display the first file
    }
});

// Function to display media
function displayMedia(file) {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('image/')) {
        displayImage.src = url;
        displayImage.style.display = 'block'; // Show image
        displayVideo.style.display = 'none'; // Hide video
        displayVideo.pause(); // Pause video if previously playing
        displayVideo.src = ''; // Clear video source
    } else if (file.type.startsWith('video/')) {
        displayVideo.src = url;
        displayVideo.style.display = 'block'; // Show video
        displayImage.style.display = 'none'; // Hide image
        displayVideo.play(); // Autoplay video
    }
}

// Handle the "Back" button click
backButton.addEventListener('click', function() {
    if (files.length > 0) {
        currentIndex = (currentIndex - 1 + files.length) % files.length; // Move to previous file
        displayMedia(files[currentIndex]); // Update media source
    }
});

// Handle the "Next" button click
nextButton.addEventListener('click', function() {
    if (files.length > 0) {
        currentIndex = (currentIndex + 1) % files.length; // Move to next file
        displayMedia(files[currentIndex]); // Update media source
    }
});
