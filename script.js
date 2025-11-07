// Custom Cursor
const cursor = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.2;
    cursorY += dy * 0.2;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Enlarge cursor on hover
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = 'rgba(0, 255, 157, 0.2)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
    });
});

// Terminal Typing Animation
const commands = [
    'npm create next-app',
    'git commit -m "initial commit"',
    'vercel deploy --prod',
    'claude: build feature X',
    'npm run test -- --coverage'
];

let commandIndex = 0;
let charIndex = 0;
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseBetweenCommands = 2000;

const typingElement = document.querySelector('.typing-text');

function typeCommand() {
    if (charIndex < commands[commandIndex].length) {
        typingElement.textContent += commands[commandIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeCommand, typingSpeed);
    } else {
        setTimeout(deleteCommand, pauseBetweenCommands);
    }
}

function deleteCommand() {
    if (charIndex > 0) {
        typingElement.textContent = commands[commandIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteCommand, deletingSpeed);
    } else {
        commandIndex = (commandIndex + 1) % commands.length;
        setTimeout(typeCommand, 500);
    }
}

// Start typing animation
setTimeout(typeCommand, 1000);

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('x') ? 'x' : element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate counters when visible
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe stats
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Add fade-in class to sections
const sections = document.querySelectorAll('.section-header, .about-text, .about-visual, .project-card, .contact-text, .contact-form-wrapper');
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;

    pageSections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        // Simulate form submission
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = '<span>Message Sent! ✓</span>';
            contactForm.reset();

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.float-item');

    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add glow effect to tech tags on hover
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.3)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Project card tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Grid background animation
const gridBackground = document.querySelector('.grid-background');
let gridOffset = 0;

function animateGrid() {
    gridOffset += 0.5;
    if (gridOffset >= 50) gridOffset = 0;
    gridBackground.style.backgroundPosition = `${gridOffset}px ${gridOffset}px`;
    requestAnimationFrame(animateGrid);
}

animateGrid();

// Add random glitch effect to logo occasionally
const logo = document.querySelector('.glitch');
function randomGlitch() {
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = '';
        logo.classList.add('glitching');
        setTimeout(() => {
            logo.classList.remove('glitching');
        }, 300);
    }, 10);
}

setInterval(() => {
    if (Math.random() > 0.7) {
        randomGlitch();
    }
}, 5000);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or reset states
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// Console easter egg
console.log('%c👋 Hey Developer!', 'font-size: 24px; color: #00ff9d; font-weight: bold;');
console.log('%cLike what you see? This portfolio was built with AI assistance in record time.', 'font-size: 14px; color: #00d4ff;');
console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #a855f7;');

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});