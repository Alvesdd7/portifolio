// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Observe all scroll-fade elements
    const scrollFadeElements = document.querySelectorAll('.scroll-fade');
    scrollFadeElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add smooth parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animate hero text on load
    animateHeroText();
});

// Animate hero text with staggered animation
function animateHeroText() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el, index) => {
        el.style.animation = 'fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        el.style.opacity = '0';
        el.style.animationDelay = (index * 0.15) + 's';
    });
}

// Parallax effect for elements with data-parallax attribute
function updateParallax() {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(el => {
        const parallaxValue = el.getAttribute('data-parallax') || 0.5;
        const yPos = scrolled * parallaxValue;
        el.style.transform = `translateY(${yPos}px)`;
    });
}

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

// Add active state to navbar links based on scroll position
window.addEventListener('scroll', () => {
    updateNavigation();
});

function updateNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Enhance portfolio items with hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add smooth color transition on hover for skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Optimize animations for mobile
if (window.innerWidth < 768) {
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .scroll-fade {
                animation: fadeInUp 0.5s ease forwards !important;
            }
            .fade-in {
                animation: fadeInUp 0.5s ease forwards !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Disable parallax on mobile for better performance
    window.removeEventListener('scroll', updateParallax);
}

// Handle visibility change to optimize performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animation = 'none';
    } else {
        // Resume animations
        document.body.style.animation = '';
    }
});

// Add intersection observer for lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

// Observe all images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add subtle scale animation to cards on hover
const cards = document.querySelectorAll('.ai-card, .skill-category, .about-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Performance optimization: debounce scroll events
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

// Export for external access
window.portfolioApp = {
    observer,
    updateNavigation,
    updateParallax
};
