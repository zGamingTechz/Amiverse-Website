// Download function
function downloadFromPlayStore() {
  const link = document.createElement('a');
  link.href = `https://play.google.com/store/apps/details?id=com.sourabh.av&pcampaignid=web_share`;
  link.click();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Register GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initAnimations();
  }
  
  // Initialize all features
  initNavigation();
  initScrollEffects();
  initMobileMenu();
  initBackToTop();
  initFloatingShapes();
});

// ==================== GSAP Animations ====================
function initAnimations() {
  // Hero animations
  const heroTl = gsap.timeline();
  
  heroTl.to('.hero-content', {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .to('.hero-image', {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.7');
  
  // Section title animations
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
  
  // Section subtitle animations
  gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
    gsap.to(subtitle, {
      scrollTrigger: {
        trigger: subtitle,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });
  });
  
  // About section animations
  gsap.to('.about-text', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 75%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.to('.about-visual', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 75%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });
  
  // Feature cards animation
  gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Team cards animation
  gsap.utils.toArray('.team-card').forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out'
    });
  });
  
  // Contact cards animation
  gsap.utils.toArray('.contact-card').forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out'
    });
  });
  
  // Download section animations
  gsap.to('.download-title', {
    scrollTrigger: {
      trigger: '.download-section',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.to('.download-subtitle', {
    scrollTrigger: {
      trigger: '.download-section',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });
}

// ==================== Navigation ====================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
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
}

// ==================== Scroll Effects ====================
function initScrollEffects() {
  // Parallax effect for shapes
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
      const speed = (index + 1) * 0.05;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ==================== Mobile Menu ====================
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = this.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

// ==================== Back to Top Button ====================
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ==================== Floating Shapes Animation ====================
function initFloatingShapes() {
  if (typeof gsap !== 'undefined') {
    // Animate floating shapes
    gsap.utils.toArray('.shape').forEach((shape, index) => {
      gsap.to(shape, {
        y: '+=50',
        x: '+=30',
        rotation: 180,
        duration: 15 + (index * 2),
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    });
    
    // Animate download section shapes
    gsap.utils.toArray('.download-shapes .shape').forEach((shape, index) => {
      gsap.to(shape, {
        y: '-=80',
        x: '-=40',
        rotation: -180,
        duration: 20 + (index * 3),
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    });
  }
}

// ==================== Intersection Observer for Animations ====================
// Fallback for browsers without GSAP
if (typeof IntersectionObserver !== 'undefined') {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements if GSAP is not available
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.feature-card, .team-card, .contact-card, .section-title, .section-subtitle').forEach(el => {
      observer.observe(el);
    });
  }
}

// ==================== Performance Optimization ====================
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Add loading indicator for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });
});

// ==================== Enhanced User Experience ====================
// Add hover effect sound
document.querySelectorAll('.btn, .feature-card, .team-card').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Smooth reveal on page load
window.addEventListener('load', function() {
  document.body.style.opacity = '1';
});

// Add initial body opacity for smooth fade in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in-out';

console.log('AmiVerse website loaded successfully! 🚀');