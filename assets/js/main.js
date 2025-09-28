// Variables globales
const sections = ['about', 'portfolio', 'education', 'skills', 'services'];
let currentSectionIndex = 0;
let isMobile = window.innerWidth <= 768;
let isNetbook = window.innerWidth <= 1366 && window.innerHeight <= 768; // Detectar netbook
let touchStartX = 0;
let touchEndX = 0;

// Detectar cambios de tamaño de pantalla
window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    const wasNetbook = isNetbook;
    isMobile = window.innerWidth <= 768;
    isNetbook = window.innerWidth <= 1366 && window.innerHeight <= 768;
    
    // Si cambió de mobile a desktop o viceversa
    if (wasMobile !== isMobile) {
        // Cerrar el menú móvil si se cambió a desktop
        if (!isMobile) {
            closeMobileMenu();
        }
        // Reajustar elementos si es necesario
        adjustForScreenSize();
    }

    // Ajustar sidebar para netbook
    if (wasNetbook !== isNetbook) {
        adjustSidebarForNetbook();
    }
});

// Función para ajustar sidebar en netbooks
function adjustSidebarForNetbook() {
    const sidebar = document.getElementById('sidebar');
    if (isNetbook && sidebar) {
        // Hacer el sidebar scrolleable en netbooks
        sidebar.style.overflowY = 'auto';
        sidebar.style.paddingTop = '1rem';
        sidebar.style.paddingBottom = '1rem';
        
        // Reducir espaciados en netbook
        const profileSection = sidebar.querySelector('.profile-section');
        if (profileSection) {
            profileSection.style.marginBottom = '1.5rem';
        }

        const navMenu = sidebar.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.marginBottom = '1rem';
        }

        const socialLinks = sidebar.querySelector('.social-links');
        if (socialLinks) {
            socialLinks.style.marginTop = '1rem';
        }

        const musicContainer = sidebar.querySelector('.music-container');
        if (musicContainer) {
            musicContainer.style.marginTop = '1rem';
        }
    }
}

// Función para ajustar elementos según el tamaño de pantalla
function adjustForScreenSize() {
    const cards = document.querySelectorAll('.card, .project-card, .skill-item');
    
    if (isMobile) {
        // Deshabilitar animaciones hover en móvil
        cards.forEach(card => {
            card.style.transition = 'none';
        });
    } else {
        // Rehabilitar animaciones en desktop
        cards.forEach(card => {
            card.style.transition = '';
        });
    }
}

// Efecto fade en la profile-image (luna) con scroll
function initProfileImageFadeEffect() {
    const profileImage = document.querySelector('.profile-image');
    const sidebar = document.querySelector('.sidebar');
    
    if (!profileImage || isMobile) return; // No aplicar en móvil

    function updateProfileImageFade() {
        // Obtener la posición del scroll del contenido principal
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const scrollTop = mainContent.scrollTop;
        const maxScroll = 200; // Distancia máxima para el efecto fade

        // Calcular la opacidad basada en el scroll (de 1 a 0.1)
        const opacity = Math.max(0.1, 1 - (scrollTop / maxScroll));
        
        // Calcular el transform basado en el scroll
        const translateY = (scrollTop / maxScroll) * 20; // Máximo 20px hacia abajo
        const scale = Math.max(0.8, 1 - (scrollTop / maxScroll) * 0.2); // Mínimo 0.8

        // Aplicar los efectos
        profileImage.style.opacity = opacity;
        profileImage.style.transform = `translateY(${translateY}px) scale(${scale})`;
        
        // Agregar/quitar clase para transiciones suaves
        if (scrollTop > 50) {
            profileImage.classList.add('fade-out');
        } else {
            profileImage.classList.remove('fade-out');
        }
    }

    // Escuchar el scroll del contenido principal
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        let ticking = false;
        mainContent.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateProfileImageFade();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Navegación del menú
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.dataset.section;
        showSection(sectionId);
        setActiveNav(this);
        currentSectionIndex = sections.indexOf(sectionId);
        updateNavigationButtons();
        closeMobileMenu();
    });
});

// Mostrar sección
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');

    // Scroll suave al inicio del contenido
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
    
    // En móvil, scroll al top de la página
    if (isMobile) {
        window.scrollTo(0, 0);
    }
}

// Establecer navegación activa
function setActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Navegación secuencial
function navigateSection(direction) {
    const newIndex = currentSectionIndex + direction;

    if (newIndex >= 0 && newIndex < sections.length) {
        currentSectionIndex = newIndex;
        const sectionId = sections[currentSectionIndex];
        showSection(sectionId);

        // Actualizar nav activo
        const navLink = document.querySelector(`[data-section="${sectionId}"]`);
        setActiveNav(navLink);

        updateNavigationButtons();
    }
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentSectionIndex === 0;
        nextBtn.disabled = currentSectionIndex === sections.length - 1;
    }
}

// Menú móvil
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
    document.body.style.overflow = '';
}

// Enlaces de redes sociales
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Haptic feedback en dispositivos compatibles
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        switch (this.id) {
            case 'linkedin':
                window.open('https://www.linkedin.com/in/manuel-aguirre-4116-dev/', '_blank');
                break;
            case 'github':
                window.open('https://github.com/manuel-aguirre-dev', '_blank');
                break;
            case 'instagram':
                window.open('https://www.instagram.com/_aguirre_manuel_/', '_blank');
                break;
            default:
                alert('Agrega tu enlace de red social aquí');
        }
    });
});

// Inicializar
updateNavigationButtons();
adjustForScreenSize();
adjustSidebarForNetbook();
initProfileImageFadeEffect(); // Inicializar el efecto fade

// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (sidebar && menuBtn && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Navegación con teclado (solo en desktop)
document.addEventListener('keydown', function (e) {
    if (!isMobile) {
        if (e.key === 'ArrowLeft') {
            navigateSection(-1);
        } else if (e.key === 'ArrowRight') {
            navigateSection(1);
        }
        // Cerrar menú con Escape
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
});

// Navegación táctil con swipe
function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    touchStartX = firstTouch.clientX;
}

function handleTouchMove(evt) {
    if (!touchStartX) return;
    
    touchEndX = evt.touches[0].clientX;
    
    // Prevenir scroll horizontal accidental
    const diffX = Math.abs(touchStartX - touchEndX);
    const diffY = Math.abs(evt.touches[0].clientY - (evt.touches[0].clientY || 0));
    
    if (diffX > diffY && diffX > 50) {
        evt.preventDefault();
    }
}

function handleTouchEnd(evt) {
    if (!touchStartX || !touchEndX) return;
    
    const diff = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    
    // Solo en el contenido principal, no en el sidebar
    if (!evt.target.closest('.sidebar') && Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
            // Swipe izquierda - siguiente sección
            navigateSection(1);
        } else {
            // Swipe derecha - sección anterior  
            navigateSection(-1);
        }
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    touchStartX = 0;
    touchEndX = 0;
}

// Agregar eventos táctiles solo en móvil
if (isMobile) {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

// Animaciones al hacer scroll (optimizado para móvil)
const observerOptions = {
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las tarjetas (con throttle para mejor performance)
const cards = document.querySelectorAll('.card, .project-card, .skill-item');
cards.forEach((card, index) => {
    // Stagger animation delay en desktop
    const delay = isMobile ? 0 : index * 100;
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
    
    observer.observe(card);
});

// Efectos de tipeo para el título (solo en desktop para mejor performance)
function typeWriter(element, text, speed = 100) {
    if (isMobile) {
        element.innerHTML = text;
        return;
    }
    
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplicar efecto de tipeo al título principal
setTimeout(() => {
    const mainTitle = document.querySelector('#about .section-title');
    if (mainTitle) {
        typeWriter(mainTitle, 'Sobre mí', 150);
    }
}, 500);

// Partículas de fondo animadas (solo en desktop, no en netbook por performance)
function createParticles() {
    if (isMobile || isNetbook) return; // Evitar en móvil y netbook para mejor performance
    
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) { // Reducido aún más para mejor performance
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(78, 205, 196, 0.2);
            border-radius: 50%;
            animation: float ${8 + Math.random() * 12}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }

    // Agregar keyframes para la animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
            10%, 90% { opacity: 0.8; }
            50% { transform: translateY(-15px) translateX(8px); }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar partículas
createParticles();

// Smooth scroll personalizado (mejorado para móvil y netbook)
function smoothScroll(target, duration = 500) {
    if (isMobile || isNetbook) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Preloader optimizado
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2d1b4e 0%, #1a0d2e 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

    const spinner = document.createElement('div');
    const spinnerSize = isMobile ? '40px' : isNetbook ? '45px' : '50px';
    spinner.style.cssText = `
        width: ${spinnerSize};
        height: ${spinnerSize};
        border: 3px solid rgba(78, 205, 196, 0.3);
        border-top: 3px solid #4ecdc4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    preloader.appendChild(spinner);
    document.body.appendChild(preloader);

    const hideDelay = isMobile ? 1000 : isNetbook ? 1200 : 1500;
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(preloader)) {
                document.body.removeChild(preloader);
            }
        }, 500);
    }, hideDelay);
}

// Mostrar preloader al cargar
showPreloader();

// Toggle del menú del CV
const cvButton = document.querySelector(".cv-button");
const cvDropdown = document.querySelector(".cv-dropdown");

if (cvButton && cvDropdown) {
    cvButton.addEventListener("click", function (e) {
        e.stopPropagation();
        cvDropdown.classList.toggle("show");
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });

    // Cierra el menú si se hace clic fuera
    document.addEventListener("click", function (e) {
        if (!cvDropdown.contains(e.target)) {
            cvDropdown.classList.remove("show");
        }
    });
}

// Audio con mejor manejo para móvil y netbook
const audio = new Audio("./assets/sounds/fondo.mp3");
const musicBtn = document.getElementById("musicToggle");

if (audio && musicBtn) {
    audio.loop = true;
    audio.volume = isMobile ? 0.2 : isNetbook ? 0.4 : 0.5;

    // Configuración para móvil y netbook
    if (isMobile || isNetbook) {
        audio.preload = "none"; // No precargar para ahorrar recursos
    }

    // Primer click en cualquier lugar de la ventana
    const enableAudio = () => {
        if (!musicBtn.checked) {
            audio.play().catch(err => {
                console.log('Error playing audio:', err);
                // Ocultar el botón de música si falla
                const musicContainer = document.querySelector('.music-container');
                if (musicContainer) {
                    musicContainer.style.display = 'none';
                }
            });
            musicBtn.checked = true;
        }
    };

    // Usar tanto click como touchend para mejor compatibilidad móvil
    window.addEventListener('click', enableAudio, { once: true });
    window.addEventListener('touchend', enableAudio, { once: true });

    // Toggle cuando se hace click en el botón
    musicBtn.addEventListener("change", () => {
        if (musicBtn.checked) {
            audio.play().catch(err => console.log('Error playing audio:', err));
        } else {
            audio.pause();
        }
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    });
}

// Performance monitoring (solo en desarrollo)
if (window.location.hostname === 'localhost') {
    console.log('🚀 Portafolio cargado correctamente');
    console.log('📱 Dispositivo:', isMobile ? 'Móvil' : isNetbook ? 'Netbook' : 'Desktop');
    console.log('📐 Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('💡 Tip: Prueba usar las flechas del teclado para navegar (desktop)');
    console.log('👆 Tip: Usa swipe para navegar (móvil)');
    console.log('🌙 Tip: Haz scroll para ver el efecto fade en la luna (desktop)');
    console.log('😅 Easter egg: El form no funciona jeje');
}

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registrado'))
        .catch(error => console.log('SW falló'));
}