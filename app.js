// Gaming-themed Landing Page JavaScript with Enhanced Readability

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initializeNavigation();
    
    // Animated counters
    initializeCounters();
    
    // Budget chart
    initializeBudgetChart();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Additional interactive features
    initializeInteractiveFeatures();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Enhanced scroll effect for navbar
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.99)';
            navbar.style.boxShadow = '0 4px 25px rgba(0, 102, 255, 0.2)';
            navbar.style.borderBottomWidth = '3px';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 102, 255, 0.15)';
            navbar.style.borderBottomWidth = '2px';
        }
    });
}

// Animated counters for hero statistics
function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (element, target, suffix = '') => {
        let current = 0;
        const increment = target / 120; // Slower animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (suffix === 'st') {
                element.textContent = Math.floor(current) + 'st';
            } else if (suffix === '%') {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    };

    // Intersection Observer to trigger counters when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const targetValue = entry.target.getAttribute('data-count');
                
                // Add a small delay for better visual effect
                setTimeout(() => {
                    if (targetValue === '1') {
                        animateCounter(entry.target, 1, 'st');
                    } else if (targetValue === '60' || targetValue === '90') {
                        animateCounter(entry.target, parseInt(targetValue), '%');
                    } else {
                        animateCounter(entry.target, parseInt(targetValue));
                    }
                }, 200);
            }
        });
    }, { threshold: 0.6 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Budget allocation chart using Chart.js
function initializeBudgetChart() {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;

    const budgetData = {
        labels: ['Organic Content (60%)', 'Paid Advertising (30%)', 'Influencer Partnerships (10%)'],
        datasets: [{
            data: [60, 30, 10],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
            borderColor: '#ffffff',
            borderWidth: 4,
            hoverOffset: 15,
            hoverBorderWidth: 6
        }]
    };

    const budgetConfig = {
        type: 'doughnut',
        data: budgetData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We have our own legend
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 102, 255, 0.95)',
                    titleColor: '#ffffff',
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyColor: '#ffffff',
                    bodyFont: {
                        size: 14,
                        weight: '500'
                    },
                    borderColor: '#0066FF',
                    borderWidth: 2,
                    cornerRadius: 10,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2500,
                easing: 'easeInOutQuart'
            },
            cutout: '65%',
            interaction: {
                intersect: false
            }
        }
    };

    // Create chart when it becomes visible
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('chart-created')) {
                entry.target.classList.add('chart-created');
                new Chart(ctx, budgetConfig);
            }
        });
    }, { threshold: 0.4 });

    chartObserver.observe(ctx);
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.card, .platform-card, .day-card, .game-card, .kpi-card, .timeline-item');
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Staggered animation for grids
    const grids = document.querySelectorAll('.platforms-grid, .content-calendar, .games-grid, .kpis-grid');
    
    grids.forEach(grid => {
        const items = grid.children;
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150); // Stagger by 150ms for smoother effect
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        gridObserver.observe(grid);
    });
}

// Additional interactive features
function initializeInteractiveFeatures() {
    // Gaming icon enhanced pulse effect
    const gamingIcon = document.querySelector('.gaming-icon');
    if (gamingIcon) {
        gamingIcon.addEventListener('mouseenter', function() {
            this.style.animationDuration = '0.4s';
            this.style.transform = 'scale(1.2)';
        });
        
        gamingIcon.addEventListener('mouseleave', function() {
            this.style.animationDuration = '3s';
            this.style.transform = 'scale(1)';
        });
    }

    // Enhanced platform cards interactive effects
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 30px 70px rgba(0, 102, 255, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 102, 255, 0.1)';
        });
    });

    // Enhanced CTA button effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.boxShadow = '0 15px 45px rgba(0, 102, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.3)';
        });
    });

    // Enhanced timeline item hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');
        
        item.addEventListener('mouseenter', function() {
            content.style.transform = 'scale(1.03)';
            content.style.boxShadow = '0 15px 50px rgba(0, 102, 255, 0.25)';
            marker.style.transform = 'scale(1.15)';
            marker.style.boxShadow = '0 0 0 4px #0066FF, 0 6px 20px rgba(0, 102, 255, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            content.style.transform = 'scale(1)';
            content.style.boxShadow = '0 8px 32px rgba(0, 102, 255, 0.1)';
            marker.style.transform = 'scale(1)';
            marker.style.boxShadow = '0 0 0 3px #0066FF, 0 4px 16px rgba(0, 102, 255, 0.3)';
        });
    });

    // Enhanced parallax effect for hero section
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                const heroContent = document.querySelector('.hero-content');
                
                if (hero && scrolled < hero.offsetHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                    // Add slight opacity change for depth
                    const opacity = Math.max(0.8, 1 - (scrolled / hero.offsetHeight) * 0.2);
                    heroContent.style.opacity = opacity;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Dynamic particle generation with better performance
    addDynamicParticles();

    // Enhanced text animations
    initializeTextAnimations();

    // Gaming theme keyboard shortcuts
    initializeKeyboardShortcuts();

    // Add card hover effects for better interactivity
    enhanceCardInteractions();
}

// Add more dynamic particles with improved performance
function addDynamicParticles() {
    const bg = document.querySelector('.animated-bg');
    if (!bg) return;

    // Add more particles dynamically but with better performance
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 6) + 's';
        particle.style.opacity = '0.3';
        bg.appendChild(particle);
    }

    // Add more circuit lines with better spacing
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line');
        line.style.top = (20 + (i * 20)) + '%';
        line.style.width = (150 + Math.random() * 250) + 'px';
        line.style.animationDelay = (i * 3) + 's';
        line.style.animationDuration = (10 + Math.random() * 6) + 's';
        line.style.opacity = '0.15';
        bg.appendChild(line);
    }
}

// Enhanced text reveal animations
function initializeTextAnimations() {
    const textElements = document.querySelectorAll('h2, h3, p:not(.hero-description), li');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('text-animated')) {
                entry.target.classList.add('text-animated');
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.animationDelay = '0.1s';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
    });

    textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        textObserver.observe(el);
    });
}

// Enhanced card interactions
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.card, .kpi-card, .budget-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click feedback for interactive elements
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Gaming-themed keyboard shortcuts
function initializeKeyboardShortcuts() {
    let konamiSequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        // Konami code detection with improved feedback
        konamiSequence.push(e.code);
        
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence = konamiSequence.slice(-konamiCode.length);
        }
        
        if (konamiSequence.length === konamiCode.length) {
            let isMatch = true;
            for (let i = 0; i < konamiCode.length; i++) {
                if (konamiSequence[i] !== konamiCode[i]) {
                    isMatch = false;
                    break;
                }
            }
            
            if (isMatch) {
                activateEasterEgg();
                konamiSequence = [];
            }
        }

        // Enhanced navigation shortcuts
        if (e.altKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            switch(e.key) {
                case '1':
                    smoothScrollToSection('hero');
                    break;
                case '2':
                    smoothScrollToSection('executive');
                    break;
                case '3':
                    smoothScrollToSection('market');
                    break;
                case '4':
                    smoothScrollToSection('platforms');
                    break;
                case '5':
                    smoothScrollToSection('content');
                    break;
                case '6':
                    smoothScrollToSection('metrics');
                    break;
                case '7':
                    smoothScrollToSection('budget');
                    break;
                case '8':
                    smoothScrollToSection('timeline');
                    break;
            }
        }
    });

    // Helper function for smooth scrolling
    function smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 90;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Visual feedback
            const navbar = document.querySelector('.navbar');
            navbar.style.transform = 'scale(1.02)';
            setTimeout(() => {
                navbar.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Enhanced easter egg activation
function activateEasterEgg() {
    // Enhanced gaming effects
    document.body.style.filter = 'hue-rotate(60deg) saturate(1.2)';
    document.body.style.transition = 'filter 0.5s ease';
    
    // Create enhanced floating gaming icons
    const icons = ['🎮', '🕹️', '🏆', '⚡', '💎', '🚀', '🎯', '💥', '🔥', '⭐'];
    for (let i = 0; i < 30; i++) {
        const icon = document.createElement('div');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            font-size: ${1.5 + Math.random() * 1.5}rem;
            z-index: 9999;
            pointer-events: none;
            animation: float-up-enhanced ${3 + Math.random() * 2}s ease-out forwards;
            text-shadow: 0 0 10px rgba(0, 102, 255, 0.8);
        `;
        document.body.appendChild(icon);
        
        setTimeout(() => {
            if (icon.parentNode) icon.remove();
        }, 5000);
    }
    
    // Enhanced CSS animation
    if (!document.getElementById('easter-egg-styles')) {
        const style = document.createElement('style');
        style.id = 'easter-egg-styles';
        style.textContent = `
            @keyframes float-up-enhanced {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-50vh) rotate(180deg) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-120vh) rotate(360deg) scale(0.5);
                    opacity: 0;
                }
            }
            
            @keyframes rainbow-pulse {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
                    border-color: #ff0000;
                }
                16% { 
                    box-shadow: 0 0 20px rgba(255, 165, 0, 0.7);
                    border-color: #ffa500;
                }
                33% { 
                    box-shadow: 0 0 20px rgba(255, 255, 0, 0.7);
                    border-color: #ffff00;
                }
                50% { 
                    box-shadow: 0 0 20px rgba(0, 255, 0, 0.7);
                    border-color: #00ff00;
                }
                66% { 
                    box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
                    border-color: #0000ff;
                }
                83% { 
                    box-shadow: 0 0 20px rgba(75, 0, 130, 0.7);
                    border-color: #4b0082;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add rainbow effect to cards
    const cards = document.querySelectorAll('.card, .platform-card, .day-card, .game-card, .kpi-card');
    cards.forEach(card => {
        card.style.animation = 'rainbow-pulse 2s ease-in-out infinite';
    });
    
    // Enhanced message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 10px;">🎮 LEVEL UP ACHIEVED! 🎮</div>
            <div style="font-size: 1.2rem; margin-bottom: 10px;">Gaming Mode: ACTIVATED</div>
            <div style="font-size: 1rem; opacity: 0.9;">Tunisia Esports Ready!</div>
        </div>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #0066FF, #1E90FF);
        color: white;
        padding: 30px 50px;
        border-radius: 15px;
        font-weight: bold;
        z-index: 10000;
        animation: rainbow-pulse 1s ease-in-out infinite;
        box-shadow: 0 10px 40px rgba(0, 102, 255, 0.5);
        border: 3px solid #00BFFF;
    `;
    document.body.appendChild(message);
    
    // Reset after 6 seconds
    setTimeout(() => {
        document.body.style.filter = 'none';
        cards.forEach(card => {
            card.style.animation = '';
        });
        message.remove();
        const styles = document.getElementById('easter-egg-styles');
        if (styles) styles.remove();
    }, 6000);
    
    // Play a success sound effect (if audio context is available)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), 200);
    } catch (e) {
        // Audio not available, continue silently
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(function() {
    // Any additional scroll-based calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Initialize loading state management
function initializeLoadingStates() {
    // Show loading indicators for heavy elements
    const heavyElements = document.querySelectorAll('.chart-container');
    
    heavyElements.forEach(element => {
        const loader = document.createElement('div');
        loader.className = 'loading-indicator';
        loader.innerHTML = '<span style="font-size: 1.5rem;">🎮</span> Loading Chart...';
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #0066FF;
            font-weight: bold;
            z-index: 10;
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            border: 2px solid #0066FF;
            animation: pulse 2s ease-in-out infinite;
        `;
        element.style.position = 'relative';
        element.appendChild(loader);
        
        // Remove loader when content is ready
        setTimeout(() => {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 2500);
    });
}

// Initialize all loading states
initializeLoadingStates();

// Enhanced console easter egg for developers
console.log(`
🎮 TUNISIA GAMING STARTUP - DIGITAL MARKETING STRATEGY 🎮
Enhanced for Maximum Readability & User Experience

    ████████╗██╗   ██╗███╗   ██╗██╗███████╗██╗ █████╗ 
    ╚══██╔══╝██║   ██║████╗  ██║██║██╔════╝██║██╔══██╗
       ██║   ██║   ██║██╔██╗ ██║██║███████╗██║███████║
       ██║   ██║   ██║██║╚██╗██║██║╚════██║██║██╔══██║
       ██║   ╚██████╔╝██║ ╚████║██║███████║██║██║  ██║
       ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝╚═╝  ╚═╝

✨ IMPROVED FEATURES:
• Enhanced text readability with proper contrast ratios
• Solid navbar background with better visibility
• Semi-transparent overlays for content sections
• Reduced particle animation opacity for better focus
• Improved hover states and interactive elements
• WCAG compliant color schemes

🎯 Prepared by: Hamza Khlaf
🚀 Ready to dominate Tunisia's gaming scene!

🎮 EASTER EGGS:
• Try the Konami Code: ↑↑↓↓←→←→BA
• Use Alt+1-8 for quick section navigation!
• Hover effects everywhere for better UX!

💻 Built with enhanced accessibility and readability in mind.
🎨 Gaming aesthetics that don't compromise usability.
`);

// Add a small performance monitor for development
if (window.location.search.includes('debug=true')) {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            console.log(`FPS: ${Math.round(frameCount * 1000 / (currentTime - lastTime))}`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    measureFPS();
}