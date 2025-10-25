// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Set initial navbar style
window.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuBtn.innerHTML = '<i class="fas fa-times text-2xl text-amber-500"></i>';
    } else {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i class="fas fa-bars text-2xl text-amber-500"></i>';
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i class="fas fa-bars text-2xl text-amber-500"></i>';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Slide functionality
let currentSlideIndex = 0;
let slides;
let dots;
let slideInterval;

// Tornar a função global para caso você a chame em outro lugar (embora desnecessário com a correção)
window.currentSlide = function(n) {
    // n-1 converte o índice baseado em 1 (se for chamado de fora) para zero-based (0, 1, 2...)
    if (slides && slides.length > 0) {
        goToSlide(n - 1); 
    }
};

function initSlides() {
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        return;
    }
    
    // Assegura que começamos no primeiro slide
    currentSlideIndex = 0; 
    showSlide(currentSlideIndex);
    
    // Auto slide a cada 5 segundos
    startAutoSlide();
    
    // Adiciona event listeners aos dots
    // CORREÇÃO CRUCIAL AQUI: Usamos o 'index' (0, 1, 2...) do loop
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Chama goToSlide usando o índice do dot (0, 1, 2)
            goToSlide(index);
        });
    });
}

function showSlide(index) {
    if (!slides || slides.length === 0) return;
    
    // 1. O índice global é atualizado em goToSlide/nextSlide,
    // mas garantimos que a função showSlide sempre recebe o índice correto.

    // 2. Resetar todos os slides (remover 'active' de todos)
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // 3. Atualizar os dots
    if (dots && dots.length > 0) {
        dots.forEach((dot, i) => {
            if (i === index) {
                // Dot Ativo: cor de destaque
                dot.classList.remove('bg-white', 'opacity-50');
                dot.classList.add('bg-amber-500');
            } else {
                // Dot Inativo: cor secundária
                dot.classList.remove('bg-amber-500');
                dot.classList.add('bg-white', 'opacity-50');
            }
        });
    }
}

function nextSlide() {
    if (!slides || slides.length === 0) return;
    
    // Calcula o próximo índice e faz o ciclo (loop)
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function goToSlide(index) {
    if (!slides || slides.length === 0) return;
    
    // Atualiza o índice global
    currentSlideIndex = index; 
    
    // Mostra o slide
    showSlide(currentSlideIndex);
    
    // Reseta o intervalo para que o autoplay comece a contar do zero
    // após a interação manual.
    startAutoSlide();
}

function startAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, 5000);
}

// Inicializa os slides quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlides);
} else {
    initSlides();
}
// Form submission
const agendamentoForm = document.getElementById('agendamentoForm');
if (agendamentoForm) {
    agendamentoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const nome = this.querySelector('input[type="text"]').value;
        const telefone = this.querySelector('input[type="tel"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const servico = this.querySelector('select').value;
        const data = this.querySelector('input[type="date"]').value;
        const horario = this.querySelectorAll('select')[1].value;
        const observacoes = this.querySelector('textarea').value;
        
        // Create WhatsApp message
        const mensagem = `Olá! Gostaria de agendar um horário:\n\n` +
                        `Nome: ${nome}\n` +
                        `Telefone: ${telefone}\n` +
                        `E-mail: ${email}\n` +
                        `Serviço: ${servico}\n` +
                        `Data: ${data}\n` +
                        `Horário: ${horario}\n` +
                        `Observações: ${observacoes}`;
        
        // Redirect to WhatsApp
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Formulário enviado! Você será redirecionado para o WhatsApp.');
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('#sobre, #servicos > div > div, #depoimentos > div > div, #contato > div > div');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Set minimum date for appointment date input to today
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}
