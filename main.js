/**
 * main.js - Lógica general para Nadya Arrieta Ecommerce
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // 2. Intersection Observer para Animaciones en Scroll (.fade-in-up)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% del elemento visible para desencadenar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 3. Lógica del Modal de Pago
    const modal = document.getElementById('paymentModal');
    const courseNameEl = document.getElementById('modalCourseName');
    const coursePriceEl = document.getElementById('modalCoursePrice');
    const wpLinkEl = document.getElementById('wpLink'); // Necesitamos añadir este ID al <a> de WhatsApp

    // Exponemos funciones al objeto window para el onclick en HTML
    window.openPaymentModal = (name, price) => {
        if (courseNameEl) courseNameEl.textContent = name;
        if (coursePriceEl) coursePriceEl.textContent = price;

        // Generar link dinámico de WhatsApp
        if (wpLinkEl) {
            const waNumber = '1234567890'; // Modificar por el número telefónico real (ej: 54911xxxx)
            const message = encodeURIComponent(`Hola Nadya! ✨ Realicé una transferencia de ${price} por el curso "${name}". Aquí te adjunto el comprobante.`);
            wpLinkEl.href = `https://wa.me/${waNumber}?text=${message}`;
        }

        if (modal) modal.classList.add('active');
    };

    window.closePaymentModal = () => {
        if (modal) modal.classList.remove('active');
    };

    // Cerrar modal al clickear fuera
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) window.closePaymentModal();
        });
    }
});
