// Variables globales
const sections = ['about', 'portfolio', 'education', 'skills', 'contact'];
let currentSectionIndex = 0;

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
    document.querySelector('.main-content').scrollTop = 0;
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

    prevBtn.disabled = currentSectionIndex === 0;
    nextBtn.disabled = currentSectionIndex === sections.length - 1;
}

// Menú móvil
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
}

// Formulario de contacto
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    this.reset();
});


// Enlaces de redes sociales
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
    e.preventDefault();
    switch (this.id) {
        case 'linkedin':
            window.open('https://www.linkedin.com/in/manuel-aguirre-4116-dev/', '_blank');
            break;
            case 'github':
                window.open('https://github.com/manuel-aguirre-dev', '_blank');
                break;
                case 'instagram':
                    window.open('https://instagram.com/tu-usuario', '_blank');
                    break;
                    default:
                        alert('Agrega tu enlace de red social aquí');
                    }
                });
            });
            
            
            // Inicializar
            updateNavigationButtons();
            
// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Navegación con teclado
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        navigateSection(-1);
    } else if (e.key === 'ArrowRight') {
        navigateSection(1);
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las tarjetas
document.querySelectorAll('.card, .project-card, .skill-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Efectos de tipeo para el título
function typeWriter(element, text, speed = 100) {
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

// Partículas de fondo animadas
function createParticles() {
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
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(78, 205, 196, 0.3);
        border-radius: 50%;
        animation: float ${5 + Math.random() * 10}s linear infinite;
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
        10%, 90% { opacity: 1; }
        50% { transform: translateY(-20px) translateX(10px); }
        }
        `;
        document.head.appendChild(style);
    }
    
// Inicializar partículas
createParticles();

// Smooth scroll personalizado
function smoothScroll(target, duration) {
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

// Efecto de paralaje sutil
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.profile-image');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Preloader
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
    spinner.style.cssText = `
    width: 50px;
    height: 50px;
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

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 500);
    }, 1500);
}

// Mostrar preloader al cargar
showPreloader();

// Easter egg - Konami Code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        // Easter egg activado
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        alert('🎉 ¡Easter egg activado! ¡Buen trabajo encontrándolo!');
    }
});

// Toggle del menú del CV
document.querySelector(".cv-button").addEventListener("click", function(e) {
    e.stopPropagation(); // evita cerrar inmediatamente
  document.querySelector(".cv-dropdown").classList.toggle("show");
});

// Cierra el menú si se hace clic fuera
document.addEventListener("click", function(e) {
    const dropdown = document.querySelector(".cv-dropdown");
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
    }
});

console.log('Portafolio cargado correctamente');
console.log('Tip: Prueba usar las flechas del teclado para navegar');
console.log('Easter egg: El form no funciona jeje');