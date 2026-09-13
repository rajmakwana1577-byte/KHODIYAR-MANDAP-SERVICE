/* ================================================================
   KHODIYAR MANDAP SERVICE - MAIN JAVASCRIPT
   Premium Website Functionality & Interactions
   ================================================================ */

// ================================================================
// MOBILE NAVIGATION - HAMBURGER MENU
// ================================================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================================================================
// NAVBAR SCROLL EFFECT
// ================================================================

const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScroll;
});

// ================================================================
// SMOOTH SCROLL FUNCTIONS
// ================================================================

function scrollToGallery() {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ================================================================
// GALLERY FILTERING
// ================================================================

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
                item.style.display = 'block';
                // Trigger animation
                item.offsetHeight;
            } else {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            }
        });
    });
});

// ================================================================
// GALLERY LIGHTBOX
// ================================================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
let currentImageIndex = 0;
let visibleImages = [];

// Get visible images (filtered)
function getVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        getVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        
        const img = item.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

const lightboxClose = document.querySelector('.lightbox-close');
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigate to next image
function nextImage() {
    getVisibleImages();
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector('img');
    if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    }
}

// Navigate to previous image
function previousImage() {
    getVisibleImages();
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector('img');
    if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        previousImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ================================================================
// CONTACT FORM VALIDATION
// ================================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const eventType = document.getElementById('eventType').value;
        const eventDate = document.getElementById('eventDate').value;
        const venue = document.getElementById('venue').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name) {
            showAlert('Please enter your full name', 'error');
            return;
        }
        
        if (!phone || phone.length < 10) {
            showAlert('Please enter a valid phone number', 'error');
            return;
        }
        
        if (!eventType) {
            showAlert('Please select an event type', 'error');
            return;
        }
        
        if (!eventDate) {
            showAlert('Please select an event date', 'error');
            return;
        }
        
        if (!venue) {
            showAlert('Please enter venue/location', 'error');
            return;
        }
        
        // Form is valid
        showAlert('Thank you! We will contact you soon to discuss your celebration.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log({
            name,
            phone,
            eventType,
            eventDate,
            venue,
            message
        });
    });
}

// Show alert message
function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(alert);
    
    // Remove alert after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutNotification 0.3s ease-out';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 4000);
}

// ================================================================
// SCROLL REVEAL ANIMATIONS
// ================================================================

const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('reveal');
        }
    });
};

// Add data-reveal attribute to elements for reveal animation
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to various sections
    const sections = document.querySelectorAll('.service-card, .experience-card, .reason-card, .collection-card');
    sections.forEach(section => {
        section.setAttribute('data-reveal', 'true');
    });
    
    // Initial check
    revealOnScroll();
});

// Trigger reveal on scroll
window.addEventListener('scroll', revealOnScroll, { passive: true });

// ================================================================
// ACTIVE NAVIGATION LINK
// ================================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================================================================
// LAZY LOADING IMAGES
// ================================================================

// Simple lazy loading for browsers that don't support native loading attribute
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================================================
// FORM INPUT ANIMATION
// ================================================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('active');
    }
    
    // Add active class when focused or filled
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('active');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('active');
        }
    });
});

// ================================================================
// PARALLAX SCROLL EFFECT (Subtle)
// ================================================================

const parallaxElements = document.querySelectorAll('[data-parallax]');

if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            
            if (distance > -window.innerHeight && distance < window.innerHeight) {
                element.style.transform = `translateY(${distance * 0.5}px)`;
            }
        });
    }, { passive: true });
}

// ================================================================
// BUTTON RIPPLE EFFECT
// ================================================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ================================================================
// HANDLE HASH NAVIGATION
// ================================================================

// Handle navigation via URL hash
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// ================================================================
// PERFORMANCE - Debounce function for scroll events
// ================================================================

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

// ================================================================
// PREVENT SPAM CLICK
// ================================================================

let lastFilterClick = 0;
const filterClickDelay = 300;

filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const now = Date.now();
        if (now - lastFilterClick < filterClickDelay) {
            e.preventDefault();
            return;
        }
        lastFilterClick = now;
    });
});

// ================================================================
// SERVICE WORKER - For offline support (optional)
// ================================================================

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        // navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

// ================================================================
// ACCESSIBILITY - ARIA LIVE REGIONS
// ================================================================

// Announce filter changes for screen readers
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.textContent;
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `Gallery filtered by ${filter}`;
        announcement.style.position = 'absolute';
        announcement.style.left = '-9999px';
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    });
});

// ================================================================
// INITIALIZE ON DOM READY
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Log initialization
    console.log('KHODIYAR MANDAP SERVICE - Website initialized successfully');
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.service-card, .collection-card, .gallery-item, .experience-card, .reason-card');
    animateElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// ================================================================
// ERROR HANDLING
// ================================================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // Don't show generic errors to user, just log for debugging
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});

// ================================================================
// PAGE VISIBILITY API - Pause animations when tab is not visible
// ================================================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - reduce animation intensity
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animation) {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Page is visible - resume animations
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animation) {
                el.style.animationPlayState = 'running';
            }
        });
    }
});

// ================================================================
// RESPONSIVE BEHAVIOR
// ================================================================

function handleResponsive() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        // Mobile optimizations
        document.querySelectorAll('.gallery-grid').forEach(grid => {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        });
    } else {
        // Desktop optimizations
        document.querySelectorAll('.gallery-grid').forEach(grid => {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        });
    }
}

window.addEventListener('resize', debounce(handleResponsive, 250));
handleResponsive();

// ================================================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ================================================================

// Make functions available globally for inline HTML onclick handlers
window.scrollToGallery = scrollToGallery;
window.scrollToContact = scrollToContact;
window.closeLightbox = closeLightbox;
window.nextImage = nextImage;
window.previousImage = previousImage;
