import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle general navbar background
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Handle smart scroll hide for links/buttons
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !menuOpen) {
          // Scrolling down & menu not open -> hide
          setHideMenu(true);
        } else {
          // Scrolling up -> show
          setHideMenu(false);
        }
      } else {
        // Top of page -> show
        setHideMenu(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <div className="nav-left-group">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <img src="/logo.png" alt="Veera Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} className="md:h-10" />
            <span className="logo-text hidden md:inline-block" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D1D5DB', letterSpacing: '-0.5px' }}>Veera</span>
          </Link>
        </div>
        
        {/* Right side grouped without transforms to avoid trapping fixed mobile menu */}
        <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <nav 
            className={`nav-links ${menuOpen ? 'active' : ''} transition-all duration-500 ease-in-out ${
              hideMenu && !menuOpen ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
            }`} 
            id="nav-links"
          >
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Skills</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Contact</Link>
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
          
          <button className="mobile-toggle block md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
