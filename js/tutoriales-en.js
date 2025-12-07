// Tutorials and Quick Guides - JavaScript (English)

let tutorialesData = [];
let currentCategory = 'All';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initTutorials();
    initModal();
    initNavigation();
    console.log('🎬 Tutorials loaded successfully');
});

// Initialize tutorials
async function initTutorials() {
    try {
        showLoading();
        const response = await fetch('tutoriales-en.json');
        tutorialesData = await response.json();
        hideLoading();
        renderTutorials(tutorialesData);
        initFilters();
    } catch (error) {
        console.error('Error loading tutorials:', error);
        showError();
    }
}

// Show loading
function showLoading() {
    const grid = document.getElementById('tutorialsGrid');
    grid.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading tutorials...</p>
        </div>
    `;
}

// Hide loading
function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Show error
function showError() {
    const grid = document.getElementById('tutorialsGrid');
    grid.innerHTML = `
        <div class="empty-state active">
            <i data-lucide="alert-circle"></i>
            <h3>Error loading tutorials</h3>
            <p>Please try reloading the page</p>
        </div>
    `;
    lucide.createIcons();
}

// Render tutorials
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
                <img src="${tutorial.miniatura}" alt="${tutorial.titulo}" onerror="this.src='assets/placeholder-screenshot.png'">
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
                    Watch tutorial
                </button>
            </div>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Initialize filters
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter tutorials
            const category = btn.dataset.category;
            currentCategory = category;
            filterTutorials(category);
        });
    });
}

// Filter tutorials by category
function filterTutorials(category) {
    if (category === 'All') {
        renderTutorials(tutorialesData);
    } else {
        const filtered = tutorialesData.filter(t => t.categoria === category);
        renderTutorials(filtered);
    }
    
    // Smooth scroll to grid start
    document.getElementById('tutorialsGrid').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Initialize modal
function initModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Close with X button
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Open modal with video
function openModal(tutorialId) {
    const tutorial = tutorialesData.find(t => t.id === tutorialId);
    
    if (!tutorial) return;
    
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const videoContainer = document.getElementById('videoContainer');
    
    // Update modal content
    modalTitle.textContent = tutorial.titulo;
    modalDescription.textContent = tutorial.descripcion;
    
    // Insert video
    videoContainer.innerHTML = `
        <iframe 
            src="${tutorial.video}?autoplay=1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    
    // Stop video
    videoContainer.innerHTML = '';
    
    // Hide modal
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change menu icon
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
        
        // Close menu when clicking a link
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

// Search tutorials (optional - to implement later)
function searchTutorials(query) {
    const filtered = tutorialesData.filter(t => 
        t.titulo.toLowerCase().includes(query.toLowerCase()) ||
        t.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    renderTutorials(filtered);
}
