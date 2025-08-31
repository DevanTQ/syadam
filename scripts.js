// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

let currentTheme = 'dark';

themeToggle.addEventListener('click', () => {
    themeToggle.classList.add('rotating');
    themeIcon.classList.add('fade-out');

    setTimeout(() => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon theme-icon fade-in';
        } else {
            themeIcon.className = 'fas fa-sun theme-icon fade-in';
        }

        themeIcon.classList.remove('fade-out');
        themeIcon.classList.add('fade-in');

        setTimeout(() => {
            themeToggle.classList.remove('rotating');
            themeIcon.classList.remove('fade-in');
        }, 400);
    }, 400);
});

// Add click effects to links
document.querySelectorAll('.link-item').forEach(link => {
    link.addEventListener('click', function (e) {
        // Only prevent default if href is placeholder (#)
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            console.log('Please add real URL to:', this.querySelector('.link-title').textContent);
            return;
        }

        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1000;
                `;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Allow normal navigation for real URLs
        console.log('Navigating to:', this.getAttribute('href'));
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.loading').forEach(el => {
        observer.observe(el);
    });
});

function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #00ff88, #00d4ff);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                opacity: 0;
                animation: float 6s linear infinite;
            `;

    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 6 + 's';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 6000);
}

setInterval(createParticle, 2000);

const floatStyle = document.createElement('style');
floatStyle.textContent = `
            @keyframes float {
                0% {
                    opacity: 0;
                    transform: translateY(100vh) translateX(0);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                }
            }
        `;
document.head.appendChild(floatStyle);
fetch("404.html")
    .then(response => {
        if (!response.ok) throw new Error("404 file not found");
        return response.text();
    })
    .then(html => {
        document.documentElement.innerHTML = html; // ganti seluruh halaman
    })
    .catch(error => {
        console.error(error);
        document.body.innerHTML = "<h1>404 - Page Not Found</h1>";
    });