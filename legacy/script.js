document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. GSAP Animations & ScrollTrigger ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Global Hero Animations
        gsap.to('.gsap-fade-in', { opacity: 1, duration: 1.5, ease: 'power3.out' });
        gsap.to('.gsap-slide-up', { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out', delay: 0.3 });

        const staggerTexts = document.querySelectorAll('.gsap-stagger-text span');
        if(staggerTexts.length > 0) {
            gsap.to(staggerTexts, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.5 });
        }

        // Scroll Trigger Animations for sections
        document.querySelectorAll('.gsap-scroll-trigger').forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1, y: 0, duration: 1, ease: 'power3.out'
            });
        });

        // Education Timeline Items Stagger
        const timelineItems = document.querySelectorAll('.gsap-timeline-item');
        if(timelineItems.length > 0) {
            gsap.to(timelineItems, {
                scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' },
                opacity: 1, x: 0, duration: 0.8, stagger: 0.3, ease: 'power3.out'
            });
        }

        // Project Cards
        const projectCards = document.querySelectorAll('.gsap-project-card');
        if(projectCards.length > 0) {
            gsap.to(projectCards, {
                scrollTrigger: { trigger: '.long-videos-grid', start: 'top 85%' },
                opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)'
            });
        }

        // 3D Services Stack Fanning
        const serviceStack = document.getElementById('service-stack');
        if (serviceStack) {
            const cards = serviceStack.querySelectorAll('.stack-card');
            gsap.set(cards, { rotateZ: 0, rotateY: 0, rotateX: 0, transformOrigin: "bottom center", y: 50, opacity: 0 });

            ScrollTrigger.create({
                trigger: '.services-container-new',
                start: 'top 70%',
                onEnter: () => {
                    gsap.to(cards, {
                        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                        onComplete: () => {
                            cards.forEach((card, index) => {
                                const spread = (index - Math.floor(cards.length / 2)) * 12;
                                gsap.to(card, {
                                    rotateZ: spread, x: spread * 2, y: Math.abs(spread) * -1,
                                    duration: 1, ease: 'elastic.out(1, 0.75)', delay: index * 0.1
                                });
                            });
                        }
                    });
                }
            });

            cards.forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { y: '-=20', scale: 1.05, zIndex: 100, duration: 0.3, ease: 'power2.out' });
                });
                card.addEventListener('mouseleave', () => {
                    const index = Array.from(cards).indexOf(card);
                    const spread = (index - Math.floor(cards.length / 2)) * 12;
                    gsap.to(card, { y: Math.abs(spread) * -1, scale: 1, zIndex: index + 1, duration: 0.3, ease: 'power2.out' });
                });
            });
        }

        // Contact Section Stagger (Old)
        const contactEls = document.querySelectorAll('.gsap-contact-stagger');
        if(contactEls.length > 0) {
            gsap.to(contactEls, {
                scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
                opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
            });
        }

        // New Premium Bento-Box Stagger Reveal
        const staggerContainers = document.querySelectorAll('.gsap-stagger-container');
        staggerContainers.forEach(container => {
            const cards = container.querySelectorAll('.glass-card, .stagger-item');
            gsap.fromTo(cards, 
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.2)'
                }
            );
        });
    }

    // --- 3. Marquee Infinite Scroll (Vanilla CSS handles animation, just need clone for safety if desired, but CSS infinite scroll is better) ---
    // Actually, CSS handles the marquee perfectly with duplicate text. We can skip JS clone.

    // --- 4. Reviews Slider Logic ---
    const track = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = Array.from(track.children);
        let currentIndex = 0;

        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const updateSlider = () => {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 32;
            const moveAmount = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;

            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
        };

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }

    // --- 5. Theme Toggle Logic ---
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtns.forEach(btn => btn.innerHTML = '<i class="fa-solid fa-sun"></i>');
    }
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'light');
                themeToggleBtns.forEach(b => b.innerHTML = '<i class="fa-solid fa-moon"></i>');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
                themeToggleBtns.forEach(b => b.innerHTML = '<i class="fa-solid fa-sun"></i>');
            }
        });
    });
});
