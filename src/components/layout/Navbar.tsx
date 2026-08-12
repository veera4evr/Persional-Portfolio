import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !menuOpen) {
          setHideMenu(true);
        } else {
          setHideMenu(false);
        }
      } else {
        setHideMenu(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <div className="nav-left-group">
            <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              <img src="/logo.png" alt="Veera Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} className="md:h-10" />
              <span className="logo-text hidden md:inline-block" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D1D5DB', letterSpacing: '-0.5px' }}>Veera</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <nav
              className={`nav-links ${menuOpen ? 'active' : ''} transition-all duration-500 ease-in-out ${
                hideMenu && !menuOpen ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}
              id="nav-links"
            >
              {/* Drawer header — logo + close */}
              <div className="mobile-drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src="/logo.png" alt="Veera Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D1D5DB', letterSpacing: '-0.5px' }}>Veera</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="mobile-drawer-close"
                  aria-label="Close Menu"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Divider */}
              <div className="mobile-drawer-divider" />

              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Projects</Link>
              <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Skills</Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Contact</Link>

              {/* Resume button inside drawer */}
              <div className="mobile-drawer-divider" style={{ marginTop: '8px' }} />
              <a
                href="/assets/veeras_resume.pdf"
                download="veera's resume.pdf"
                className="mobile-drawer-resume"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fa-solid fa-download"></i> Resume
              </a>
            </nav>

            <a
              href="/assets/veeras_resume.pdf"
              download="veera's resume.pdf"
              className={`btn-hire-me hidden md:inline-flex transition-all duration-500 ease-in-out ${
                hideMenu ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}
              style={{ whiteSpace: 'nowrap' }}
            >
              Resume <i className="fa-solid fa-download" style={{ marginLeft: '6px' }}></i>
            </a>

            <button 
              className="mobile-toggle block md:hidden" 
              onClick={() => setMenuOpen(true)} 
              aria-label="Open Menu"
              style={{ opacity: menuOpen ? 0 : 1, pointerEvents: menuOpen ? 'none' : 'auto', transition: 'opacity 0.3s ease' }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop — click to close */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 9997,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </>
  );
};

export default Navbar;
