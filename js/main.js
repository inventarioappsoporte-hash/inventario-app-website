// JavaScript principal para Inventario App Website

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollAnimations();
    initFAQ();
    initContactForm();
    initLanguageSelector();
    initScrollIndicator();
    initCounters();
    initParallax();
    initScreenSlider();
    
    console.log('🚀 Inventario App Website cargado correctamente');
});

// Navegación móvil
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono del menú
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fija
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observar elementos con animaciones
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Agregar clases de animación a elementos específicos
    const animatedElements = [
        '.feature-card',
        '.testimonial-card',
        '.pricing-card',
        '.faq-item'
    ];

    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerrar todas las preguntas
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
            });

            // Abrir la pregunta actual si no estaba activa
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Mostrar loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Enviando...';
            submitBtn.disabled = true;

            try {
                // Simular envío (aquí integrarías con tu backend)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Mostrar éxito
                showNotification('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
                contactForm.reset();

            } catch (error) {
                showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Selector de idioma
function initLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            
            // Actualizar botones activos
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Cambiar idioma (aquí implementarías la lógica de traducción)
            changeLanguage(lang);
        });
    });
}

// Cambiar idioma
function changeLanguage(lang) {
    // Guardar preferencia
    localStorage.setItem('preferred-language', lang);
    
    // Aquí implementarías la lógica de traducción
    if (lang === 'en') {
        // Cambiar textos a inglés
        updateTextsToEnglish();
    } else {
        // Mantener en español (por defecto)
        updateTextsToSpanish();
    }
    
    showNotification(`Idioma cambiado a ${lang === 'en' ? 'Inglés' : 'Español'}`, 'info');
}

// Actualizar textos a inglés
function updateTextsToEnglish() {
    const translations = {
        'Controlá tu stock con precisión y sin complicaciones': 'Control your inventory with precision and without complications',
        'Inventario App te ayuda a administrar tus productos, ventas y reportes desde tu celular o tablet.': 'Inventory App helps you manage your products, sales and reports from your phone or tablet.',
        'Probar Gratis': 'Try Free',
        'Descargar en Google Play': 'Download on Google Play',
        'Todo lo que necesitas para tu negocio': 'Everything you need for your business',
        'Funcionalidades diseñadas específicamente para pequeños negocios y emprendimientos': 'Features designed specifically for small businesses and entrepreneurs'
    };

    Object.entries(translations).forEach(([spanish, english]) => {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            if (el.textContent.trim() === spanish) {
                el.textContent = english;
            }
        });
    });
}

// Actualizar textos a español (restaurar)
function updateTextsToSpanish() {
    // Recargar la página para restaurar el español original
    // En una implementación real, tendrías un sistema de traducción más sofisticado
    location.reload();
}

// Indicador de scroll
function initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Contadores animados
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Efecto parallax
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i data-lucide="x"></i>
        </button>
    `;

    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        minWidth: '300px',
        animation: 'slideInRight 0.3s ease-out'
    });

    document.body.appendChild(notification);
    lucide.createIcons();

    // Auto-remove después de 5 segundos
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'alert-circle',
        warning: 'alert-triangle',
        info: 'info'
    };
    return icons[type] || 'info';
}

function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    return colors[type] || '#2196F3';
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Lazy loading de imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimizaciones de rendimiento
function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Aquí van los efectos de scroll
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Preload critical resources
    const preloadLinks = [
        'css/styles.css',
        'css/animations.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
    // En producción, aquí enviarías el error a un servicio de logging
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW falló: ', registrationError);
            });
    });
}

// Cargar idioma guardado
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== 'es') {
        const langBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        if (langBtn) {
            langBtn.click();
        }
    }
});

// Screen Slider para el hero
function initScreenSlider() {
    const screenshots = document.querySelectorAll('.app-screenshot');
    const indicators = document.querySelectorAll('.indicator');
    
    if (screenshots.length === 0) return;
    
    let currentIndex = 0;
    const totalScreens = screenshots.length;
    
    // Configurar transición automática
    const autoSlideInterval = 4000; // 4 segundos
    let slideTimer;
    
    function showScreen(index) {
        // Remover clases activas
        screenshots.forEach(screen => {
            screen.classList.remove('active', 'prev');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Agregar clase prev a la pantalla anterior
        if (currentIndex !== index) {
            screenshots[currentIndex].classList.add('prev');
        }
        
        // Activar nueva pantalla
        screenshots[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }
    
    function nextScreen() {
        const nextIndex = (currentIndex + 1) % totalScreens;
        showScreen(nextIndex);
    }
    
    function startAutoSlide() {
        slideTimer = setInterval(nextScreen, autoSlideInterval);
    }
    
    function stopAutoSlide() {
        if (slideTimer) {
            clearInterval(slideTimer);
        }
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            showScreen(index);
            // Reiniciar auto-slide después de interacción
            setTimeout(startAutoSlide, 2000);
        });
    });
    
    // Pausar en hover del teléfono
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.addEventListener('mouseenter', stopAutoSlide);
        phoneMockup.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Iniciar auto-slide
    startAutoSlide();
    
    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

// Animación adicional para slideOutRight
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);