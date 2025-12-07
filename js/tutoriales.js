// Tutoriales y Guías Rápidas - JavaScript

let tutorialesData = [];
let currentCategory = 'Todos';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initTutorials();
    initModal();
    initNavigation();
    console.log('🎬 Tutoriales cargados correctamente');
});

// Inicializar tutoriales
async function initTutorials() {
    try {
        showLoading();
        const response = await fetch('tutoriales.json');
        tutorialesData = await response.json();
        hideLoading();
        renderTutorials(tutorialesData);
        initFilters();
    } catch (error) {
        console.error('Error al cargar tutoriales:', error);
        showError();
    }
}

// Mostrar loading
function showLoading() {
    const grid = document.getElementById('tutorialsGrid');
    grid.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Cargando tutoriales...</p>
        </div>
    `;
}

// Ocultar loading
function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Mostrar error
function showError() {
    const grid = document.getElementById('tutorialsGrid');
    grid.innerHTML = `
        <div class="empty-state active">
            <i data-lucide="alert-circle"></i>
            <h3>Error al cargar tutoriales</h3>
            <p>Por favor, intenta recargar la página</p>
        </div>
    `;
    lucide.createIcons();
}

// Renderizar tutoriales
function renderTutorials(tutorials) {
    const grid = document.getElementById('tutorialsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (tutorials.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.add('active');
        lucide.createIcons();
        return;
    }
    
    emptyState.classList.remove('active');
    
    grid.innerHTML = tutorials.map((tutorial, index) => `
        <div class="tutorial-card" onclick="openModal(${tutorial.id})" style="animation-delay: ${index * 0.1}s">
            <div class="tutorial-thumbnail">
                <div class="play-icon">
                    <i data-lucide="play"></i>
                </div>
                <span class="tutorial-duration">${tutorial.duracion}</span>
            </div>
            <div class="tutorial-content">
                <span class="tutorial-category">${tutorial.categoria}</span>
                <h3>${tutorial.titulo}</h3>
                <p>${tutorial.descripcion}</p>
                <button class="tutorial-btn">
                    <i data-lucide="play-circle"></i>
                    Ver tutorial
                </button>
            </div>
        </div>
    `).join('');
    
    // Reinicializar iconos de Lucide
    lucide.createIcons();
}

// Inicializar filtros
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botón activo
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar tutoriales
            const category = btn.dataset.category;
            currentCategory = category;
            filterTutorials(category);
        });
    });
}

// Filtrar tutoriales por categoría
function filterTutorials(category) {
    if (category === 'Todos') {
        renderTutorials(tutorialesData);
    } else {
        const filtered = tutorialesData.filter(t => t.categoria === category);
        renderTutorials(filtered);
    }
    
    // Scroll suave al inicio de la grilla
    document.getElementById('tutorialsGrid').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Inicializar modal
function initModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Cerrar con botón X
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Abrir modal con video
function openModal(tutorialId) {
    const tutorial = tutorialesData.find(t => t.id === tutorialId);
    
    if (!tutorial) return;
    
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const videoContainer = document.getElementById('videoContainer');
    
    // Actualizar contenido del modal
    modalTitle.textContent = tutorial.titulo;
    modalDescription.textContent = tutorial.descripcion;
    
    // Insertar video
    const videoUrl = tutorial.video.includes('?') 
        ? `${tutorial.video}&autoplay=1` 
        : `${tutorial.video}?autoplay=1`;
    
    videoContainer.innerHTML = `
        <iframe 
            src="${videoUrl}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
    `;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    
    // Detener video
    videoContainer.innerHTML = '';
    
    // Ocultar modal
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Navegación
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono del menú
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
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
}

// Búsqueda de tutoriales (opcional - para implementar después)
function searchTutorials(query) {
    const filtered = tutorialesData.filter(t => 
        t.titulo.toLowerCase().includes(query.toLowerCase()) ||
        t.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    renderTutorials(filtered);
}
