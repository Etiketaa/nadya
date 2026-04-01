import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import { ArrowLeft, Check, Lock, Play, BookOpen } from 'lucide-react';
import { useState } from 'react';
import './CourseDetail.css';

export default function CourseDetail() {
  const { id } = useParams();
  const { user, purchaseCourse } = useAuth();
  const course = courses.find(c => c.id === id);
  const [showModal, setShowModal] = useState(false);

  if (!course) return (
    <div className="cd-page page-enter">
      <div className="container" style={{ paddingTop: '140px', textAlign: 'center' }}>
        <h1 className="serif">Curso no encontrado</h1>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Volver al inicio</Link>
      </div>
    </div>
  );

  const owned = user?.purchasedCourses?.includes(course.id);

  const handleBuy = () => {
    if (!user) return;
    purchaseCourse(course.id);
    setShowModal(false);
  };

  return (
    <div className="cd-page page-enter">
      {/* Header */}
      <div className="cd-header" style={{ background: course.gradient }}>
        <div className="container">
          <Link to="/" className="cd-back"><ArrowLeft size={18} /> Volver</Link>
          <div className="cd-hero-info">
            <span className="cd-emoji">{course.emoji}</span>
            <span className="cd-level">{course.level}</span>
            <h1 className="serif">{course.title}</h1>
            <p>{course.description}</p>
            <div className="cd-meta">
              <span><BookOpen size={16} /> {course.lessons} lecciones</span>
              <span><Play size={16} /> Acceso para siempre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container cd-content">
        <div className="cd-main">
          <h2 className="serif">¿Qué vas a aprender?</h2>
          <div className="cd-topics">
            {course.topics.map((t, i) => (
              <div className="cd-topic" key={i}>
                <Check size={16} className="cd-topic-icon" />
                <span>{t}</span>
              </div>
            ))}
          </div>

          {/* Simulated lessons preview */}
          <h2 className="serif" style={{ marginTop: '40px' }}>Contenido del curso</h2>
          <div className="cd-lessons">
            {Array.from({ length: course.lessons }, (_, i) => (
              <div className={`cd-lesson ${owned ? '' : 'locked'}`} key={i}>
                <span className="cd-lesson-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cd-lesson-title">Lección {i + 1}</span>
                {owned ? <Play size={16} className="cd-lesson-play" /> : <Lock size={14} className="cd-lesson-lock" />}
              </div>
            ))}
          </div>
        </div>

        <aside className="cd-sidebar">
          <div className="cd-price-card">
            <span className="cd-price serif">${course.price} USD</span>
            {owned ? (
              <div className="cd-owned-badge">
                <Check size={18} /> Curso Adquirido
              </div>
            ) : user ? (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowModal(true)}>
                Comprar Curso
              </button>
            ) : (
              <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>
                Registrate para Comprar
              </Link>
            )}
            <p className="cd-price-note">Acceso inmediato y permanente</p>
          </div>
        </aside>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="cd-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="cd-modal" onClick={e => e.stopPropagation()}>
            <h3 className="serif">Adquirir: {course.title}</h3>
            <p>Precio: <strong>${course.price} USD</strong></p>
            <div className="cd-bank">
              <p className="cd-bank-title">Datos para Transferencia</p>
              <div className="cd-bank-row"><span>CBU/CVU:</span><strong>0000003100010000123456</strong></div>
              <div className="cd-bank-row"><span>Alias:</span><strong>nadya.escuela.unas</strong></div>
              <div className="cd-bank-row"><span>Titular:</span><strong>Nadya Arrieta</strong></div>
              <div className="cd-bank-row"><span>Banco:</span><strong>MercadoPago</strong></div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleBuy}>
              Confirmar Compra (Simulado)
            </button>
            <button className="cd-modal-close" onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
