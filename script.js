// Configuration
const config = {
    anniversary: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),

    // Music playlist
    playlist: [
        {
            title: "Princesa e o Sapo - Evangeline",
            src: "assets/music/evangeline.mp3"
        },
        {
            title: "Noiva Cadáver - Dueto",
            src: "assets/music/dueto.mp3"
        },
        {
            title: "Aladdin - Mundo Ideal",
            src: "assets/music/mundo_ideal.mp3"
        },
        {
            title: "Enrolados - Vejo enfim a luz brilhar",
            src: "assets/music/vejo_enfim.mp3"
        }
    ],

    // Carousel items (images and videos)
    carouselItems: [
        {
            type: "image",
            src: "assets/images/TianaNavin.jpeg",
            caption: "😎👑"
        },
        {
            type: "image",
            src: "assets/images/Mickey.jpeg",
            caption: "🍿🍦"
        },
        {
            type: "video",
            src: "assets/videos/lukeandminnie.mp4",
            caption: "🥰😁"
        },
        {
            type: "video",
            src: "assets/videos/minnieandluke.mp4",
            caption: "😝👻"
        },
    ],

    // Carousel auto-slide interval in milliseconds (0 to disable)
    carouselInterval: 0
};

// DOM Elements
const timerElements = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

const anniversaryDateInput = document.getElementById('anniversaryDate');
const saveDateBtn = document.getElementById('saveDateBtn');
const carousel = document.getElementById('carousel');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const heartsContainer = document.getElementById('heartsContainer');

// Music player elements
const audioPlayer = new Audio();
let currentTrackIndex = 0;
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const nowPlaying = document.getElementById('nowPlaying');
const volumeControl = document.getElementById('volumeControl');

// State variables
let carouselInterval;
let isPlaying = false;

// Initialize the page
function init() {
    // Load saved anniversary date or use default
    const savedDate = localStorage.getItem('anniversaryDate');
    if (savedDate) {
        config.anniversary = new Date(savedDate);
    }
    anniversaryDateInput.valueAsDate = config.anniversary;

    // Initialize timer
    updateTimer();
    setInterval(updateTimer, 1000);

    // Initialize carousel
    initCarousel();

    // Initialize music player
    initMusicPlayer();

    // Create floating hearts occasionally
    setInterval(createFloatingHeart, 800);

    // Show initial floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
}

// Timer functions
function updateTimer() {
    const now = new Date();
    const diff = now - config.anniversary;

    // Calculate time difference
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30.44; // Approximate
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)) % 12;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    // Update DOM
    timerElements.years.textContent = years;
    timerElements.months.textContent = Math.floor(months);
    timerElements.days.textContent = Math.floor(days);
    timerElements.hours.textContent = hours;
    timerElements.minutes.textContent = minutes;
    timerElements.seconds.textContent = seconds;
}

// Carousel functions
function initCarousel() {
    // Clear existing items
    carousel.innerHTML = '';

    // Add items to carousel
    config.carouselItems.forEach((item,) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide w-full h-full flex flex-col items-center justify-center relative flex-shrink-0';

        if (item.type === 'image') {
            slide.innerHTML = `
                        <img src="${item.src}" alt="${item.caption}" class="w-full h-full object-cover">
                        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                            ${item.caption}
                        </div>
                    `;
        } else if (item.type === 'video') {
            slide.innerHTML = `
                        <video class="w-full h-full object-cover" controls>
                            <source src="${item.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                            ${item.caption}
                        </div>
                    `;
        }

        carousel.appendChild(slide);
    });

    // Update slide counters
    totalSlidesSpan.textContent = config.carouselItems.length;
    updateCurrentSlide();

    // Set up auto-slide if interval is set
    if (config.carouselInterval > 0) {
        startCarouselAutoSlide();
    }

    // Handle scroll events to update current slide
    carousel.addEventListener('scroll', updateCurrentSlide);

    // Handle manual navigation
    prevSlideBtn.addEventListener('click', () => {
        stopCarouselAutoSlide();
        scrollToSlide(getCurrentSlideIndex() - 1);
        if (config.carouselInterval > 0) {
            startCarouselAutoSlide();
        }
    });

    nextSlideBtn.addEventListener('click', () => {
        stopCarouselAutoSlide();
        scrollToSlide(getCurrentSlideIndex() + 1);
        if (config.carouselInterval > 0) {
            startCarouselAutoSlide();
        }
    });
}

function getCurrentSlideIndex() {
    // Calculates the index based on the horizontal scroll position
    const slideWidth = carousel.offsetWidth;
    if (slideWidth === 0) return 0;
    return Math.round(carousel.scrollLeft / slideWidth);
}

function updateCurrentSlide() {
    const currentIndex = getCurrentSlideIndex() + 1;
    currentSlideSpan.textContent = currentIndex;
}

function scrollToSlide(index) {
    const slides = carousel.children;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    const slide = slides[index];
    slide.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
}

function startCarouselAutoSlide() {
    stopCarouselAutoSlide();
    carouselInterval = setInterval(() => {
        scrollToSlide(getCurrentSlideIndex() + 1);
    }, config.carouselInterval);
}

function stopCarouselAutoSlide() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Music player functions
function initMusicPlayer() {
    // Set initial volume
    audioPlayer.volume = volumeControl.value;

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    volumeControl.addEventListener('input', updateVolume);

    // Player events
    audioPlayer.addEventListener('ended', playNext);
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayButton();
    });
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayButton();
    });

    // Load first track
    loadTrack(currentTrackIndex);
}

function loadTrack(index) {
    if (index < 0 || index >= config.playlist.length) return;

    currentTrackIndex = index;
    const track = config.playlist[index];

    audioPlayer.src = track.src;
    nowPlaying.textContent = track.title;

    if (isPlaying) {
        audioPlayer.play().catch(e => console.log("Auto-play prevented:", e));
    }
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play().catch(e => console.log("Play prevented:", e));
    }
}

function playPrevious() {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = config.playlist.length - 1;
    loadTrack(newIndex);
}

function playNext() {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= config.playlist.length) newIndex = 0;
    loadTrack(newIndex);
}

function updateVolume() {
    audioPlayer.volume = volumeControl.value;
}

function updatePlayButton() {
    const icon = playBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Save anniversary date
saveDateBtn.addEventListener('click', () => {
    const selectedDate = new Date(anniversaryDateInput.value);
    if (!isNaN(selectedDate.getTime())) {
        config.anniversary = selectedDate;
        localStorage.setItem('anniversaryDate', selectedDate.toISOString());
        alert('Anniversary date saved successfully!');
        updateTimer();
    } else {
        alert('Please select a valid date');
    }
});

// Floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    // Random position and size
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;

    heart.style.left = `${left}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;

    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

document.addEventListener('DOMContentLoaded', init);
