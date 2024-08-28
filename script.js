let slideDuration = 7; // Global slide duration in seconds
let pausedState = false; // Variable to track if the slideshow is paused

const fileInput = document.getElementById('fileInput');
const displayImage = document.getElementById('displayip');
const displayVideo = document.getElementById('displayvideo');
const backButton = document.getElementById('backbutton');
const nextButton = document.getElementById('nextbutton');
const pauseButton = document.getElementById('pausebutton');
const shuffleButton = document.getElementById('shufflebutton'); // Shuffle button

let files = [];
let currentIndex = 0;
let timerId;

// Handle folder selection
document.getElementById('openbutton').addEventListener('click', function() {
    fileInput.click(); // Trigger file input click
});

fileInput.addEventListener('change', function(event) {
    files = Array.from(event.target.files); // Get files from the folder
    if (files.length > 0) {
        currentIndex = 0; // Reset index
        displayMedia(files[currentIndex]); // Display the first file
        if (!pausedState) { // Check if not pausedState
            startTimer(); // Start the timer for the first file
        }
    }
});

// Function to shuffle the files
function shuffleFiles() {
    for (let i = files.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [files[i], files[j]] = [files[j], files[i]];
    }
}

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
        displayVideo.loop = true; // Enable video looping
        displayImage.style.display = 'none'; // Hide image
        displayVideo.play(); // Autoplay video
    }
}

// Function to start the timer
function startTimer() {
    if (timerId) clearInterval(timerId); // Clear any existing timer

    timerId = setInterval(function() {
        currentIndex = (currentIndex + 1) % files.length; // Move to the next file
        displayMedia(files[currentIndex]); // Display the next file
    }, slideDuration * 1000); // Timer interval set to slideDuration
}

// Handle the "Back" button click
backButton.addEventListener('click', function() {
    if (files.length > 0) {
        currentIndex = (currentIndex - 1 + files.length) % files.length; // Move to previous file
        displayMedia(files[currentIndex]); // Update media source
        if (!pausedState) { // Check if not pausedState
            startTimer(); // Restart the timer for the new file
        }
    }
});

// Handle the "Next" button click
nextButton.addEventListener('click', function() {
    if (files.length > 0) {
        currentIndex = (currentIndex + 1) % files.length; // Move to next file
        displayMedia(files[currentIndex]); // Update media source
        if (!pausedState) { // Check if not passed
            startTimer(); // Restart the timer for the new file
        }
    }
});

// Handle the "Pause" button click
pauseButton.addEventListener('click', function() {
    pausedState = !pausedState;
    if (pausedState) {
        clearInterval(timerId); // Stop the timer when paused
        pauseButton.innerText = "Play";
    } else {
        startTimer(); // Restart the timer when resumed
        pauseButton.innerText = "Pause";
    }
});

// Handle the "Shuffle" button click
shuffleButton.addEventListener('click', function() {
    shuffleFiles(); // Shuffle the files
    currentIndex = 0; // Reset to the first file in the shuffled order
    displayMedia(files[currentIndex]); // Display the first shuffled file
    if (!pausedState) {
        startTimer(); // Restart the timer if not paused
    }
});


document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowRight':
            nextButton.click();
            break;
        case 'ArrowLeft':
            backButton.click();
            break;
        case ' ':
            pauseButton.click();
            break;
    }
});
