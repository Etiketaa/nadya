import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Crown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <Crown size={24} className="brand-icon" />
          <span className="brand-text">Nadya <em>Arrieta</em></span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/#cursos" onClick={() => setMenuOpen(false)}>Cursos</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-user" onClick={() => setMenuOpen(false)}>
                <User size={16} />
                {user.name.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="nav-logout">
                <LogOut size={16} /> Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login" onClick={() => setMenuOpen(false)}>Ingresar</Link>
              <Link to="/register" className="btn btn-primary nav-register-btn" onClick={() => setMenuOpen(false)}>Crear Cuenta</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
