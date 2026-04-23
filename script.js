// ===========================
// DOM READY
// ===========================
document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Initial check

    // ===========================
    // MOBILE NAV TOGGLE
    // ===========================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ===========================
    // ACTIVE NAV LINK ON SCROLL
    // ===========================
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);

    // ===========================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ===========================
    const animateElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay) || 0;

                setTimeout(() => {
                    el.classList.add('animated');
                }, delay);

                observer.unobserve(el);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ===========================
    // COUNTER ANIMATION
    // ===========================
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(easedProgress * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===========================
    // SKILL BAR ANIMATION
    // ===========================
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
                skillBarObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillBarObserver.observe(bar));

    // ===========================
    // BACK TO TOP
    // ===========================
    const backToTop = document.getElementById('backToTop');

    const handleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===========================
    // CONTACT FORM
    // ===========================
    const contactForm = document.getElementById('contactForm');
    const formToast = document.getElementById('formToast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showToast('error', 'Semua field harus diisi!');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('error', 'Format email tidak valid!');
            return;
        }

        // Simulate sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Mengirim...</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
            showToast('success', 'Pesan berhasil dikirim! Terima kasih.');
            contactForm.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;

            // Hide toast after 4s
            setTimeout(() => {
                formToast.className = 'form-toast';
                formToast.style.display = 'none';
            }, 4000);
        }, 1500);
    });

    const showToast = (type, msg) => {
        formToast.className = `form-toast ${type}`;
        formToast.textContent = msg;
        formToast.style.display = 'block';
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // ===========================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================
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

    // ===========================
    // TYPING EFFECT ON HERO (Optional subtle)
    // ===========================
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(10px)';
        setTimeout(() => {
            heroBadge.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 300);
    }

    // ===========================
    // PARALLAX ORBS ON MOUSE MOVE
    // ===========================
    const orbs = document.querySelectorAll('.hero-orb');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        orbs.forEach((orb, i) => {
            const speed = i === 0 ? 20 : 15;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

});