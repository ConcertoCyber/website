// Concerto - Main JavaScript

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Counter animations
function animateCounters() {
    const counters = [
        { id: 'response-counter', target: 90, suffix: '%', duration: 2000 },
        { id: 'integration-counter', target: 50, suffix: '+', duration: 2500 },
        { id: 'cost-counter', target: 60, suffix: '%', duration: 2200 }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            animateCounter(element, counter.target, counter.suffix, counter.duration);
        }
    });
}

function animateCounter(element, target, suffix, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // Trigger counter animations when hero section is visible
                if (entry.target.classList.contains('hero-counters')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card-hover, .step-indicator');
    animatedElements.forEach(el => observer.observe(el));

    // Observe hero counters
    const heroCounters = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
    if (heroCounters) {
        heroCounters.classList.add('hero-counters');
        observer.observe(heroCounters);
    }
}

// Form handling
function setupFormHandling() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Orchestrating Your Request...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showNotification('Thank you! We\'ll conduct your security assessment and be in touch within 24 hours.', 'success');
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    notification.classList.add(bgColor, 'text-white');
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="flex-shrink-0 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animate-float');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Musical note animation
function createMusicalNotes() {
    const hero = document.querySelector('section');
    if (!hero) return;
    
    setInterval(() => {
        const note = document.createElement('div');
        note.className = 'fixed text-concerto-gold text-2xl pointer-events-none z-10 animate-musicNote';
        note.textContent = ['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)];
        note.style.left = Math.random() * window.innerWidth + 'px';
        note.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(note);
        
        setTimeout(() => {
            if (note.parentElement) {
                note.remove();
            }
        }, 3000);
    }, 5000);
}

// Typing effect for tagline - DISABLED
function setupTypingEffect() {
    // Typing effect disabled - text displays immediately
    return;
}

// Enhanced card interactions
function setupCardInteractions() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px -12px rgba(124, 58, 237, 0.25)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// Cyber security themed background animation
function setupCyberBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    const nodeCount = 50;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#7C3AED';
            ctx.fill();
        });
        
        // Draw connections
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const distance = Math.sqrt(
                    Math.pow(node.x - otherNode.x, 2) + 
                    Math.pow(node.y - otherNode.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Service card enhanced interactions
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.bg-slate-800\\/50');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Show service details (placeholder)
            const title = card.querySelector('h3').textContent;
            showNotification(`Learn more about our ${title} services. Contact us for detailed consultation.`, 'info');
        });
    });
}

// Expertise level indicators
function setupExpertiseIndicators() {
    const expertiseLists = document.querySelectorAll('ul');
    
    expertiseLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            }, 100);
        });
    });
}

// Contact form enhancements
function enhanceContactForm() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
        
        // Add floating label effect
        input.addEventListener('input', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (input.value) {
                    label.style.transform = 'translateY(-25px) scale(0.8)';
                    label.style.color = '#F59E0B';
                } else {
                    label.style.transform = '';
                    label.style.color = '';
                }
            }
        });
    });
}

// Performance monitoring
function setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        
        // Add loaded class for CSS animations
        document.body.classList.add('loaded');
    });
    
    // Monitor scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Update any scroll-based effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Accessibility enhancements
function setupAccessibility() {
    // Add keyboard navigation for cards
    const interactiveElements = document.querySelectorAll('.card-hover, button, a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-concerto-gold text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const mainSection = document.querySelector('section');
    if (mainSection) {
        mainSection.id = 'main-content';
    }
}

// Theme customization
// function setupThemeCustomization() {
//     // Add theme toggle (optional)
//     const themeToggle = document.createElement('button');
//     themeToggle.className = 'fixed bottom-4 right-4 w-12 h-12 bg-concerto-purple rounded-full text-white shadow-lg hover:bg-concerto-gold transition-colors z-40';
//     themeToggle.innerHTML = '🎨';
//     themeToggle.title = 'Customize theme';
    
//     themeToggle.addEventListener('click', () => {
//         // Cycle through theme variations
//         const body = document.body;
//         const currentTheme = body.dataset.theme || 'default';
        
//         switch (currentTheme) {
//             case 'default':
//                 body.dataset.theme = 'high-contrast';
//                 body.style.filter = 'contrast(1.2) brightness(1.1)';
//                 break;
//             case 'high-contrast':
//                 body.dataset.theme = 'reduced-motion';
//                 body.style.filter = '';
//                 document.documentElement.style.setProperty('--animation-duration', '0.1s');
//                 break;
//             default:
//                 body.dataset.theme = 'default';
//                 body.style.filter = '';
//                 document.documentElement.style.setProperty('--animation-duration', '');
//                 break;
//         }
        
//         showNotification(`Theme changed to ${body.dataset.theme}`, 'info');
//     });
    
//     document.body.appendChild(themeToggle);
// }

// Initialize all functionality
function initializeConcerto() {    
    // Core functionality
    setupScrollAnimations();
    setupFormHandling();
    setupParallaxEffect();
    
    // Enhanced interactions
    setupCardInteractions();
    // setupServiceCards();
    setupExpertiseIndicators();
    enhanceContactForm();
    
    // Visual enhancements
    createMusicalNotes();
    setupCyberBackground();
    
    // Performance and accessibility
    setupPerformanceMonitoring();
    setupAccessibility();
    
    // Delayed initialization for better performance
    setTimeout(() => {
        setupTypingEffect();
    }, 1000);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConcerto);
} else {
    initializeConcerto();
}

// Export functions for external use
window.ConcertoWebsite = {
    scrollToSection,
    showNotification,
    toggleMobileMenu
};

// Analytics placeholder
function trackEvent(eventName, eventData = {}) {
    console.log('📊 Event tracked:', eventName, eventData);
    // Replace with actual analytics implementation
}

// Track page interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('button, a')) {
        trackEvent('interaction', {
            element: e.target.tagName,
            text: e.target.textContent.trim(),
            href: e.target.href || null
        });
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript error:', e.error);
    // In production, send to error tracking service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled promise rejection:', e.reason);
    // In production, send to error tracking service
});

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        '/css/styles.css',
        '/js/main.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Concerto-specific utilities
const ConcertoUtils = {
    // Generate musical note sequences
    generateMusicalSequence: () => {
        const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
        return notes[Math.floor(Math.random() * notes.length)];
    },
    
    // Validate security assessment form
    validateSecurityForm: (formData) => {
        const required = ['name', 'company', 'email'];
        const missing = required.filter(field => !formData[field]);
        return {
            isValid: missing.length === 0,
            missingFields: missing
        };
    },
    
    // Format security metrics
    formatSecurityMetric: (value, type) => {
        switch (type) {
            case 'percentage':
                return `${value}%`;
            case 'time':
                return `${value}s`;
            case 'count':
                return `${value}+`;
            default:
                return value;
        }
    },
    
    // Generate consultation booking link
    generateBookingLink: (service) => {
        const baseUrl = 'https://calendly.com/concerto-cyber';
        const serviceParam = service ? `?service=${encodeURIComponent(service)}` : '';
        return `${baseUrl}${serviceParam}`;
    }
};

// Make utilities available globally
// window.ConcertoUtils = ConcertoUtils;

// Modal functionality for SOAR platforms and security tools
const modalData = {
    'paloalto-modal': {
        title: 'Palo Alto Networks XSOAR',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Industry-Leading SOAR Platform</p>
                <p>Palo Alto Networks Cortex XSOAR is the market-leading Security Orchestration, Automation, and Response platform. We provide comprehensive implementation and optimization services.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our XSOAR Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Platform deployment and configuration</li>
                            <li>• Custom playbook development</li>
                            <li>• Integration with 500+ security tools</li>
                            <li>• Advanced automation workflows</li>
                            <li>• Incident response optimization</li>
                            <li>• Knowledge transfer</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Key Benefits:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 95% reduction in response times</li>
                            <li>• Automated threat hunting</li>
                            <li>• Comprehensive case management</li>
                            <li>• Real-time threat intelligence</li>
                            <li>• Scalable enterprise architecture</li>
                            <li>• Compliance automation</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Experience:</strong> 6+ years of deep XSOAR expertise with hundreds of successful deployments across Fortune 500 companies and government agencies.</p>
                </div>
            </div>
        `
    },
    'xsiam-modal': {
        title: 'Palo Alto Networks XSIAM',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Next-Generation SIEM with Built-in SOAR</p>
                <p>Palo Alto Networks XSIAM combines advanced SIEM capabilities with native SOAR functionality, providing a unified security operations platform.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">XSIAM Capabilities:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• AI-powered threat detection</li>
                            <li>• Automated incident response</li>
                            <li>• Cloud-native architecture</li>
                            <li>• Advanced analytics and ML</li>
                            <li>• Integrated threat intelligence</li>
                            <li>• Zero-touch automation</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our XSIAM Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Platform migration and setup</li>
                            <li>• Custom detection rules</li>
                            <li>• Automation playbook creation</li>
                            <li>• Data source integration</li>
                            <li>• Performance optimization</li>
                            <li>• Advanced use case development</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Perfect For:</strong> Organizations seeking a unified SIEM/SOAR solution with advanced AI capabilities and cloud-native scalability.</p>
                </div>
            </div>
        `
    },
    'splunk-modal': {
        title: 'Splunk SOAR',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Enterprise Security Automation Platform</p>
                <p>Splunk SOAR (formerly Phantom) provides powerful security orchestration and automation capabilities with extensive integration options.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Splunk SOAR Features:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Visual playbook designer</li>
                            <li>• 300+ pre-built integrations</li>
                            <li>• Advanced case management</li>
                            <li>• Custom app development</li>
                            <li>• Robust API framework</li>
                            <li>• Enterprise scalability</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our Expertise:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Complete platform deployment</li>
                            <li>• Custom playbook development</li>
                            <li>• Integration architecture</li>
                            <li>• Performance tuning</li>
                            <li>• Advanced automation workflows</li>
                            <li>• Training and certification</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Ideal For:</strong> Large enterprises requiring robust automation capabilities with extensive customization and integration requirements.</p>
                </div>
            </div>
        `
    },
    'microsoft-modal': {
        title: 'Microsoft Sentinel',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Cloud-Native SIEM and SOAR Solution</p>
                <p>Microsoft Sentinel provides intelligent security analytics and threat response capabilities with seamless Azure integration.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Sentinel Capabilities:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Cloud-native SIEM/SOAR</li>
                            <li>• AI-powered analytics</li>
                            <li>• Logic Apps automation</li>
                            <li>• Azure ecosystem integration</li>
                            <li>• Threat hunting workbooks</li>
                            <li>• Compliance dashboards</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Sentinel deployment and config</li>
                            <li>• Custom detection rules</li>
                            <li>• Playbook automation</li>
                            <li>• Data connector setup</li>
                            <li>• Workbook customization</li>
                            <li>• Azure integration optimization</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Best For:</strong> Microsoft-centric environments seeking cloud-native security operations with tight Azure integration and cost-effective scaling.</p>
                </div>
            </div>
        `
    },
    'google-modal': {
        title: 'Google SecOps (Chronicle)',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Google Cloud Security Operations Platform</p>
                <p>Google SecOps (formerly Chronicle) leverages Google's infrastructure and AI capabilities for advanced threat detection and response.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">SecOps Features:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Google-scale data processing</li>
                            <li>• Advanced threat hunting</li>
                            <li>• Machine learning analytics</li>
                            <li>• Cloud-native architecture</li>
                            <li>• Integrated threat intelligence</li>
                            <li>• Automated response actions</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Implementation Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Platform setup and configuration</li>
                            <li>• Data ingestion optimization</li>
                            <li>• Custom detection development</li>
                            <li>• Automation workflow creation</li>
                            <li>• Integration with GCP services</li>
                            <li>• Performance optimization</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Advantages:</strong> Massive scalability, Google's AI/ML capabilities, and seamless integration with Google Cloud Platform services.</p>
                </div>
            </div>
        `
    },
    'tines-modal': {
        title: 'Tines',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">No-Code Security Automation Platform</p>
                <p>Tines provides an intuitive, story-based approach to security automation that empowers teams to build complex workflows without coding.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Tines Strengths:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Visual story-based workflows</li>
                            <li>• No-code automation builder</li>
                            <li>• Flexible API integrations</li>
                            <li>• Rapid deployment capabilities</li>
                            <li>• User-friendly interface</li>
                            <li>• Cost-effective scaling</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our Tines Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Platform implementation</li>
                            <li>• Story development and optimization</li>
                            <li>• Custom integration creation</li>
                            <li>• Workflow automation design</li>
                            <li>• Team training and enablement</li>
                            <li>• Best practices implementation</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Perfect For:</strong> Teams seeking rapid automation deployment with minimal technical complexity and maximum flexibility.</p>
                </div>
            </div>
        `
    },
    'other-modal': {
        title: 'Any Other SOAR Platform',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Platform-Agnostic SOAR Expertise</p>
                <p>Our team has extensive experience across the entire SOAR ecosystem. We can work with any platform to deliver exceptional security automation results.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Additional Platforms:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• IBM QRadar SOAR</li>
                            <li>• Rapid7 InsightConnect</li>
                            <li>• Siemplify (now Google)</li>
                            <li>• Swimlane</li>
                            <li>• D3 Security</li>
                            <li>• Custom/Open Source Solutions</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Universal Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Platform evaluation and selection</li>
                            <li>• Migration between platforms</li>
                            <li>• Custom integration development</li>
                            <li>• Workflow optimization</li>
                            <li>• Performance tuning</li>
                            <li>• Training and support</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Our Approach:</strong> We focus on understanding your unique requirements and delivering optimal solutions regardless of the platform technology.</p>
                </div>
            </div>
        `
    },
    'xsiam-siem-modal': {
        title: 'Next Gen SIEM (XSIAM)',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Revolutionary SIEM with Native SOAR</p>
                <p>XSIAM represents the next generation of SIEM technology, combining advanced analytics, AI-powered detection, and native automation capabilities.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Next-Gen SIEM Features:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• AI-powered threat detection</li>
                            <li>• Behavioral analytics</li>
                            <li>• Cloud-native architecture</li>
                            <li>• Real-time processing</li>
                            <li>• Integrated automation</li>
                            <li>• Advanced visualization</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Implementation Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• SIEM migration and deployment</li>
                            <li>• Data source integration</li>
                            <li>• Custom detection rules</li>
                            <li>• Automation workflow setup</li>
                            <li>• Performance optimization</li>
                            <li>• Analyst training</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Key Advantage:</strong> Eliminates the traditional SIEM/SOAR integration complexity by providing unified threat detection and automated response in a single platform.</p>
                </div>
            </div>
        `
    },
    'siem-modal': {
        title: 'SIEM Integration',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Comprehensive SIEM Platform Integration</p>
                <p>We provide expert integration services for all major SIEM platforms, ensuring seamless data flow and optimal security operations.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Supported SIEM Platforms:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Splunk Enterprise Security</li>
                            <li>• IBM QRadar</li>
                            <li>• ArcSight ESM</li>
                            <li>• LogRhythm</li>
                            <li>• RSA NetWitness</li>
                            <li>• Elastic Security</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Integration Services:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• API connectivity setup</li>
                            <li>• Data normalization</li>
                            <li>• Alert correlation</li>
                            <li>• Custom parser development</li>
                            <li>• Performance optimization</li>
                            <li>• Compliance reporting</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Expertise:</strong> 10+ years of SIEM integration experience with deep knowledge of data formats, APIs, and optimization techniques.</p>
                </div>
            </div>
        `
    },
    'threat-intel-modal': {
        title: 'Threat Intelligence',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Advanced Threat Intelligence Integration</p>
                <p>Enhance your security operations with comprehensive threat intelligence feeds and automated enrichment capabilities.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Threat Intel Sources:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Commercial threat feeds</li>
                            <li>• Open source intelligence</li>
                            <li>• Government threat sharing</li>
                            <li>• Industry-specific intel</li>
                            <li>• Internal threat research</li>
                            <li>• Dark web monitoring</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Integration Capabilities:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated IOC enrichment</li>
                            <li>• Real-time feed processing</li>
                            <li>• Custom intelligence workflows</li>
                            <li>• Threat hunting automation</li>
                            <li>• Attribution analysis</li>
                            <li>• Risk scoring algorithms</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Value:</strong> Transform raw threat data into actionable intelligence that automatically enhances detection and response capabilities.</p>
                </div>
            </div>
        `
    },
    'edr-modal': {
        title: 'Endpoint Detection & Response',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">EDR Platform Integration & Automation</p>
                <p>Seamlessly integrate endpoint detection and response platforms with your SOAR environment for automated threat containment.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Supported EDR Platforms:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• CrowdStrike Falcon</li>
                            <li>• Microsoft Defender for Endpoint</li>
                            <li>• SentinelOne</li>
                            <li>• Carbon Black</li>
                            <li>• Cortex XDR</li>
                            <li>• Trend Micro Vision One</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Automation Capabilities:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated endpoint isolation</li>
                            <li>• Malware analysis workflows</li>
                            <li>• Forensic data collection</li>
                            <li>• Threat hunting automation</li>
                            <li>• Remediation orchestration</li>
                            <li>• Compliance reporting</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Reduce endpoint incident response times from hours to minutes with automated containment and investigation workflows.</p>
                </div>
            </div>
        `
    },
    'network-modal': {
        title: 'Network Security',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Network Security Tool Integration</p>
                <p>Orchestrate your network security infrastructure for automated threat detection, analysis, and response across your entire network perimeter.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Network Security Tools:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Next-gen firewalls (NGFW)</li>
                            <li>• Intrusion detection systems</li>
                            <li>• Network traffic analyzers</li>
                            <li>• DNS security platforms</li>
                            <li>• Network access control</li>
                            <li>• DDoS protection systems</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Automation Features:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated rule updates</li>
                            <li>• Traffic analysis workflows</li>
                            <li>• Threat blocking automation</li>
                            <li>• Network segmentation</li>
                            <li>• Incident correlation</li>
                            <li>• Compliance monitoring</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 p-4 rounded-lg mt-4">
                        <p class="text-sm"><strong>Benefit:</strong> Create a unified network defense that automatically adapts to emerging threats and maintains optimal security posture.</p>
                </div>
            </div>
        `
    },
    'cloud-modal': {
        title: 'Cloud Security',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Cloud Security Platform Integration</p>
                <p>Secure your cloud infrastructure with automated security orchestration across multi-cloud and hybrid environments.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Cloud Platforms:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• AWS Security Hub & GuardDuty</li>
                            <li>• Azure Security Center & Sentinel</li>
                            <li>• Google Cloud Security Command Center</li>
                            <li>• Multi-cloud CSPM tools</li>
                            <li>• Container security platforms</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our Cloud Security Experience:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 15+ years in cloud security architecture</li>
                            <li>• 200+ cloud security implementations</li>
                            <li>• Multi-cloud SOAR orchestration specialist</li>
                            <li>• DevSecOps automation expert</li>
                            <li>• Cloud compliance automation (SOC2, PCI-DSS)</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Achieve consistent security posture across all cloud environments with automated compliance monitoring and threat response.</p>
                </div>
            </div>
        `
    },
    'incident-response-modal': {
        title: 'Incident Response Automation',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Automated Incident Response Orchestration</p>
                <p>Transform your incident response from manual chaos to orchestrated precision with intelligent automation that accelerates containment and recovery.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Automation Capabilities:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated alert triage and enrichment</li>
                            <li>• Dynamic playbook execution</li>
                            <li>• Cross-platform evidence collection</li>
                            <li>• Automated containment actions</li>
                            <li>• Real-time stakeholder notifications</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our IR Expertise:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 20+ years incident response experience</li>
                            <li>• 500+ IR playbooks developed</li>
                            <li>• SANS certified incident handlers</li>
                            <li>• Fortune 500 IR automation specialist</li>
                            <li>• 90% reduction in MTTR achieved</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Reduce mean time to containment from hours to minutes while ensuring consistent, repeatable incident response processes.</p>
                </div>
            </div>
        `
    },
    'threat-hunting-modal': {
        title: 'Threat Hunting Automation',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Automated Threat Hunting Operations</p>
                <p>Enhance your threat hunting capabilities with automated hypothesis testing, data correlation, and threat intelligence integration for proactive threat detection.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Hunting Automation:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated IOC and TTPs searches</li>
                            <li>• Behavioral analytics automation</li>
                            <li>• Threat intelligence correlation</li>
                            <li>• Hypothesis-driven hunting workflows</li>
                            <li>• Automated evidence preservation</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our Hunting Experience:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 15+ years threat hunting expertise</li>
                            <li>• 300+ hunting playbooks created</li>
                            <li>• MITRE ATT&CK framework specialist</li>
                            <li>• Advanced persistent threat detection</li>
                            <li>• Custom hunting tool development</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Discover advanced threats 75% faster with automated hunting workflows that continuously search for indicators of compromise.</p>
                </div>
            </div>
        `
    },
    'vulnerability-mgmt-modal': {
        title: 'Vulnerability Management Automation',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Automated Vulnerability Lifecycle Management</p>
                <p>Streamline vulnerability management from discovery to remediation with intelligent prioritization, automated patching workflows, and risk-based decision making.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">VM Automation:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated vulnerability scanning</li>
                            <li>• Risk-based prioritization</li>
                            <li>• Patch management orchestration</li>
                            <li>• Exception workflow automation</li>
                            <li>• Compliance reporting automation</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our VM Expertise:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 18+ years vulnerability management</li>
                            <li>• 1000+ VM workflows automated</li>
                            <li>• CVSS and EPSS scoring specialist</li>
                            <li>• Enterprise patch management expert</li>
                            <li>• 80% faster remediation achieved</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Reduce vulnerability exposure window by 80% with automated prioritization and orchestrated remediation workflows.</p>
                </div>
            </div>
        `
    },
    'compliance-modal': {
        title: 'Compliance Reporting Automation',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Automated Compliance & Reporting</p>
                <p>Ensure continuous compliance with automated evidence collection, real-time monitoring, and dynamic reporting for multiple regulatory frameworks.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">Compliance Automation:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Automated evidence collection</li>
                            <li>• Real-time compliance monitoring</li>
                            <li>• Dynamic report generation</li>
                            <li>• Control testing automation</li>
                            <li>• Audit trail maintenance</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our Compliance Experience:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 12+ years compliance automation</li>
                            <li>• SOC2, PCI-DSS, HIPAA, ISO27001 expert</li>
                            <li>• 200+ compliance frameworks automated</li>
                            <li>• GRC platform integration specialist</li>
                            <li>• 95% audit preparation time reduction</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Achieve continuous compliance readiness with automated evidence collection and real-time control monitoring.</p>
                </div>
            </div>
        `
    },
    'uba-modal': {
        title: 'User Behavior Analytics Automation',
        content: `
            <div class="space-y-4">
                <p class="text-lg font-semibold text-concerto-gold">Automated User Behavior Analytics</p>
                <p>Detect insider threats and compromised accounts with automated behavioral analysis, anomaly detection, and risk-based response orchestration.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 class="font-semibold text-white mb-2">UBA Automation:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• Behavioral baseline establishment</li>
                            <li>• Anomaly detection automation</li>
                            <li>• Risk scoring and prioritization</li>
                            <li>• Automated investigation workflows</li>
                            <li>• Adaptive response orchestration</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-2">Our UBA Expertise:</h4>
                        <ul class="space-y-1 text-sm">
                            <li>• 10+ years behavioral analytics</li>
                            <li>• Machine learning model optimization</li>
                            <li>• Insider threat detection specialist</li>
                            <li>• 150+ UBA implementations</li>
                            <li>• 85% false positive reduction achieved</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p class="text-sm"><strong>Outcome:</strong> Identify insider threats and account compromises 90% faster with automated behavioral analysis and response.</p>
                </div>
            </div>
        `
    }
};

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    if (modalData[modalId]) {
        title.textContent = modalData[modalId].title;
        content.innerHTML = modalData[modalId].content;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add to existing ConcertoWebsite object
window.ConcertoWebsite = {
    ...window.ConcertoWebsite,
    openModal,
    closeModal
};


function sendEmail() {
  const subject = `Consultation Request`;
  const to = 'info@concertocyber.com';
  const cr = '%0D%0A';
  const body = `Hello Concerto,

I'd like to request a consultation for our automation needs.

My name: 
Company: 
Current Automation Product (if any): 
Challenges you're facing: 
Goals for our engagement: 

Kind Regards,

<Your Name Here>
`.replaceAll('\n', cr);
  window.location.href=`mailto:${to}?subject=${subject}&body=${body}`
}
