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
        // Navigation
        'Inicio': 'Home',
        'Características': 'Features',
        'Precios': 'Pricing',
        'Testimonios': 'Testimonials',
        'Contacto': 'Contact',
        
        // Hero Section
        'Controlá tu stock con': 'Control your inventory with',
        'precisión': 'precision',
        'y sin complicaciones': 'and without complications',
        'Controlá tu stock con precisión y sin complicaciones': 'Control your inventory with precision and without complications',
        'Inventario App te ayuda a administrar tus productos, ventas y reportes desde tu celular o tablet.': 'Inventory App helps you manage your products, sales and reports from your phone or tablet.',
        'Funciona 100% offline': 'Works 100% offline',
        'y protege tus datos con respaldos automáticos.': 'and protects your data with automatic backups.',
        'Probar Gratis': 'Try Free',
        'Descargar en Google Play': 'Download on Google Play',
        
        // Stats
        'Productos Gratis': 'Free Products',
        'Para Empezar': 'To Start',
        '0 costo': '0 cost',
        
        // Floating cards
        'Stock en tiempo real': 'Real-time stock',
        '100% Seguro': '100% Secure',
        'Sin Internet': 'No Internet',
        
        // Features Section
        'Todo lo que necesitas para tu negocio': 'Everything you need for your business',
        'Funcionalidades diseñadas específicamente para pequeños negocios y emprendimientos': 'Features designed specifically for small businesses and entrepreneurs',
        
        'Gestión en Tiempo Real': 'Real-Time Management',
        'Controla tu stock al instante. Cada entrada y salida se registra automáticamente con alertas de bajo inventario.': 'Control your stock instantly. Every entry and exit is automatically recorded with low inventory alerts.',
        
        'Reportes Automáticos': 'Automatic Reports',
        'Estadísticas detalladas, gráficos de ventas y análisis de rentabilidad. Exporta todo a Excel con un clic.': 'Detailed statistics, sales charts and profitability analysis. Export everything to Excel with one click.',
        
        'Escaneo de Códigos': 'Barcode Scanning',
        'Escanea códigos de barras para agregar productos rápidamente. Compatible con todos los formatos estándar.': 'Scan barcodes to add products quickly. Compatible with all standard formats.',
        
        'Modo Offline Completo': 'Complete Offline Mode',
        'Funciona perfectamente sin conexión a internet. Todos tus datos se guardan localmente en tu dispositivo.': 'Works perfectly without internet connection. All your data is stored locally on your device.',
        
        'Control de Usuarios': 'User Control',
        'Protege tu información con PIN y huella dactilar. Controla quién puede acceder a tu inventario.': 'Protect your information with PIN and fingerprint. Control who can access your inventory.',
        
        'Catálogos PDF': 'PDF Catalogs',
        'Crea catálogos profesionales de tus productos con imágenes, precios y descripciones. Perfecto para mostrar a clientes.': 'Create professional catalogs of your products with images, prices and descriptions. Perfect for showing to customers.',
        
        'Sincronización Segura': 'Secure Synchronization',
        'Respaldos automáticos en Google Drive. Tus datos siempre protegidos y sincronizados entre dispositivos.': 'Automatic backups to Google Drive. Your data always protected and synchronized between devices.',
        
        // Security Section
        'Tus datos siempre protegidos': 'Your data always protected',
        'Guardamos todo con cifrado de nivel bancario y copias automáticas.': 'We store everything with bank-level encryption and automatic backups.',
        'Tu información nunca sale de tus dispositivos sin tu autorización.': 'Your information never leaves your devices without your authorization.',
        'Guardamos todo con cifrado de nivel bancario y copias automáticas. Tu información nunca sale de tus dispositivos sin tu autorización.': 'We store everything with bank-level encryption and automatic backups. Your information never leaves your devices without your authorization.',
        'Cifrado de extremo a extremo': 'End-to-end encryption',
        'Respaldos automáticos': 'Automatic backups',
        'Almacenamiento local seguro': 'Secure local storage',
        
        // Testimonials
        'Lo que dicen nuestros usuarios': 'What our users say',
        'Miles de negocios ya confían en Inventario App': 'Thousands of businesses already trust Inventory App',
        '"Desde que uso Inventario App, mi control de stock es perfecto. Ya no pierdo ventas por falta de productos."': '"Since I use Inventory App, my stock control is perfect. I no longer lose sales due to lack of products."',
        '"La función offline es increíble. Puedo trabajar en mi almacén sin preocuparme por la conexión a internet."': '"The offline function is incredible. I can work in my warehouse without worrying about internet connection."',
        '"Los reportes automáticos me ayudan a tomar mejores decisiones. Ahora sé exactamente qué productos vender más."': '"Automatic reports help me make better decisions. Now I know exactly which products to sell more."',
        'Desde que uso Inventario App, mi control de stock es perfecto. Ya no pierdo ventas por falta de productos.': 'Since I use Inventory App, my stock control is perfect. I no longer lose sales due to lack of products.',
        'La función offline es increíble. Puedo trabajar en mi almacén sin preocuparme por la conexión a internet.': 'The offline function is incredible. I can work in my warehouse without worrying about internet connection.',
        'Los reportes automáticos me ayudan a tomar mejores decisiones. Ahora sé exactamente qué productos vender más.': 'Automatic reports help me make better decisions. Now I know exactly which products to sell more.',
        'Tienda de Ropa': 'Clothing Store',
        'Ferretería': 'Hardware Store',
        'Minimarket': 'Convenience Store',
        
        // Pricing
        'Planes diseñados para tu negocio': 'Plans designed for your business',
        'Comienza gratis y actualiza cuando tu negocio crezca': 'Start free and upgrade when your business grows',
        'Plan Gratuito': 'Free Plan',
        'para siempre': 'forever',
        'Plan Premium': 'Premium Plan',
        'pago único': 'one-time payment',
        'Más Popular': 'Most Popular',
        
        // Features list
        'Hasta 25 productos': 'Up to 25 products',
        '5 categorías': '5 categories',
        'Funcionamiento offline': 'Offline operation',
        'Alertas de bajo stock': 'Low stock alerts',
        'Reportes básicos': 'Basic reports',
        'Hasta 100 movimientos': 'Up to 100 movements',
        'Soporte por email': 'Email support',
        'Productos ilimitados': 'Unlimited products',
        'Categorías ilimitadas': 'Unlimited categories',
        'Escaneo de códigos de barras': 'Barcode scanning',
        'Reportes avanzados con gráficos': 'Advanced reports with charts',
        'Exportación a CSV/Excel': 'CSV/Excel export',
        'Catálogos PDF profesionales': 'Professional PDF catalogs',
        'Movimientos ilimitados': 'Unlimited movements',
        'Respaldos automáticos en nube': 'Automatic cloud backups',
        'Seguridad con PIN y huella': 'PIN and fingerprint security',
        'Soporte prioritario': 'Priority support',
        'Empezar Gratis': 'Start Free',
        'Elegir Premium': 'Choose Premium',
        
        // FAQ
        'Preguntas Frecuentes': 'Frequently Asked Questions',
        'Resolvemos tus dudas más comunes': 'We solve your most common doubts',
        '¿Puedo usar la app sin conexión a internet?': 'Can I use the app without internet connection?',
        '¡Absolutamente! Inventario App está diseñada para funcionar 100% offline. Todos tus datos se guardan localmente en tu dispositivo, por lo que puedes gestionar tu inventario sin necesidad de conexión a internet.': 'Absolutely! Inventory App is designed to work 100% offline. All your data is stored locally on your device, so you can manage your inventory without needing an internet connection.',
        '¿Mis datos se guardan en la nube?': 'Is my data stored in the cloud?',
        'En el plan gratuito, todos los datos se guardan únicamente en tu dispositivo. Con el plan Premium, puedes activar respaldos automáticos en Google Drive para mayor seguridad, pero siempre bajo tu control.': 'In the free plan, all data is stored only on your device. With the Premium plan, you can activate automatic backups to Google Drive for greater security, but always under your control.',
        '¿Puedo exportar mis productos a Excel?': 'Can I export my products to Excel?',
        'Sí, con el plan Premium puedes exportar todos tus datos (productos, movimientos, reportes) a formato CSV que es totalmente compatible con Excel y otras hojas de cálculo.': 'Yes, with the Premium plan you can export all your data (products, movements, reports) to CSV format that is fully compatible with Excel and other spreadsheets.',
        '¿Qué pasa si cambio de teléfono?': 'What happens if I change phones?',
        'Con el plan Premium y los respaldos automáticos activados, puedes restaurar todos tus datos en el nuevo dispositivo. También puedes crear respaldos manuales para transferir tu información.': 'With the Premium plan and automatic backups enabled, you can restore all your data on the new device. You can also create manual backups to transfer your information.',
        '¿La app funciona en tablets?': 'Does the app work on tablets?',
        '¡Por supuesto! Inventario App está optimizada para funcionar tanto en teléfonos como en tablets Android, adaptándose perfectamente a cualquier tamaño de pantalla.': 'Of course! Inventory App is optimized to work on both phones and Android tablets, adapting perfectly to any screen size.',
        '¿Hay límite en el número de productos?': 'Is there a limit on the number of products?',
        'El plan gratuito permite hasta 25 productos y 100 movimientos, perfecto para empezar. Con el plan Premium no hay límites: puedes agregar tantos productos y movimientos como necesites.': 'The free plan allows up to 25 products and 100 movements, perfect to get started. With the Premium plan there are no limits: you can add as many products and movements as you need.',
        '¿Puedo crear catálogos de mis productos?': 'Can I create catalogs of my products?',
        'Sí, con el plan Premium puedes generar catálogos PDF profesionales de tus productos con imágenes, precios y descripciones. Ideal para mostrar a clientes o para uso comercial.': 'Yes, with the Premium plan you can generate professional PDF catalogs of your products with images, prices and descriptions. Ideal for showing to customers or for commercial use.',
        
        // Contact
        '¿Necesitas ayuda?': 'Need help?',
        'Estamos aquí para ayudarte a hacer crecer tu negocio. Contáctanos y te responderemos lo antes posible.': 'We are here to help you grow your business. Contact us and we will respond as soon as possible.',
        'Chat en vivo': 'Live chat',
        'Lun - Vie, 9:00 - 18:00': 'Mon - Fri, 9:00 - 18:00',
        'Centro de ayuda': 'Help center',
        'Guías y tutoriales': 'Guides and tutorials',
        'Nombre': 'Name',
        'Asunto': 'Subject',
        'Selecciona un tema': 'Select a topic',
        'Soporte técnico': 'Technical support',
        'Consulta de ventas': 'Sales inquiry',
        'Sugerencia': 'Suggestion',
        'Otro': 'Other',
        'Mensaje': 'Message',
        'Enviar Mensaje': 'Send Message',
        
        // Footer
        'La solución completa para gestionar tu inventario sin complicaciones. Funciona offline y protege tus datos.': 'The complete solution to manage your inventory without complications. Works offline and protects your data.',
        'Producto': 'Product',
        'Descargar': 'Download',
        'Actualizaciones': 'Updates',
        'Soporte': 'Support',
        'Tutoriales': 'Tutorials',
        'Legal': 'Legal',
        'Política de privacidad': 'Privacy policy',
        'Términos de uso': 'Terms of use',
        'Cookies': 'Cookies',
        'Licencias': 'Licenses',
        '© 2025 Inventario App. Todos los derechos reservados.': '© 2025 Inventory App. All rights reserved.',
        'Todos los derechos reservados.': 'All rights reserved.',
        'Hecho con ❤️ para pequeños negocios': 'Made with ❤️ for small businesses'
    };

    // Traducir textos
    Object.entries(translations).forEach(([spanish, english]) => {
        // Método 1: Buscar elementos por contenido exacto
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            // Solo elementos que no tienen hijos de texto
            if (el.children.length === 0 && el.textContent.trim() === spanish) {
                el.textContent = english;
            }
            // Para elementos con hijos, buscar nodos de texto
            else if (el.childNodes.length > 0) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === spanish) {
                        node.textContent = english;
                    }
                });
            }
        });
        
        // Método 2: TreeWalker para nodos de texto
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            if (textNode.textContent.trim() === spanish) {
                textNode.textContent = english;
            }
        });
    });
    
    // Traducción especial para el título hero con span anidado
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.innerHTML.includes('Controlá tu stock con')) {
        heroTitle.innerHTML = heroTitle.innerHTML
            .replace('Controlá tu stock con', 'Control your inventory with')
            .replace('precisión', 'precision')
            .replace('y sin complicaciones', 'and without complications');
    }
    
    // Traducir atributos específicos
    const placeholders = {
        'Nombre': 'Name',
        'Email': 'Email',
        'Asunto': 'Subject',
        'Mensaje': 'Message'
    };
    
    Object.entries(placeholders).forEach(([spanish, english]) => {
        const inputs = document.querySelectorAll(`input[placeholder="${spanish}"], textarea[placeholder="${spanish}"]`);
        inputs.forEach(input => {
            input.placeholder = english;
        });
    });
}

// Actualizar textos a español (restaurar)
function updateTextsToSpanish() {
    // Recargar la página para restaurar el español original
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