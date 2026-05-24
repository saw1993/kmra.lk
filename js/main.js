/**
 * KMRA Global JavaScript (js/main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Navigation Active Link Highlighting ---
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Highlight if href equals current pageName, or if we are at home root pageName is empty and href is index.html
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- 2. Sticky Header Scroll Effect ---
  const header = document.querySelector('.main-header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run

  // --- 3. Mobile Navigation Menu Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-links');

  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    const mobileLinks = navList.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  }

  // --- 4. Scroll-Triggered Reveal Animations ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => revealObserver.observe(reveal));
  } else {
    // Fallback if IntersectionObserver is not supported
    reveals.forEach(reveal => reveal.classList.add('active'));
  }

  // --- 5. Gallery Filtering System ---
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (filterButtons.length > 0 && galleryCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button styling
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            // Re-trigger visual entry animations
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.transition = 'all 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- 6. Form Handlers & Submission validation ---
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      let isValid = true;
      
      // Simple validation example
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--error)';
          isValid = false;
        } else {
          input.style.borderColor = 'var(--neutral-border)';
        }
      });

      if (!isValid) {
        alert('Please fill in all required fields.');
        return;
      }

      // Success feedback animation
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = 'var(--success)';
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';

      setTimeout(() => {
        inquiryForm.reset();
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = 'var(--accent-teal)';
        submitBtn.innerHTML = originalText;
        alert('Thank you! Your inquiry has been sent successfully. We will get back to you shortly.');
      }, 1500);
    });
  }

  // Footer Newsletter Form Mock Handler
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (!emailInput.value.trim()) {
        return;
      }
      
      alert('Thank you for subscribing to KMRA Newsletter!');
      emailInput.value = '';
    });
  }
});
