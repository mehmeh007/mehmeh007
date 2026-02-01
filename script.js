// ============================================
// Valentine's Day Gift for Shreya - Interactive Script
// ============================================

// Personalized love message for Shreya
const loveMessage = `Shreya, my beautiful Gulab Jamun 💕
You are the sweetest thing that has ever happened to me.
Every moment with you feels like a beautiful dream.
From the first day I saw you, I knew you were special.
Your eyes, your smile, your everything — perfect.
Thank you for choosing me, thank you for loving me.
You're my Iris, my rainbow after every storm.
I promise to love you endlessly, my sweetheart! 💝`;

// Photos array - you can add more photos here!
const photos = [
    'photos/photo1.png',
    'photos/photo2.png',
    'photos/photo3.png',
    'photos/photo4.png',
    'photos/photo5.png'
];

let currentPhotoIndex = 0;

// Heart emojis for floating animation
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '🌹', '✨', '💐'];

// DOM Elements
let envelope, landingPage, giftSection, loveMessageEl, replayBtn;
let galleryImage, photoDots;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    envelope = document.getElementById('envelope');
    landingPage = document.getElementById('landingPage');
    giftSection = document.getElementById('giftSection');
    loveMessageEl = document.getElementById('loveMessage');
    replayBtn = document.getElementById('replayBtn');
    galleryImage = document.getElementById('galleryImage');
    photoDots = document.querySelectorAll('.dot');

    // Start floating hearts
    createFloatingHearts();
    createSparkles();

    // Add envelope click handler
    envelope.addEventListener('click', openEnvelope);

    // Add replay button handler
    replayBtn.addEventListener('click', replayAnimation);

    // Add photo gallery handlers
    if (galleryImage) {
        galleryImage.addEventListener('click', nextPhoto);
    }

    // Add dot click handlers
    photoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToPhoto(index));
    });
});

// ============================================
// Photo Gallery Functions
// ============================================

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    changePhoto(currentPhotoIndex);
    createConfettiBurst(galleryImage.getBoundingClientRect().left + galleryImage.offsetWidth / 2,
        galleryImage.getBoundingClientRect().top + galleryImage.offsetHeight / 2);
}

function goToPhoto(index) {
    currentPhotoIndex = index;
    changePhoto(index);
}

function changePhoto(index) {
    // Fade out current photo
    galleryImage.classList.add('fade-out');

    setTimeout(() => {
        // Change the image
        galleryImage.src = photos[index];

        // Update dots
        photoDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Fade in new photo
        galleryImage.classList.remove('fade-out');
        galleryImage.classList.add('fade-in');

        setTimeout(() => {
            galleryImage.classList.remove('fade-in');
        }, 500);
    }, 300);
}

// ============================================
// Envelope Opening Animation
// ============================================

function openEnvelope() {
    // Add open class to envelope
    envelope.classList.add('open');

    // Play sound effect (optional)
    playHeartSound();

    // After envelope animation, fade out landing page
    setTimeout(() => {
        landingPage.classList.add('fade-out');

        // Show gift section
        setTimeout(() => {
            landingPage.style.display = 'none';
            giftSection.classList.remove('hidden');

            // Start typewriter effect
            setTimeout(() => {
                typeWriter(loveMessage, loveMessageEl);
            }, 500);

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    }, 1000);
}

// ============================================
// Typewriter Effect
// ============================================

function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.innerHTML = text.substring(0, index + 1).replace(/\n/g, '<br>') + '<span class="cursor">|</span>';
        setTimeout(() => typeWriter(text, element, index + 1), 25);
    } else {
        // Remove cursor when done
        element.innerHTML = text.replace(/\n/g, '<br>');
    }
}

// ============================================
// Floating Hearts Animation
// ============================================

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(container), i * 500);
    }

    // Continuously create hearts
    setInterval(() => createHeart(container), 1000);
}

function createHeart(container) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    // Random position and size
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';

    container.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 15000);
}

// ============================================
// Sparkles Animation
// ============================================

function createSparkles() {
    const container = document.getElementById('sparklesContainer');

    // Continuously create sparkles
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';

        container.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2500);
    }, 300);
}

// ============================================
// Heart Sound Effect (Optional)
// ============================================

function playHeartSound() {
    // Create a simple audio context for a gentle sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 523.25; // C5 note
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio not supported, continue silently
        console.log('Audio not available');
    }
}

// ============================================
// Replay Animation
// ============================================

function replayAnimation() {
    // Reset everything
    landingPage.style.display = 'flex';
    landingPage.classList.remove('fade-out');
    envelope.classList.remove('open');
    giftSection.classList.add('hidden');
    loveMessageEl.innerHTML = '';
    currentPhotoIndex = 0;

    // Reset photo gallery
    if (galleryImage) {
        galleryImage.src = photos[0];
    }
    photoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === 0);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// ============================================
// Intersection Observer for Animations
// ============================================

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe animated elements when gift section is shown
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.reason-card, .promise-item');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});

// ============================================
// Confetti Burst on Special Moments
// ============================================

function createConfettiBurst(x, y) {
    const colors = ['#ff6b9d', '#c94b7c', '#ffb6c1', '#ffd700', '#ff8fab', '#e8b4f8'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
        `;

        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = x;
        let posY = y;
        let opacity = 1;

        const animate = () => {
            posX += vx * 0.02;
            posY += vy * 0.02 + 2; // Add gravity
            opacity -= 0.02;

            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };

        requestAnimationFrame(animate);
    }
}

// Add confetti on beating heart click
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const beatingHeart = document.querySelector('.beating-heart');
        if (beatingHeart) {
            beatingHeart.style.cursor = 'pointer';
            beatingHeart.addEventListener('click', (e) => {
                createConfettiBurst(e.clientX, e.clientY);
            });
        }
    }, 2000);
});

// ============================================
// Easter Egg: Konami Code for Extra Animation
// ============================================

let konamiIndex = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerLoveExplosion();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerLoveExplosion() {
    // Create massive heart explosion
    const container = document.getElementById('heartsContainer');
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '40px';
            heart.style.transform = `translate(-50%, -50%)`;

            const angle = (i / 50) * Math.PI * 2;
            const distance = 300 + Math.random() * 200;

            heart.style.transition = 'all 1s ease-out';
            container.appendChild(heart);

            setTimeout(() => {
                heart.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
                heart.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
                heart.style.opacity = '0';
            }, 50);

            setTimeout(() => heart.remove(), 1500);
        }, i * 30);
    }
}

// ============================================
// Special "I Love You Shreya" Animation
// ============================================

// Easter egg: Type "shreya" to trigger a special message
let shreyaBuffer = '';
document.addEventListener('keydown', (e) => {
    shreyaBuffer += e.key.toLowerCase();
    if (shreyaBuffer.includes('shreya')) {
        showSpecialMessage();
        shreyaBuffer = '';
    }
    // Keep buffer small
    if (shreyaBuffer.length > 10) {
        shreyaBuffer = shreyaBuffer.slice(-6);
    }
});

function showSpecialMessage() {
    const message = document.createElement('div');
    message.innerHTML = '💖 I Love You Shreya! 💖';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Dancing Script', cursive;
        font-size: 3rem;
        color: #ff6b9d;
        text-shadow: 0 0 30px rgba(255, 107, 157, 0.8);
        z-index: 10000;
        animation: popInOut 2s ease-in-out forwards;
        pointer-events: none;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes popInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(message);

    // Create heart explosion
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(() => message.remove(), 2000);
}

// Console love message
console.log('%c💕 Made with love by Manav for Shreya! 💕',
    'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%c From Ares to Iris, From Marshmallow to Gulab Jamun 🌹',
    'color: #c94b7c; font-size: 16px;');
console.log('%c Happy Valentine\'s Day 2026! 💝',
    'color: #8b2252; font-size: 14px;');
