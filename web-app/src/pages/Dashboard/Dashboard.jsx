import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import { BookOpen, Crown, User, Mail, CalendarDays, ChevronRight } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  const purchased = courses.filter(c => user.purchasedCourses?.includes(c.id));
  const available = courses.filter(c => !user.purchasedCourses?.includes(c.id));

  return (
    <div className="dash-page page-enter">
      <div className="dash-hero">
        <div className="tribal-bg" style={{ opacity: '0.04' }} />
        <div className="container">
          <div className="dash-user-info">
            <div className="dash-avatar"><User size={32} /></div>
            <div>
              <h1 className="serif">Hola, {user.name.split(' ')[0]} 👋</h1>
              <p className="dash-email"><Mail size={14} /> {user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container dash-content">
        {/* Stats */}
        <div className="dash-stats">
          <div className="dash-stat-card glass">
            <BookOpen size={24} className="dsc-icon" />
            <span className="dsc-num serif">{purchased.length}</span>
            <span className="dsc-label">Cursos Adquiridos</span>
          </div>
          <div className="dash-stat-card glass">
            <Crown size={24} className="dsc-icon" />
            <span className="dsc-num serif">{available.length}</span>
            <span className="dsc-label">Cursos Disponibles</span>
          </div>
          <div className="dash-stat-card glass">
            <CalendarDays size={24} className="dsc-icon" />
            <span className="dsc-num serif">{new Date(user.createdAt).toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })}</span>
            <span className="dsc-label">Miembro desde</span>
          </div>
        </div>

        {/* Purchased Courses */}
        {purchased.length > 0 && (
          <section className="dash-section">
            <h2 className="serif">Mis Cursos</h2>
            <div className="dash-courses-grid">
              {purchased.map(c => (
                <Link to={`/course/${c.id}`} className="dash-course-card card" key={c.id}>
                  <div className="dcc-thumb" style={{ background: c.gradient }}>
                    <span className="dcc-emoji">{c.emoji}</span>
                  </div>
                  <div className="dcc-body">
                    <h4 className="serif">{c.title}</h4>
                    <p>{c.lessons} lecciones</p>
                    <span className="dcc-status owned">✓ Adquirido</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Available Courses */}
        {available.length > 0 && (
          <section className="dash-section">
            <h2 className="serif">Explorar Cursos</h2>
            <div className="dash-courses-grid">
              {available.map(c => (
                <Link to={`/course/${c.id}`} className="dash-course-card card" key={c.id}>
                  <div className="dcc-thumb" style={{ background: c.gradient }}>
                    <span className="dcc-emoji">{c.emoji}</span>
                  </div>
                  <div className="dcc-body">
                    <h4 className="serif">{c.title}</h4>
                    <p>{c.lessons} lecciones · ${c.price} USD</p>
                    <span className="dcc-cta">Ver curso <ChevronRight size={14} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
