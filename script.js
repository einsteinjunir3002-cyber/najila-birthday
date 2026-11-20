// ===================================
// BIRTHDAY WEBSITE MAIN SCRIPT
// Najila's Birthday Experience ✨
// ===================================

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

function initializeWebsite() {
    // Detect device type and optimize
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = () => (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    
    // Store device info globally
    window.deviceInfo = {
        isMobile: isMobile || isTouch(),
        isLowPowerMode: navigator.deviceMemory ? navigator.deviceMemory <= 4 : false,
        isSlowConnection: navigator.connection ? navigator.connection.effectiveType === '4g' || navigator.connection.effectiveType === '3g' : false
    };
    
    // Apply mobile optimizations
    if (window.deviceInfo.isMobile) {
        document.documentElement.classList.add('mobile-device');
        optimizeForMobile();
    }
    
    // Hide loading screen after 3.5 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        loadingScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 3500);

    // Initialize all features
    setupMobileTouchOptimizations();
    setupParticles();
    setupHero();
    setupScrollAnimations();
    setupGallery();
    setupAudio();
    setupScrollToTop();
    setupCelebration();
    addScrollSpy();
    setupViewportHeightFix();
}

// ========== MOBILE OPTIMIZATIONS ==========
function optimizeForMobile() {
    if (window.deviceInfo.isLowPowerMode) {
        document.documentElement.style.setProperty('--epic', '0.2s');
        document.documentElement.style.setProperty('--slow', '0.2s');
        document.documentElement.style.setProperty('--smooth', '0.15s');
    }
    
    if (window.deviceInfo.isMobile) {
        document.documentElement.style.setProperty('--particle-count', '3');
    }
    
    document.addEventListener('touchstart', () => {}, { passive: true });
}

function setupMobileTouchOptimizations() {
    const buttons = document.querySelectorAll('button, .holographic-button, .neo-button, .gallery-card-2035');
    
    buttons.forEach(btn => {
        let lastTouchEnd = 0;
        btn.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        btn.addEventListener('touchstart', (e) => {
            btn.style.opacity = '0.8';
        });
        
        btn.addEventListener('touchend', () => {
            btn.style.opacity = '1';
        });
    });
    
    const modal = document.getElementById('imageModal');
    if (modal) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showNextImage();
                } else {
                    showPreviousImage();
                }
            }
        }
    }
}

function setupViewportHeightFix() {
    const updateViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateViewportHeight, 100);
    });
}

// ========== PARTICLE SYSTEM ==========
function setupParticles() {
    const container = document.getElementById('particlesContainer');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 5;
        const delay = Math.random() * 2;
        
        const gradients = [
            'linear-gradient(135deg, #00d4ff, #9d4edd)',
            'linear-gradient(135deg, #ff1493, #ffd700)',
            'linear-gradient(135deg, #ff69b4, #00d4ff)',
            'linear-gradient(135deg, #9d4edd, #ff1493)'
        ];
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.background = gradients[Math.floor(Math.random() * gradients.length)];
        particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s`;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size}px rgba(0, 212, 255, 0.6)`;
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
    
    const particleInterval = window.deviceInfo?.isMobile ? 1500 : 800;
    const interval = setInterval(createParticle, particleInterval);
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(interval);
        }
    });
}

// ========== FLOATING HEARTS ==========
function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    
    const left = Math.random() * 90 + 5;
    const duration = Math.random() * 2 + 3;
    
    heart.style.left = left + '%';
    heart.style.bottom = '0%';
    heart.style.animation = `heartFloat ${duration}s ease-in infinite`;
    heart.style.animationDelay = Math.random() * 1 + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), duration * 1000);
}

function startHeartAnimation() {
    const heartInterval = setInterval(createFloatingHeart, 600);
    setTimeout(() => clearInterval(heartInterval), 10000);
}

// ========== HERO SECTION SETUP ==========
function setupHero() {
    const beginBtn = document.getElementById('beginBtn');
    
    if (beginBtn) {
        beginBtn.addEventListener('click', () => {
            const storySection = document.getElementById('storySection');
            if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth' });
                startHeartAnimation();
            }
        });
    }
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========== GALLERY SETUP ==========
function setupGallery() {
    loadImages();
    setupImageModal();
    setupTimelineSnapshotModals();
}

function setupTimelineSnapshotModals() {
    document.querySelectorAll('.timeline-card-2035.memory-snapshot').forEach((card) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const mediaPath = card.getAttribute('data-image') || card.getAttribute('data-video');
            if (mediaPath) {
                openImageModal(mediaPath, 0);
            }
        });
    });
}

function loadImages() {
    createImageCards();
}

function createImageCards() {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';
    
    // The 4 unique media files from Pics/
    const baseMedia = [
        'Pics/WhatsApp Image 2026-11-19 at 11.42.19 PM.jpeg',
        'Pics/WhatsApp Video 2026-11-19 at 11.42.14 PM.mp4',
        'Pics/WhatsApp Video 2026-11-19 at 11.42.17 PM.mp4',
        'Pics/WhatsApp Video 2026-11-19 at 11.42.18 PM.mp4',
    ];

    // Repeat in staggered non-obvious patterns to fill the gallery
    // Pattern: original, rotation-A, rotation-B, rotation-C, rotation-B, rotation-A, ...
    // Each repetition gets a subtle visual treatment variant (handled via CSS nth-child)
    const galleryMedia = [
        baseMedia[0],       // img
        baseMedia[1],       // vid
        baseMedia[2],       // vid
        baseMedia[3],       // vid
        baseMedia[2],       // vid (swapped)
        baseMedia[0],       // img
        baseMedia[3],       // vid
        baseMedia[1],       // vid
        baseMedia[0],       // img
        baseMedia[3],       // vid
        baseMedia[2],       // vid
        baseMedia[1],       // vid
    ];

    galleryMedia.forEach((path, index) => {
        createImageCard(galleryContainer, path, index);
    });
    
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-frame')) {
                closeImageModal();
            }
        });
    }
}

function createImageCard(container, imagePath, index) {
    const card = document.createElement('div');
    card.classList.add('gallery-card-2035');
    card.style.animationDelay = (index * 0.1) + 's';
    card.setAttribute('data-path', imagePath);
    
    let mediaEl;
    if (imagePath.endsWith('.mp4')) {
        mediaEl = document.createElement('video');
        mediaEl.src = imagePath;
        mediaEl.muted = true;
        mediaEl.autoplay = true;
        mediaEl.loop = true;
        mediaEl.playsInline = true;
        mediaEl.style.width = '100%';
        mediaEl.style.height = '100%';
        mediaEl.style.objectFit = 'cover';
        mediaEl.style.background = 'rgba(10, 8, 16, 0.6)';
    } else {
        mediaEl = document.createElement('img');
        mediaEl.src = imagePath;
    }
    
    mediaEl.alt = `Najila Memory ${index + 1}`;
    mediaEl.onerror = function() {
        card.style.display = 'none';
    };
    
    card.appendChild(mediaEl);
    
    card.addEventListener('click', () => {
        openImageModal(imagePath, index);
    });
    
    container.appendChild(card);
}

// ========== IMAGE MODAL ==========
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.modal-close-2035');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (closeBtn) closeBtn.addEventListener('click', closeImageModal);
    if (prevBtn) prevBtn.addEventListener('click', showPreviousImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeImageModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeImageModal();
        }
    });
}

let currentImageIndex = 0;
let allImages = [];

function openImageModal(imagePath, index) {
    const modal = document.getElementById('imageModal');
    
    currentImageIndex = index;
    allImages = Array.from(document.querySelectorAll('.gallery-card-2035')).map(card => card.getAttribute('data-path'));
    
    updateModalMedia(imagePath);
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function updateModalMedia(path) {
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    if (path.endsWith('.mp4')) {
        modalImage.style.display = 'none';
        modalImage.src = '';
        modalVideo.style.display = 'block';
        modalVideo.src = path;
        modalVideo.play().catch(e => console.log('Video play error:', e));
    } else {
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
        modalImage.style.display = 'block';
        modalImage.src = path;
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.pause();
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    if (allImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateModalMedia(allImages[currentImageIndex]);
}

function showPreviousImage() {
    if (allImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateModalMedia(allImages[currentImageIndex]);
}

// ========== AUDIO CONTROL ==========
function setupAudio() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (musicToggle && backgroundMusic) {
        backgroundMusic.volume = 0.3;
        
        backgroundMusic.play().catch(err => {
            console.log('Autoplay failed, may need user interaction:', err);
            document.addEventListener('click', () => {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(e => console.log('Play failed:', e));
                }
            }, { once: true });
        });
        
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(err => console.log('Audio play failed:', err));
                musicToggle.classList.add('playing');
                musicToggle.textContent = '🔊 Playing';
            } else {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.textContent = '🔇 Muted';
            }
        });
    }
}

// ========== SCROLL TO TOP BUTTON ==========
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== CELEBRATION SETUP ==========
function setupCelebration() {
    const replayBtn = document.getElementById('replayBtn');
    const canvas = document.getElementById('confettiCanvas');
    
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    setupConfetti(canvas);
    setupFireworks();
}

// ========== CONFETTI ANIMATION ==========
function setupConfetti(canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const maxConfetti = window.deviceInfo?.isMobile ? 20 : 100;
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = Math.random() * 3 + 2;
            this.rotation = Math.random() * Math.PI * 2;
            this.angularVelocity = (Math.random() - 0.5) * 0.2;
            this.width = Math.random() * 8 + 4;
            this.height = Math.random() * 8 + 4;
            
            const colors = ['#ff1493', '#9d4edd', '#00d4ff', '#ffd700', '#ff69b4'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1;
            this.rotation += this.angularVelocity;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
        
        isOffScreen() {
            return this.y > canvas.height;
        }
    }
    
    function createConfetti() {
        for (let i = 0; i < 5 && confettiPieces.length < maxConfetti; i++) {
            confettiPieces.push(new ConfettiPiece());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            confettiPieces[i].update();
            confettiPieces[i].draw();
            
            if (confettiPieces[i].isOffScreen()) {
                confettiPieces.splice(i, 1);
            }
        }
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const burstCount = window.deviceInfo?.isMobile ? 10 : 20;
                const burstDelay = window.deviceInfo?.isMobile ? 300 : 200;
                
                for (let i = 0; i < burstCount; i++) {
                    setTimeout(() => createConfetti(), i * burstDelay);
                }
                animate();
            }
        });
    }, { threshold: 0.3 });
    
    const celebrationSection = document.getElementById('celebrationSection');
    if (celebrationSection) {
        observer.observe(celebrationSection);
    }
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, 250);
    });
}

// ========== FIREWORKS ANIMATION ==========
function setupFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    if (!fireworksContainer) return;
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        const hue = Math.random() * 60 - 30;
        const saturation = 100;
        const lightness = 50;
        
        firework.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        firework.style.boxShadow = `0 0 ${Math.random() * 10 + 10}px hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        const angle = (Math.random() * Math.PI * 2);
        const velocity = Math.random() * 200 + 100;
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        firework.style.setProperty('--tx', tx + 'px');
        firework.style.setProperty('--ty', ty + 'px');
        
        fireworksContainer.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1000);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => createFirework(), i * 80);
                }
            }
        });
    }, { threshold: 0.3 });
    
    const celebrationSection = document.getElementById('celebrationSection');
    if (celebrationSection) {
        observer.observe(celebrationSection);
    }
}

// ========== SCROLL SPY & ANIMATIONS ==========
function addScrollSpy() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// ========== SMOOTH SCROLL FOR BUTTONS ==========
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.scroll) {
        const targetId = e.target.dataset.scroll;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ========== PARALLAX EFFECT ==========
function setupParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const parallaxElements = document.querySelectorAll('.animated-background');
                
                parallaxElements.forEach(el => {
                    el.style.backgroundPosition = `0% ${scrolled * 0.5}px`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

setupParallax();

// ========== EASTER EGGS ==========
function setupEasterEggs() {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerSpecialEffect();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function triggerSpecialEffect() {
        const container = document.body;
        const emojis = ['💜', '🌸', '✨', '🎉', '👑'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.animation = 'heartFloat 4s ease-in forwards';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9998';
                container.appendChild(heart);
                
                setTimeout(() => heart.remove(), 4000);
            }, i * 100);
        }
    }
}

setupEasterEggs();

// ========== UTILITY FUNCTIONS ==========
function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function smoothScroll(duration) {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

smoothScroll(300);

// ========== PERFORMANCE OPTIMIZATION ==========
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('resize', debounce(() => {
    // Update any calculations needed on resize
}, 250));

// ========== CONSOLE EASTER EGG ==========
console.log('%c🎉 Happy Birthday Najila! ✨🌸', 'color: #ff1493; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%cMay this year be as brilliant and unforgettable as you are! 💖', 'color: #9d4edd; font-size: 16px; font-weight: bold;');
console.log('%cThis website was created with love, CSS magic, and a suspicious amount of sparkle ✨', 'color: #00d4ff; font-size: 14px; font-style: italic;');

