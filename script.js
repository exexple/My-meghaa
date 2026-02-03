// Page Navigation
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    const targetPage = document.getElementById(`page${pageNumber}`);
    targetPage.classList.add('active');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Audio Player Functionality
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

let isPlaying = false;

// Toggle Play/Pause
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.textContent = '▶️';
    } else {
        audioPlayer.play();
        playIcon.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = progressPercent + '%';
        
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
});

// Set duration when loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Format time in MM:SS
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Reset when audio ends
audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.textContent = '▶️';
    progress.style.width = '0%';
    audioPlayer.currentTime = 0;
});

// Click on progress bar to seek
const progressBar = document.querySelector('.progress-bar');
progressBar.addEventListener('click', (e) => {
    if (audioPlayer.duration) {
        const clickX = e.offsetX;
        const width = progressBar.offsetWidth;
        const seekTime = (clickX / width) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentPage = document.querySelector('.page.active');
    const currentPageId = currentPage.id;
    const pageNumber = parseInt(currentPageId.replace('page', ''));
    
    if (e.key === 'ArrowLeft' && pageNumber > 1) {
        goToPage(pageNumber - 1);
    } else if (e.key === 'ArrowRight' && pageNumber < 4) {
        goToPage(pageNumber + 1);
    } else if (e.key === ' ' && pageNumber === 2) {
        e.preventDefault();
        togglePlay();
    }
});

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.fontSize = '30px';
    heart.style.opacity = '0.7';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.animation = 'floatUp 6s linear forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Add CSS for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);