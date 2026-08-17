// Three.js Setup for 3D Notebook
let scene, camera, renderer, notebook;

function init3D() {
    const canvas = document.getElementById('canvas3d');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = null;
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0x6366f1, 0.5);
    light2.position.set(-5, -5, 5);
    scene.add(light2);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Create Notebook
    createNotebook();
    
    // Mouse interaction
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    animate();
}

function createNotebook() {
    const group = new THREE.Group();
    
    // Notebook base (closed position)
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.05, 1);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.7,
        roughness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.3;
    group.add(base);
    
    // Screen/Lid
    const screenGeometry = new THREE.BoxGeometry(1.4, 0.02, 0.95);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0f0f0f,
        metalness: 0.8,
        roughness: 0.1,
        emissive: 0x1a3a52
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.2, 0);
    screen.rotation.x = Math.PI / 6; // Tilt angle
    group.add(screen);
    
    // Screen glow effect
    const glowGeometry = new THREE.BoxGeometry(1.35, 0.025, 0.9);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 0.205, 0);
    glow.rotation.x = Math.PI / 6;
    group.add(glow);
    
    // Keyboard area
    const keyboardGeometry = new THREE.BoxGeometry(1.4, 0.03, 0.8);
    const keyboardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0a0a0a,
        metalness: 0.6,
        roughness: 0.3
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.y = -0.15;
    group.add(keyboard);
    
    // Key details
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 5; j++) {
            const keyGeometry = new THREE.BoxGeometry(0.08, 0.01, 0.08);
            const keyMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333,
                metalness: 0.5,
                roughness: 0.4
            });
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(
                -0.3 + j * 0.15,
                -0.145,
                -0.2 + i * 0.2
            );
            group.add(key);
        }
    }
    
    notebook = group;
    scene.add(notebook);
}

let mouseX = 0;
let mouseY = 0;

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    const canvas = document.getElementById('canvas3d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (notebook) {
        // Rotate based on mouse position
        notebook.rotation.x = mouseY * 0.5;
        notebook.rotation.y = mouseX * 0.5;
        
        // Gentle floating animation
        notebook.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
    
    renderer.render(scene, camera);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all elements with scroll-fade class
document.addEventListener('DOMContentLoaded', () => {
    const scrollFadeElements = document.querySelectorAll('.scroll-fade');
    scrollFadeElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Initialize 3D
    init3D();
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const parallaxValue = el.getAttribute('data-parallax');
            el.style.transform = `translateY(${scrolled * parallaxValue}px)`;
        });
    });
});

// Mobile optimization
if (window.innerWidth < 768) {
    // Reduce animations on mobile for better performance
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .scroll-fade {
                animation: fadeInUp 0.6s ease forwards !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Handle visibility change to pause/resume 3D rendering
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause rendering when tab is not visible
        renderer.setAnimationLoop(null);
    } else {
        // Resume rendering
        renderer.setAnimationLoop(animate);
    }
});

// Export for external access
window.portfolio3D = {
    scene,
    camera,
    renderer,
    notebook
};
