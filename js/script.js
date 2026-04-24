document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (currentPath === itemHref || (currentPath === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Form Validation Logic
    
    // Helper function to set error
    const setError = (element, message) => {
        const formGroup = element.parentElement;
        const errorDisplay = formGroup.querySelector('.error-msg');
        
        errorDisplay.innerText = message;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
    };

    // Helper function to set success
    const setSuccess = element => {
        const formGroup = element.parentElement;
        const errorDisplay = formGroup.querySelector('.error-msg');
        
        errorDisplay.innerText = '';
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
    };

    // Helper to validate email
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            let isValid = true;

            const email = document.getElementById('email');
            const password = document.getElementById('password');

            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();

            if (emailValue === '') {
                setError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                setError(email, 'Provide a valid email address');
                isValid = false;
            } else {
                setSuccess(email);
            }

            if (passwordValue === '') {
                setError(password, 'Password is required');
                isValid = false;
            } else if (passwordValue.length < 8) {
                setError(password, 'Password must be at least 8 characters.');
                isValid = false;
            } else {
                setSuccess(password);
            }

            if (isValid) {
                // Simulate login success
                const btn = loginForm.querySelector('button');
                btn.innerText = 'Authenticating...';
                setTimeout(() => {
                    alert('Login successful! Welcome to AI Nexus.');
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            const nameValue = name.value.trim();
            const emailValue = email.value.trim();
            const messageValue = message.value.trim();

            if (nameValue === '') {
                setError(name, 'Name is required');
                isValid = false;
            } else {
                setSuccess(name);
            }

            if (emailValue === '') {
                setError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                setError(email, 'Provide a valid email address');
                isValid = false;
            } else {
                setSuccess(email);
            }

            if (messageValue === '') {
                setError(message, 'Message is required');
                isValid = false;
            } else if (messageValue.length < 10) {
                setError(message, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                setSuccess(message);
            }

            if (isValid) {
                // Simulate sending message
                const btn = contactForm.querySelector('button');
                btn.innerText = 'Sending...';
                setTimeout(() => {
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                    btn.innerText = 'Send Message';
                }, 1500);
            }
        });
    }
});
