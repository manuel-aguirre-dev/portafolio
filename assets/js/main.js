// Variables globales
const sections = ['about', 'portfolio', 'education', 'skills', 'services'];
let currentSectionIndex = 0;
let isMobile = window.innerWidth <= 768;
let isNetbook = window.innerWidth <= 1366 && window.innerHeight <= 768;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isHorizontalSwipe = false;

// Detectar cambios de tamaño de pantalla
window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    const wasNetbook = isNetbook;
    isMobile = window.innerWidth <= 768;
    isNetbook = window.innerWidth <= 1366 && window.innerHeight <= 768;

    if (wasMobile !== isMobile) {
        if (!isMobile) {
            closeMobileMenu();
        }
        adjustForScreenSize();
    }

    if (wasNetbook !== isNetbook) {
        adjustSidebarForNetbook();
    }
});

// Función para ajustar sidebar en netbooks
function adjustSidebarForNetbook() {
    const sidebar = document.getElementById('sidebar');
    if (isNetbook && sidebar) {
        sidebar.style.overflowY = 'auto';
        sidebar.style.paddingTop = '1rem';
        sidebar.style.paddingBottom = '1rem';

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
        cards.forEach(card => {
            card.style.transition = 'none';
        });
    } else {
        cards.forEach(card => {
            card.style.transition = '';
        });
    }
}

// Efecto fade en la profile-image con scroll
function initProfileImageFadeEffect() {
    const profileImage = document.querySelector('.profile-image');
    const sidebar = document.querySelector('.sidebar');

    if (!profileImage || isMobile) return;

    function updateProfileImageFade() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const scrollTop = mainContent.scrollTop;
        const maxScroll = 200;

        const opacity = Math.max(0.1, 1 - (scrollTop / maxScroll));
        const translateY = (scrollTop / maxScroll) * 20;
        const scale = Math.max(0.8, 1 - (scrollTop / maxScroll) * 0.2);

        profileImage.style.opacity = opacity;
        profileImage.style.transform = `translateY(${translateY}px) scale(${scale})`;

        if (scrollTop > 50) {
            profileImage.classList.add('fade-out');
        } else {
            profileImage.classList.remove('fade-out');
        }
    }

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
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }

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
initProfileImageFadeEffect();

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
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
});

// ===== NAVEGACIÓN TÁCTIL CON SWIPE MEJORADA =====
function handleTouchStart(evt) {
    // No hacer nada si el touch es en el sidebar
    if (evt.target.closest('.sidebar')) {
        return;
    }

    const firstTouch = evt.touches[0];
    touchStartX = firstTouch.clientX;
    touchStartY = firstTouch.clientY;
    isHorizontalSwipe = false;
}

function handleTouchMove(evt) {
    if (!touchStartX || !touchStartY) return;

    // No hacer nada si el touch es en el sidebar
    if (evt.target.closest('.sidebar')) {
        return;
    }

    const currentX = evt.touches[0].clientX;
    const currentY = evt.touches[0].clientY;

    const diffX = Math.abs(currentX - touchStartX);
    const diffY = Math.abs(currentY - touchStartY);

    // Determinar la dirección del swipe solo en el primer movimiento
    if (!isHorizontalSwipe && (diffX > 10 || diffY > 10)) {
        // Si el movimiento horizontal es significativamente mayor que el vertical
        isHorizontalSwipe = diffX > diffY * 1.5; // 1.5 es el ratio para ser más estricto
    }

    // Si es swipe horizontal, prevenir el scroll vertical
    if (isHorizontalSwipe && diffX > 30) {
        evt.preventDefault();
    }

    touchEndX = currentX;
    touchEndY = currentY;
}

function handleTouchEnd(evt) {
    if (!touchStartX || !touchStartY) return;

    // No hacer nada si el touch es en el sidebar
    if (evt.target.closest('.sidebar')) {
        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
        isHorizontalSwipe = false;
        return;
    }

    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    const minSwipeDistance = 50;

    // Solo navegar si fue un swipe horizontal confirmado
    if (isHorizontalSwipe && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
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

    // Reset de variables
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
    isHorizontalSwipe = false;
}

// Agregar eventos táctiles solo en móvil
if (isMobile) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainContent.addEventListener('touchmove', handleTouchMove, { passive: false });
        mainContent.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
}

// Animaciones al hacer scroll
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

// Efectos de tipeo para el título
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

// Aplicar efecto de tipeo
document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll("h1");
    titles.forEach((title) => {
        const text = title.textContent;
        title.textContent = "";
        typeWriter(title, text, 250);
    });
});

// Partículas de fondo animadas
function createParticles() {
    // if (isMobile || isNetbook) return;

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

    for (let i = 0; i < 20; i++) {
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

createParticles();

// Smooth scroll mejorado
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

showPreloader();

// Toggle del menú del CV
const cvButton = document.querySelector(".cv-button");
const cvDropdown = document.querySelector(".cv-dropdown");

if (cvButton && cvDropdown) {
    cvButton.addEventListener("click", function (e) {
        e.stopPropagation();
        cvDropdown.classList.toggle("show");

        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });

    document.addEventListener("click", function (e) {
        if (!cvDropdown.contains(e.target)) {
            cvDropdown.classList.remove("show");
        }
    });
}

// ===== AUDIO MEJORADO PARA MÓVIL =====
const audio = new Audio("./assets/sounds/fondo.mp3");
const musicBtn = document.getElementById("musicToggle");
const musicContainer = document.querySelector('.music-container');

if (audio && musicBtn && musicContainer) {
    audio.loop = true;
    audio.volume = isMobile ? 0.2 : isNetbook ? 0.4 : 0.5;

    if (isMobile || isNetbook) {
        audio.preload = "none";
    }

    let isPlaying = false;
    let audioEnabled = false;

    // Función para toggle del audio
    const toggleAudio = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!audioEnabled) {
            // Primera vez: habilitar audio
            audioEnabled = true;
        }

        if (isPlaying) {
            // Pausar
            audio.pause();
            musicBtn.checked = false;
            isPlaying = false;
        } else {
            // Reproducir
            audio.play()
                .then(() => {
                    musicBtn.checked = true;
                    isPlaying = true;
                })
                .catch(err => {
                    console.log('Error playing audio:', err);
                    musicBtn.checked = false;
                    isPlaying = false;
                });
        }

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    };

    // En móvil, hacer todo el contenedor clickeable
    if (isMobile) {
        // Hacer el contenedor más grande táctilmente
        musicContainer.style.padding = '10px';
        musicContainer.style.margin = '0.8rem auto';
        musicContainer.style.cursor = 'pointer';
        
        // Eventos táctiles en el contenedor completo
        musicContainer.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });

        musicContainer.addEventListener('touchend', toggleAudio, { passive: false });
        
        // También en click por si acaso
        musicContainer.addEventListener('click', toggleAudio);
        
        // Deshabilitar el evento change del checkbox en móvil
        musicBtn.style.pointerEvents = 'none';
    } else {
        // En desktop, usar el evento change normal
        musicBtn.addEventListener("change", toggleAudio);
    }

    // Auto-play al primer click/touch en la página
    const enableAudioOnFirstInteraction = () => {
        if (!audioEnabled) {
            toggleAudio();
        }
    };
}

// Performance monitoring
console.log('🚀 Portafolio cargado correctamente');
console.log('📱 Dispositivo:', isMobile ? 'Móvil' : isNetbook ? 'Netbook' : 'Desktop');
console.log('💡 Tip: Prueba usar las flechas del teclado para navegar (desktop)');