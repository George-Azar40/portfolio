document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Theme Toggle Logic
    window.toggleTheme = () => {
        document.body.classList.toggle('light-theme');
        const themeIcon = document.querySelector('#theme-toggle ion-icon');
        if (document.body.classList.contains('light-theme')) {
            themeIcon.setAttribute('name', 'sunny-outline');
        } else {
            themeIcon.setAttribute('name', 'moon-outline');
        }
    };

    // Language Toggle Logic
    let currentLang = 'en';
    const words_en = ['Web Applications.', 'Intelligent Solutions.', 'Hardware Prototypes.', 'Scalable Architectures.', 'Efficient Algorithms.'];
    const words_ar = ['تطبيقات الويب.', 'حلول ذكية.', 'نماذج الأجهزة.', 'هندسة الأنظمة.', 'خوارزميات فعالة.'];
    let currentWordList = words_en;

    window.toggleLanguage = () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.getElementById('lang-toggle').textContent = currentLang === 'en' ? 'AR' : 'EN';

        currentWordList = currentLang === 'ar' ? words_ar : words_en;
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;

        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navCollapse = document.getElementById('navbarNav');
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // Dynamic Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = [
        'Web Applications.',
        'Intelligent Solutions.',
        'Hardware Prototypes.',
        'Scalable Architectures.',
        'Efficient Algorithms.'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = currentWordList[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();

    // Reveal on scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
