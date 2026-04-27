/**
 * course-modal.js
 * Enhanced course detail modal system
 * Replaces simple payment modal with: Brief Info Modal → Full Course View → Purchase
 */

// Course database (will be replaced by Firestore data later)
const coursesDB = {
    'unas-esculpidas': {
        title: 'Uñas Esculpidas',
        price: 39,
        duration: '8 horas',
        lessons: 12,
        level: 'Intermedio',
        description: 'Aprende la técnica profesional de esculpido de uñas con acrílico y gel. Desde la preparación de la uña natural hasta la construcción perfecta del arco y el apex.',
        topics: ['Preparación de uña natural', 'Colocación de tips y moldes', 'Construcción con acrílico', 'Construcción con gel', 'Limado y refinamiento', 'Diseños de acabado'],
        img: 'img/B_JFL-4190.jpg'
    },
    'gel-uv': {
        title: 'Capacitación Gel UV',
        price: 45,
        duration: '6 horas',
        lessons: 10,
        level: 'Principiante',
        description: 'Domina la técnica de aplicación de gel UV para construcción y esmaltado permanente. Ideal para iniciar tu camino profesional.',
        topics: ['Tipos de geles', 'Lámpara UV vs LED', 'Aplicación en capa fina', 'Construcción sobre molde', 'Esmaltado permanente', 'Retiro seguro'],
        img: 'img/B_JFL-4223.jpg'
    },
    'semipermanente': {
        title: 'Semipermanente Pro',
        price: 29,
        duration: '4 horas',
        lessons: 8,
        level: 'Principiante',
        description: 'El servicio más solicitado. Aprende esmaltado semipermanente impecable con durabilidad de 3-4 semanas.',
        topics: ['Preparación de cutícula', 'Aplicación perfecta', 'Sellado y curado', 'Técnica antidesprendimiento', 'Retiro sin daño', 'Diseños básicos'],
        img: 'img/B_JFL-4248.jpg'
    },
    'nail-art': {
        title: 'Nail Art Floral',
        price: 35,
        duration: '5 horas',
        lessons: 9,
        level: 'Intermedio',
        description: 'Crea diseños florales únicos y elegantes. Técnicas de pintura a mano alzada y estampado profesional.',
        topics: ['Pinceles y herramientas', 'Flores básicas', 'Composición y balance', 'Estampado con placas', 'Tendencias actuales', 'Práctica guiada'],
        img: 'img/DSC08974.JPG'
    },
    'manicuria': {
        title: 'Manicuría Rusa',
        price: 49,
        duration: '7 horas',
        lessons: 11,
        level: 'Avanzado',
        description: 'La manicuría rusa es la técnica de preparación más profunda y profesional. Domina el uso del torno y fresas especializadas.',
        topics: ['Anatomía del pliegue', 'Tipos de fresas', 'Velocidad y presión', 'Limpieza de cutícula', 'Alisado de lámina', 'Protocolos de seguridad'],
        img: 'img/DSC09117.JPG'
    },
    '3d-art': {
        title: '3D Art Artist',
        price: 55,
        duration: '8 horas',
        lessons: 14,
        level: 'Avanzado',
        description: 'Arte tridimensional sobre uñas. Esculturas en acrílico, relieve y técnicas de texturizado profesional.',
        topics: ['Mezcla de acrílico 3D', 'Flores en relieve', 'Lazos y figuras', 'Encapsulado 3D', 'Acabados premium', 'Portfolio profesional'],
        img: 'img/B_JFL-4628.jpg'
    },
    'soft-gel': {
        title: 'Soft Gel Academy',
        price: 32,
        duration: '5 horas',
        lessons: 8,
        level: 'Principiante',
        description: 'La técnica más rápida y versátil del mercado actual. Tips preformados con gel suave para resultados express.',
        topics: ['Tipos de tips soft gel', 'Medición y ajuste', 'Adhesión perfecta', 'Limado y forma', 'Full cover vs french', 'Mantenimiento'],
        img: 'img/B_JFL-4658.jpg'
    },
    'acrilico': {
        title: 'Acrílico Pro',
        price: 59,
        duration: '10 horas',
        lessons: 16,
        level: 'Avanzado',
        description: 'Perfeccionamiento integral en acrílico. Desde la mezcla perfecta hasta las técnicas más avanzadas de construcción.',
        topics: ['Ratio líquido/polvo', 'Velocidad de trabajo', 'Construcción C-curve', 'Baby boomer acrílico', 'Encapsulados', 'Reparaciones', 'Precio y presupuesto', 'Atención al cliente'],
        img: 'img/B_JFL-4706.jpg'
    },
    'quimica': {
        title: 'Química Técnica',
        price: 25,
        duration: '3 horas',
        lessons: 6,
        level: 'Principiante',
        description: 'Entendé la ciencia detrás de los productos. Seguridad, salud y conocimiento técnico para profesionales responsables.',
        topics: ['Composición de productos', 'Reacciones químicas', 'Alergias y seguridad', 'Normativas sanitarias', 'Almacenamiento', 'Ficha técnica'],
        img: 'img/B_JFL-4311.jpg'
    }
};

/**
 * Open the brief info modal for a course
 */
function openCourseModal(courseId) {
    const course = coursesDB[courseId];
    if (!course) return;

    // Store course id for later
    document.getElementById('courseModal').dataset.courseId = courseId;

    // Fill modal content
    document.getElementById('cmTitle').textContent = course.title;
    document.getElementById('cmDescription').textContent = course.description;
    document.getElementById('cmPrice').textContent = '$' + course.price + ' USD';
    document.getElementById('cmDuration').textContent = course.duration;
    document.getElementById('cmLessons').textContent = course.lessons + ' clases';
    document.getElementById('cmLevel').textContent = course.level;
    document.getElementById('cmImg').src = course.img;
    document.getElementById('cmImg').alt = course.title;

    // Fill topics
    const topicsList = document.getElementById('cmTopics');
    topicsList.innerHTML = '';
    course.topics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        topicsList.appendChild(li);
    });

    // Show modal
    document.getElementById('courseModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close course modal
 */
function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Proceed to purchase — opens registration or payment flow
 */
function proceedToPurchase() {
    const courseId = document.getElementById('courseModal').dataset.courseId;
    const course = coursesDB[courseId];
    closeCourseModal();

    // Check if user is "logged in" (will use Firebase later)
    const isLoggedIn = localStorage.getItem('nadya_user');

    if (!isLoggedIn) {
        // Redirect to registration with course context
        window.location.href = 'registro.html?curso=' + courseId;
    } else {
        // Open payment modal
        openPaymentModal(course.title, course.price + ' USD');
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'courseModal') {
        closeCourseModal();
    }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCourseModal();
});
