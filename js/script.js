// Cyber Futuristic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMatrixRain();
    initNavigation();
    initContactForm();
    initScrollAnimations();
    initBackgroundMorphing();
    initParticleEffects();
    initTextAnimations();
});

// Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        
        // Random position
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.animationDelay = Math.random() * 2 + 's';
        
        matrixContainer.appendChild(char);
        
        // Remove character after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }
    
    // Create matrix characters continuously
    setInterval(createMatrixChar, 100);
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.cyber-nav');
    const navToggler = document.querySelector('.cyber-hamburger');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.cyber-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (navCollapse.classList.contains('show')) {
                navToggler.click();
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Hamburger menu animation
    navToggler.addEventListener('click', function() {
        this.classList.toggle('collapsed');
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:hmalik7644@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Message prepared! Your email client should open shortly.', 'success');
        
        // Reset form
        this.reset();
    });
    
    // Form input focus effects
    document.querySelectorAll('.cyber-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Scroll animations - simplified to prevent overlay issues
function initScrollAnimations() {
    // Remove scroll-based animations that might cause overlay issues
    // Elements are now visible by default
    document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// Background morphing effect
function initBackgroundMorphing() {
    const backgrounds = document.querySelectorAll('.background-layer');
    let currentBg = 0;
    
    function morphBackground() {
        backgrounds.forEach((bg, index) => {
            bg.style.opacity = index === currentBg ? '1' : '0';
        });
        
        currentBg = (currentBg + 1) % backgrounds.length;
    }
    
    // Initial setup
    morphBackground();
    
    // Change background every 5 seconds
    setInterval(morphBackground, 5000);
}

// Particle effects for buttons
function initParticleEffects() {
    document.querySelectorAll('.cyber-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });
}

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Add particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        color: var(--text-primary);
        font-family: 'Orbitron', monospace;
        font-size: 0.9rem;
        z-index: 2000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px var(--glow-color);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Typing effect for hero text
function initTypingEffect() {
    const typingElement = document.getElementById('typingName');
    const originalText = 'Muhammad Haris Iqbal';
    
    // Reset the text
    typingElement.textContent = '';
    typingElement.style.width = '0';
    
    // Start typing animation
    setTimeout(() => {
        typingElement.style.width = '100%';
        
        let i = 0;
        function typeText() {
            if (i < originalText.length) {
                typingElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeText, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.classList.add('finished');
                }, 1000);
            }
        }
        
        typeText();
    }, 1500);
}

// Glitch effect for headings
function initGlitchEffect() {
    document.querySelectorAll('.cyber-heading').forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        heading.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// Add glitch animation to CSS
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(glitchStyle);

// Text animations
function initTextAnimations() {
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize glitch effect
    initGlitchEffect();
    
    // Add text reveal animations to headings
    const headings = document.querySelectorAll('.cyber-heading');
    headings.forEach((heading, index) => {
        heading.style.animationDelay = `${index * 0.2}s`;
        heading.classList.add('text-reveal');
    });
    
    // Add glow effect to important text
    const importantTexts = document.querySelectorAll('.cyber-name, .cyber-experience-title');
    importantTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.classList.add('glow-text');
        });
        text.addEventListener('mouseleave', () => {
            text.classList.remove('glow-text');
        });
    });
}

// Initialize additional effects
setTimeout(() => {
    // Additional initialization if needed
}, 500);

// Responsive navigation
window.addEventListener('resize', function() {
    const navCollapse = document.querySelector('.navbar-collapse');
    if (window.innerWidth > 992 && navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
        document.querySelector('.cyber-hamburger').classList.remove('collapsed');
    }
});

// Performance optimization
function debounce(func, wait) {
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

// Remove parallax effects that might cause overlay issues
// const debouncedScrollHandler = debounce(() => {
//     // Parallax removed to prevent overlay issues
// }, 16);

// window.addEventListener('scroll', debouncedScrollHandler);

// Preloader
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="cyber-spinner"></div>
            <p style="color: var(--primary-color); font-family: 'Orbitron', monospace; margin-top: 20px;">LOADING...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Add spinner styles
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .cyber-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);

// Initialize preloader
showPreloader();
