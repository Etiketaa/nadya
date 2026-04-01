import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses, packCompleto } from '../data/courses';
import { ChevronRight, Instagram, Quote } from 'lucide-react';
import { useEffect, useRef } from 'react';
import './Landing.css';

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
        else e.target.classList.remove('visible');
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function Landing() {
  const { user } = useAuth();
  const wrapRef = useReveal();

  return (
    <div className="page-enter" ref={wrapRef}>

      {/* ═══════ HERO ═══════ */}
      <section className="l-hero">
        <div className="tribal-bg" />
        <div className="l-hero-orb" />
        <div className="container l-hero-content">
          <span className="l-hero-tag reveal">✦ Escuela de Uñas Online</span>
          <h1 className="reveal reveal-delay-1">
            Bienvenidos a mi<br /><em>Escuela de Uñas</em>
          </h1>
          <p className="l-hero-sub reveal reveal-delay-2">
            Soy Nadya Arrieta. Desde 2014 convertí mi pasión por las uñas en una carrera 
            exitosa e inspiradora. Hoy quiero compartir todo lo que aprendí con vos.
          </p>
          <div className="l-hero-stats reveal reveal-delay-3">
            <div className="l-stat"><span className="l-stat-num serif">9+</span><span className="l-stat-label">Cursos</span></div>
            <div className="l-stat"><span className="l-stat-num serif">100%</span><span className="l-stat-label">Online</span></div>
            <div className="l-stat"><span className="l-stat-num serif">∞</span><span className="l-stat-label">Acceso</span></div>
          </div>
          <div className="l-hero-actions reveal reveal-delay-4">
            <a href="#cursos" className="btn btn-primary">Ver Cursos</a>
            {!user && <Link to="/register" className="btn btn-outline">Crear Cuenta</Link>}
          </div>
        </div>
        <div className="l-hero-img reveal reveal-delay-3">
          <img src="/img/B_JFL-4248.jpg" alt="Nadya Arrieta" />
        </div>
      </section>

      {/* ═══════ MI HISTORIA — Parte 1 ═══════ */}
      <section className="section l-story">
        <div className="container">
          <div className="l-story-grid">
            <div className="l-story-img reveal">
              <img src="/img/B_JFL-4200.jpg" alt="Nadya trabajando" />
            </div>
            <div className="l-story-text">
              <span className="l-tag reveal">✦ Mi Historia</span>
              <h2 className="serif reveal reveal-delay-1">Bienvenidos a mi Escuela de Uñas Online</h2>
              <p className="reveal reveal-delay-2">
                Soy Nadya Arrieta y desde marzo de 2014 he convertido mi pasión por las uñas en una carrera exitosa e inspiradora. 
                Comencé arreglando las uñas de mis amigas, con mucho temor pero con una fe inquebrantable en que podía lograr la 
                independencia y seguir mi pasión. Hoy, después de muchos años de crecimiento, tengo mi propia escuela, donde formamos 
                profesionales con un enfoque integral en el desarrollo personal, las energías y obviamente la formación profesional 
                necesaria y adecuada.
              </p>
              <p className="reveal reveal-delay-3">
                Creo firmemente que todxs podemos alcanzar nuestros sueños, sin importar de dónde venimos. Mi misión es llevar 
                mi conocimiento a todo el mundo con mis cursos online, para que cada persona que llegue a mi escuela se convierta 
                en una profesional de excelencia. ¡Te invito a ser parte de esta comunidad y a expandir tus horizontes con mis 
                cursos y formaciones!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CURSOS ═══════ */}
      <section className="section l-courses" id="cursos">
        <div className="container">
          <div className="l-section-header reveal">
            <span className="l-tag">✦ Elegí tu camino</span>
            <h2 className="serif text-gold">Mis Cursos</h2>
          </div>

          {/* Pack Completo */}
          <div className="l-pack glass reveal reveal-delay-1">
            <div className="l-pack-info">
              <span className="l-pack-badge">⭐ Mejor Valor</span>
              <h3 className="serif">{packCompleto.title}</h3>
              <p>Accedé a los 9 cursos de una sola vez. De principiante a avanzada, todo incluido. Acceso inmediato y permanente.</p>
              <Link to={user ? '/dashboard' : '/register'} className="btn btn-gold">
                ✦ Comprar Pack — ${packCompleto.price} USD
              </Link>
            </div>
            <div className="l-pack-price">
              <span className="old-price">${packCompleto.originalPrice} USD</span>
              <span className="real-price serif">${packCompleto.price}</span>
              <span className="currency">USD</span>
            </div>
          </div>

          {/* Individual Courses */}
          <div className="l-courses-grid">
            {courses.map((c, i) => (
              <Link to={`/course/${c.id}`} className="l-course-card card reveal" style={{ transitionDelay: `${0.1 * (i + 1)}s` }} key={c.id}>
                <div className="l-course-thumb" style={{ background: c.gradient }}>
                  <span className="l-course-level">{c.level}</span>
                  <span className="l-course-emoji">{c.emoji}</span>
                </div>
                <div className="l-course-body">
                  <h4 className="serif">{c.title}</h4>
                  <p className="l-course-meta">{c.lessons} lecciones · {c.level}</p>
                  <div className="l-course-footer">
                    <span className="l-course-price serif">${c.price} USD</span>
                    <span className="l-course-arrow"><ChevronRight size={18} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CITA / HISTORIA — Parte 2 ═══════ */}
      <section className="section l-quote">
        <div className="tribal-bg" style={{ opacity: '0.06' }} />
        <div className="container">
          <div className="l-quote-card reveal">
            <Quote size={40} className="l-quote-icon" />
            <p className="l-quote-text reveal reveal-delay-1">
              Cuando comencé este camino, no sabía hasta dónde podía llegar. Solo tenía un sueño, unas manos 
              dispuestas a crear y una enorme fe en que Dios me estaba guiando. Lo que empezó como un pasatiempo 
              con amigas, se transformó en mi propósito: ayudar a otras personas a descubrir su talento y a 
              brillar con lo que aman hacer.
            </p>
            <p className="l-quote-text reveal reveal-delay-2">
              En mi escuela no solo enseño técnicas, también comparto energía, confianza y la certeza de que 
              cada una de nosotras tiene la capacidad de crecer y transformar su vida. Porque ser profesional 
              de las uñas no es solo un trabajo… es independencia, creatividad y libertad.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ CÓMO FUNCIONA ═══════ */}
      <section className="section l-proceso">
        <div className="container">
          <div className="l-section-header reveal" style={{ color: 'var(--blanco)' }}>
            <span className="l-tag" style={{ color: 'var(--turquesa-light)' }}>✦ Simple y rápido</span>
            <h2 className="serif" style={{ color: 'var(--blanco)' }}>¿Cómo <em>funciona?</em></h2>
          </div>
          <div className="l-steps-grid">
            {[
              { n: '01', t: 'Elegí tu curso', d: 'Buscá el curso ideal según tu nivel, desde principiante hasta avanzada.' },
              { n: '02', t: 'Comprá con seguridad', d: 'Pago seguro por transferencia. Confirmación instantánea.' },
              { n: '03', t: 'Acceso inmediato', d: 'Recibís tu acceso al instante. Mirá los videos desde tu teléfono.' },
              { n: '04', t: 'Aprendé y crecé', d: 'A tu ritmo. Transformá tu carrera como nail artist profesional.' },
            ].map((s, i) => (
              <div className="l-step glass reveal" style={{ transitionDelay: `${0.1 * (i + 1)}s` }} key={s.n}>
                <span className="l-step-num serif">{s.n}</span>
                <h4 className="serif">{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA FINAL + INVITACIÓN ═══════ */}
      <section className="section l-cta-final">
        <div className="container">
          <div className="l-cta-inner reveal">
            <img src="/img/B_JFL-4223.jpg" alt="Nadya Arrieta" className="l-cta-img reveal reveal-delay-1" />
            <div className="l-cta-text">
              <h2 className="serif reveal reveal-delay-1">El futuro está en tus manos</h2>
              <p className="reveal reveal-delay-2">
                Si sentís que es tu momento, quiero invitarte a dar el primer paso. 
                Sumate a mi Curso para Principiantes, y descubrí todo lo que sos capaz de lograr.
              </p>
              <p className="l-cta-sign reveal reveal-delay-3">
                Y yo voy a estar para acompañarte en cada paso de tu transformación.
              </p>
              <p className="l-cta-name reveal reveal-delay-3">— Nadya Arrieta</p>
              <div className="l-cta-actions reveal reveal-delay-4">
                <Link to={user ? '/dashboard' : '/register'} className="btn btn-primary">
                  ✦ Comenzar Ahora
                </Link>
                <a href="#cursos" className="btn btn-outline">Ver Cursos</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOBRE MÍ (Compacto) ═══════ */}
      <section className="section l-about">
        <div className="container">
          <div className="l-section-header reveal">
            <span className="l-tag">✦ Tu instructora</span>
            <h2 className="serif text-gold">Sobre Mí</h2>
          </div>
          <div className="l-about-card reveal reveal-delay-1">
            <div className="l-about-header">
              <img src="/img/B_JFL-4200.jpg" alt="Nadya" className="l-about-avatar" />
              <h3 className="serif">Nadya Arrieta</h3>
              <span className="l-about-role">Nail Artist & Instructora · Desde 2014</span>
            </div>
            <div className="l-about-body">
              <div className="l-about-pills">
                {['Nail Art Avanzado', 'Gel UV & Acrílico', 'Diseño Artístico', 'Emprendimiento', 'Nail Business', 'Desarrollo Personal'].map(p => (
                  <span className="l-pill" key={p}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="l-footer">
        <div className="container">
          <span className="l-footer-brand serif">Nadya <em>Arrieta</em></span>
          <span className="l-footer-tag">Escuela de Uñas Online</span>
          <a href="https://instagram.com/nadyayagie" target="_blank" rel="noreferrer" className="l-footer-ig">
            <Instagram size={16} /> @nadyayagie
          </a>
          <p className="l-footer-copy">© 2026 Nadya Arrieta. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
