document.getElementById('upload-button').addEventListener('click', function() {
    const videoInput = document.getElementById('video-input');
    const videoFile = videoInput.files[0];

    if (videoFile) {
        const videoURL = URL.createObjectURL(videoFile);
        const videoName = videoFile.name;
        
        // Store the video data in localStorage
        let videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push({url: videoURL, name: videoName});
        localStorage.setItem('videos', JSON.stringify(videos));
        
        // Display the video on index.html
        addVideoToGallery(videoURL, videoName);
        
        // Clear the input for the next video
        videoInput.value = '';
    } else {
        alert('Please select a video file to upload.');
    }
});

function addVideoToGallery(videoURL, videoName) {
    const videosContainer = document.getElementById('videos');
    
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.src = videoURL;
    
    const titleElement = document.createElement('p');
    titleElement.textContent = videoName;

    const videoWrapper = document.createElement('div');
    videoWrapper.appendChild(videoElement);
    videoWrapper.appendChild(titleElement);
    
    videosContainer.appendChild(videoWrapper);
}

// Function to load videos from localStorage and display on the gallery page.
function loadVideos() {
    const videosContainer = document.getElementById('videos');
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    videos.forEach(video => {
        addVideoToGallery(video.url, video.name);
    });
}

// Call loadVideos when on the gallery page
if (window.location.pathname.endsWith('gallery.html')) {
    loadVideos();
}