// ===== GLOBAL VARIABLES =====
let isDarkTheme = false;
let typedInstance = null;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initializeLoadingScreen();
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeTypedText();
    initializeSkillBars();
    initializeContactForm();
    initializeBackToTop();
    
    console.log('🎯 Takunda Portfolio Loaded Successfully!');
});

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Show loading screen for 1.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// ===== THEME TOGGLE =====
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        enableDarkTheme();
    }
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        if (isDarkTheme) {
            disableDarkTheme();
        } else {
            enableDarkTheme();
        }
    });
}

function enableDarkTheme() {
    document.body.setAttribute('data-theme', 'dark');
    isDarkTheme = true;
    localStorage.setItem('portfolio-theme', 'dark');
}

function disableDarkTheme() {
    document.body.removeAttribute('data-theme');
    isDarkTheme = false;
    localStorage.setItem('portfolio-theme', 'light');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .skill-category, .info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== TYPED TEXT ANIMATION =====
function initializeTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        typedInstance = new Typed('.typed-text', {
            strings: [
                'Data into Insight',
                'Numbers into Stories',
                'Patterns into Solutions',
                'Information into Action'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const targetWidth = skillLevel.getAttribute('data-level') + '%';
                
                // Animate skill bar
                setTimeout(() => {
                    skillLevel.style.width = targetWidth;
                }, 300);
                
                // Stop observing after animation
                observer.unobserve(skillLevel);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each skill level
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const data = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                subject: this.querySelector('#subject').value,
                message: this.querySelector('#message').value
            };
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate sending (replace with actual API call)
            setTimeout(() => {
                alert('Message sent successfully! I\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
            }, 1500);
        });
    }
}

function validateForm(data) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check for empty fields
    if (!data.name.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.email.trim()) {
        alert('Please enter your email');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!data.subject.trim()) {
        alert('Please enter a subject');
        return false;
    }
    
    if (!data.message.trim()) {
        alert('Please enter your message');
        return false;
    }
    
    return true;
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FINAL INITIALIZATION =====
window.addEventListener('load', function() {
    // Remove loading screen if still present
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
    }
    
    // Track page visit
    let visitCount = localStorage.getItem('portfolio-visits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('portfolio-visits', visitCount);
    
    console.log(`Page visits: ${visitCount}`);
});

// ===== CONSOLE MESSAGE =====
console.log(`
████████╗ █████╗ ██╗  ██╗██╗   ██╗███╗   ██╗██████╗  █████╗ 
╚══██╔══╝██╔══██╗██║ ██╔╝██║   ██║████╗  ██║██╔══██╗██╔══██╗
   ██║   ███████║█████╔╝ ██║   ██║██╔██╗ ██║██║  ██║███████║
   ██║   ██╔══██║██╔═██╗ ██║   ██║██║╚██╗██║██║  ██║██╔══██║
   ██║   ██║  ██║██║  ██╗╚██████╔╝██║ ╚████║██████╔╝██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝
                                                            
Portfolio by Takunda Manhongo | Aspiring Data Scientist
University of Zimbabwe | WhatsApp: +263 716 389 960
`);