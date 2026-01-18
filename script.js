// ============================================
// PRABUDDHA TAMHANE - PORTFOLIO WEBSITE
// JavaScript Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initTypingEffect();
    initChartAnimation();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.padding = '12px 0';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.section-header, .about-content, .project-featured, .project-card, ' +
        '.timeline-item, .skill-category, .contact-content'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Staggered animation for grid items
    const staggerContainers = document.querySelectorAll('.projects-grid, .skills-grid');
    
    staggerContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'Data Scientist | Financial Analytics',
        'ML Engineer',
        'Financial Analyst',
        'Data Analyst'
    ];

    // Lock the width of the typing area to avoid layout shifts while text deletes/types
    // Only on desktop - on mobile let it wrap naturally
    const maxLen = roles.reduce((m, r) => Math.max(m, r.length), 0);
    typingElement.style.display = 'inline-block';
    if (window.innerWidth > 768) {
        typingElement.style.minWidth = `${maxLen}ch`;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start after initial animation
    setTimeout(type, 2000);
}

// ============================================
// CHART ANIMATION
// ============================================
function initChartAnimation() {
    const chartLine = document.querySelector('.chart-line');
    if (!chartLine) return;

    // Chart is animated via CSS, but we can add interactive hover effects
    const chartContainer = document.querySelector('.chart-container');
    
    if (chartContainer) {
        chartContainer.addEventListener('mouseenter', () => {
            chartContainer.style.transform = 'scale(1.02)';
            chartContainer.style.transition = 'transform 0.3s ease';
        });
        
        chartContainer.addEventListener('mouseleave', () => {
            chartContainer.style.transform = 'scale(1)';
        });
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ============================================
// UTILITY: Debounce function
// ============================================
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// TERMINAL EFFECT (Optional enhancement)
// ============================================
function initTerminalEffect() {
    const terminal = document.querySelector('.terminal-body code');
    if (!terminal) return;

    const lines = terminal.innerHTML.split('\n');
    terminal.innerHTML = '';

    lines.forEach((line, index) => {
        const lineElement = document.createElement('div');
        lineElement.innerHTML = line;
        lineElement.style.opacity = '0';
        lineElement.style.animation = `fadeIn 0.3s ease forwards`;
        lineElement.style.animationDelay = `${index * 0.1}s`;
        terminal.appendChild(lineElement);
    });
}

// ============================================
// PARALLAX EFFECT (subtle)
// ============================================
window.addEventListener('scroll', debounce(() => {
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
        const scrolled = window.pageYOffset;
        heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}));

// ============================================
// CURSOR TRAIL (Optional - adds flair)
// ============================================
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: rgba(0, 255, 136, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;
    const positions = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        positions.unshift({ x: mouseX, y: mouseY });
        if (positions.length > trailLength) positions.pop();

        trail.forEach((dot, index) => {
            const pos = positions[index] || positions[positions.length - 1];
            if (pos) {
                dot.style.left = pos.x + 'px';
                dot.style.top = pos.y + 'px';
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Uncomment to enable cursor trail:
// initCursorTrail();

