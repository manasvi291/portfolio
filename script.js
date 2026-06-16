document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       THEME MANAGER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved theme or use system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.className = systemPrefersLight ? 'light-theme' : 'dark-theme';
    }
    
    // Toggle theme functionality
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('portfolio-theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('portfolio-theme', 'dark-theme');
        }
    });

    /* ==========================================================================
       MOBILE MENU NAVIGATION DRAWER
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('menu-open');
        navMenu.classList.toggle('menu-open');
    };
    
    mobileMenuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on any navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       STICKY HEADER & SCROLL BEHAVIORS
       ========================================================================== */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        // Sticky Header transition
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/Hide Back to Top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth Scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       ACTIVE LINK TRACKING (INTERSECTION OBSERVER)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies core viewport
        threshold: 0
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                navLinks.forEach(link => link.classList.remove('active-link'));
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* ==========================================================================
       DYNAMIC TYPING EFFECT (HERO SECTION)
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const roles = ["Frontend Developer", "IT Graduate", "Web Developer", "UI/UX Designer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster erasing
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // Handle transitions between states
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Brief pause before typing next
        }
        
        setTimeout(typeEffect, typingSpeed);
    };
    
    // Initialize Typing Effect
    if (typingSpan) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const scrollRevealItems = document.querySelectorAll('.scroll-reveal-up, .scroll-reveal-fade, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing after animation triggers
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    scrollRevealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // Custom Observer for Skill Progress Bars (fills dynamically on view)
    const skillItems = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetBar = entry.target;
                const widthValue = targetBar.getAttribute('data-width');
                targetBar.style.width = widthValue;
                observer.unobserve(targetBar);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    skillItems.forEach(bar => {
        skillObserver.observe(bar);
    });

    /* ==========================================================================
       PROJECTS GRID FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active style from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('filter-hide');
                } else {
                    card.classList.add('filter-hide');
                }
            });
        });
    });

    /* ==========================================================================
       CONTACT FORM SUBMISSION SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const toast = document.getElementById('toast-notification');
    const currentYearSpan = document.getElementById('current-year');
    
    // Update footer year dynamically
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Trigger Sending State Animation
            submitBtn.classList.add('sending');
            btnText.textContent = "Sending Message...";
            submitBtn.disabled = true;
            
            // Simulate API transmission delay
            setTimeout(() => {
                // Success State Reset
                submitBtn.classList.remove('sending');
                btnText.textContent = "Message Sent!";
                submitBtn.style.background = "#10b981"; // Temporary Green success state
                
                // Clear all input elements
                contactForm.reset();
                
                // Trigger Toast Slide In
                toast.classList.add('show');
                
                // Automatically dismiss toast and restore submit button
                setTimeout(() => {
                    toast.classList.remove('show');
                    
                    // Reset Button details
                    submitBtn.style.background = "";
                    btnText.textContent = "Send Message";
                    submitBtn.disabled = false;
                }, 4000);
                
            }, 1800);
        });
    }
});
