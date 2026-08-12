import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Theme palette: Deep Red #780a13 | Black #0d0d0d | Sand #f4e4d0 | White #fff
const SAND = '#f4e4d0';
const SAND_DIM = 'rgba(244,228,208,0.55)';
const SAND_FAINT = 'rgba(244,228,208,0.08)';
const SAND_BORDER = 'rgba(244,228,208,0.15)';
const RED_DEEP = '#780a13';
const RED_MID = '#900000';
const BLACK = '#0d0d0d';

const phoneNumber = '+917305332275';
const rawPhone = '917305332275';
const email = 'veeramani.4evr@gmail.com';

const ContactCard: React.FC<{
  icon: string;
  label: string;
  value: string;
  href: string;
  accentColor: string;
  isExternal?: boolean;
}> = ({ icon, label, value, href, accentColor, isExternal }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '8px 0',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateX(5px)' : 'none',
      }}
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: hovered ? `${accentColor}15` : 'transparent',
        border: `1px solid ${hovered ? accentColor : SAND_BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered ? accentColor : SAND_DIM, fontSize: '0.9rem',
        transition: 'all 0.25s ease',
      }}>
        <i className={icon}></i>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{
          fontSize: '0.65rem', color: SAND_DIM,
          textTransform: 'uppercase', letterSpacing: '1px',
          fontWeight: 600,
        }}>{label}</div>
        <div style={{ 
          fontSize: '0.85rem', 
          color: hovered ? SAND : SAND_DIM, 
          fontWeight: 500, 
          wordBreak: 'break-all',
          transition: 'color 0.25s ease'
        }}>{value}</div>
      </div>
    </a>
  );
};

const SocialBtn: React.FC<{
  href: string;
  icon: string;
  hoverColor: string;
}> = ({ href, icon, hoverColor }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '42px', height: '42px', borderRadius: '50%',
        background: hovered ? hoverColor : SAND_FAINT,
        border: `1px solid ${hovered ? hoverColor : SAND_BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered ? '#fff' : SAND_DIM,
        textDecoration: 'none', fontSize: '1rem',
        transition: 'all 0.28s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 6px 18px ${hoverColor}55` : 'none',
      }}
    >
      <i className={icon}></i>
    </a>
  );
};

const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <li>
      <Link to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          textDecoration: 'none',
          color: hovered ? SAND : SAND_DIM,
          fontSize: '0.95rem',
          display: 'flex', alignItems: 'center', gap: '10px',
          transition: 'all 0.22s ease',
          paddingLeft: hovered ? '8px' : '0',
        }}
      >
        <span style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: SAND,
          opacity: hovered ? 1 : 0.3,
          display: 'inline-block', flexShrink: 0,
          transition: 'opacity 0.22s ease',
        }} />
        {label}
      </Link>
    </li>
  );
};

const SectionHeading: React.FC<{ title: string; accentColor: string }> = ({ title, accentColor }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div 
      style={{ position: 'relative', paddingBottom: '0.9rem', marginBottom: '0.25rem', display: 'inline-block', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h4 style={{
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: '0.72rem',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: SAND,
        transition: 'color 0.3s ease',
        textShadow: hovered ? `0 0 12px ${accentColor}88` : 'none',
      }}>{title}</h4>
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '2px',
        width: hovered ? '100%' : '15px',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        borderRadius: '2px',
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        opacity: hovered ? 1 : 0.6,
      }} />
    </div>
  );
};

const footerQuotes = [
  { text: "Crafted with", icon: "fa-solid fa-heart", color: SAND, suffix: "for interactive experiences" },
  { text: "Built with", icon: "fa-solid fa-code", color: SAND, suffix: "and caffeine" },
  { text: "Designing the", icon: "fa-solid fa-rocket", color: SAND, suffix: "future of the web" },
  { text: "Engineering", icon: "fa-solid fa-bolt", color: SAND, suffix: "seamless digital products" },
  { text: "Pixel perfection", icon: "fa-solid fa-crosshairs", color: SAND, suffix: "in every component" },
  { text: "Turning", icon: "fa-solid fa-mug-hot", color: SAND, suffix: "into functioning code" },
  { text: "Writing", icon: "fa-solid fa-keyboard", color: SAND, suffix: "that changes the game" },
  { text: "Deploying", icon: "fa-solid fa-cloud", color: SAND, suffix: "scalable solutions" },
  { text: "Connecting", icon: "fa-solid fa-network-wired", color: SAND, suffix: "ideas with technology" },
  { text: "Creating", icon: "fa-solid fa-palette", color: SAND, suffix: "digital masterpieces" },
  { text: "Building", icon: "fa-solid fa-cubes", color: SAND, suffix: "robust architectures" },
  { text: "Weaving", icon: "fa-solid fa-spider", color: SAND, suffix: "the fabric of the web" },
  { text: "Forging", icon: "fa-solid fa-hammer", color: SAND, suffix: "next-gen applications" },
  { text: "Exploring", icon: "fa-solid fa-compass", color: SAND, suffix: "uncharted digital realms" },
  { text: "Unlocking", icon: "fa-solid fa-key", color: SAND, suffix: "infinite possibilities" },
  { text: "Illuminating", icon: "fa-solid fa-lightbulb", color: SAND, suffix: "dark mode interfaces" },
  { text: "Solving", icon: "fa-solid fa-puzzle-piece", color: SAND, suffix: "complex problems daily" },
  { text: "Fusing", icon: "fa-solid fa-atom", color: SAND, suffix: "design and functionality" },
  { text: "Optimizing", icon: "fa-solid fa-gauge-high", color: SAND, suffix: "for peak performance" },
  { text: "Dreaming", icon: "fa-solid fa-cloud-moon", color: SAND, suffix: "in responsive grids" },
  { text: "Sailing", icon: "fa-solid fa-sailboat", color: SAND, suffix: "the seas of cyberspace" },
  { text: "Chasing", icon: "fa-solid fa-bug", color: SAND, suffix: "away all the errors" },
  { text: "Mastering", icon: "fa-solid fa-wand-magic-sparkles", color: SAND, suffix: "frontend wizardry" },
  { text: "Defending", icon: "fa-solid fa-shield-halved", color: SAND, suffix: "against bad UX" },
  { text: "Cultivating", icon: "fa-solid fa-seedling", color: SAND, suffix: "organic digital growth" },
  { text: "Sparking", icon: "fa-solid fa-fire", color: SAND, suffix: "innovation every day" },
  { text: "Mapping", icon: "fa-solid fa-map", color: SAND, suffix: "new user journeys" },
  { text: "Translating", icon: "fa-solid fa-language", color: SAND, suffix: "ideas into reality" },
  { text: "Syncing", icon: "fa-solid fa-arrows-rotate", color: SAND, suffix: "vision with execution" },
  { text: "Assembling", icon: "fa-solid fa-layer-group", color: SAND, suffix: "pixel by pixel" },
  { text: "Drafting", icon: "fa-solid fa-pen-ruler", color: SAND, suffix: "the future of UI" },
  { text: "Analyzing", icon: "fa-solid fa-chart-line", color: SAND, suffix: "metrics that matter" },
  { text: "Securing", icon: "fa-solid fa-lock", color: SAND, suffix: "the web for everyone" },
  { text: "Connecting", icon: "fa-solid fa-link", color: SAND, suffix: "the dots in data" },
  { text: "Powering", icon: "fa-solid fa-battery-full", color: SAND, suffix: "digital transformations" },
  { text: "Balancing", icon: "fa-solid fa-scale-balanced", color: SAND, suffix: "form and function" },
  { text: "Directing", icon: "fa-solid fa-clapperboard", color: SAND, suffix: "cinematic experiences" },
  { text: "Navigating", icon: "fa-solid fa-location-arrow", color: SAND, suffix: "the digital frontier" },
  { text: "Sharpening", icon: "fa-solid fa-laptop-code", color: SAND, suffix: "my technical edge" },
  { text: "Broadcasting", icon: "fa-solid fa-tower-broadcast", color: SAND, suffix: "creativity globally" },
  { text: "Filtering", icon: "fa-solid fa-filter", color: SAND, suffix: "noise to find signals" },
  { text: "Weighing", icon: "fa-solid fa-anchor", color: SAND, suffix: "down the competition" },
  { text: "Focusing", icon: "fa-solid fa-camera-retro", color: SAND, suffix: "on the big picture" },
  { text: "Targeting", icon: "fa-solid fa-bullseye", color: SAND, suffix: "absolute perfection" },
  { text: "Charging", icon: "fa-solid fa-plug", color: SAND, suffix: "up the modern web" },
  { text: "Refining", icon: "fa-solid fa-gem", color: SAND, suffix: "raw ideas into gems" },
  { text: "Constructing", icon: "fa-solid fa-trowel-bricks", color: SAND, suffix: "solid foundations" },
  { text: "Polishing", icon: "fa-solid fa-broom", color: SAND, suffix: "every single detail" },
  { text: "Stitching", icon: "fa-solid fa-scissors", color: SAND, suffix: "code seamlessly together" },
  { text: "Brewing", icon: "fa-solid fa-flask", color: SAND, suffix: "the perfect formula" },
  { text: "Orchestrating", icon: "fa-solid fa-music", color: SAND, suffix: "beautiful logic" },
  { text: "Measuring", icon: "fa-solid fa-ruler", color: SAND, suffix: "twice, coding once" },
  { text: "Unleashing", icon: "fa-solid fa-dragon", color: SAND, suffix: "raw computing power" }
];

const Footer: React.FC = () => {
  const location = useLocation();
  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);

  React.useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => {
      setQuoteIndex(prev => (prev + 1) % footerQuotes.length);
      setFade(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const currentQuote = footerQuotes[quoteIndex];

  return (
    <footer style={{
      position: 'relative',
      background: `linear-gradient(180deg, transparent 0%, ${BLACK}ee 12%, ${BLACK} 100%)`,
      borderTop: `1px solid ${SAND_BORDER}`,
      padding: '4.5rem 0 0 0',
      marginTop: '5rem',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
    }}>

      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '-60px', left: '5%',
        width: '400px', height: '400px',
        background: `radial-gradient(circle, ${RED_DEEP}55 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '0', right: '5%',
        width: '350px', height: '350px',
        background: `radial-gradient(circle, ${RED_MID}44 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Sand shimmer top border */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: `linear-gradient(90deg, transparent, ${SAND}44, transparent)`,
        zIndex: 1,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>

        {/* Main 3-column grid */}
        <div className="footer-grid" style={{ paddingBottom: '3rem', borderBottom: `1px solid ${SAND_BORDER}` }}>

          {/* Column 1 — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                <img src="/logo.png" alt="Veera Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D1D5DB', letterSpacing: '-0.5px', fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>Veera</span>
              </Link>

            <p style={{ color: SAND_DIM, fontSize: '0.9rem', lineHeight: 1.8, margin: 0, maxWidth: '320px' }}>
              Crafting digital experiences with precision and passion — bridging complex problems with elegant, interactive solutions.
            </p>

            {/* Divider */}
            <div style={{ width: '48px', height: '2px', background: `linear-gradient(90deg, ${SAND}, transparent)`, borderRadius: '2px' }} />

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <SocialBtn href="https://www.linkedin.com/in/veera-%E2%9C%A6%EF%B8%8E-a6b488327" icon="fa-brands fa-linkedin-in" hoverColor="#0A66C2" />
              <SocialBtn href="https://instagram.com/veeramani_4ever" icon="fa-brands fa-instagram" hoverColor="#E1306C" />
              <SocialBtn href="https://x.com/veera_4ever" icon="fa-brands fa-x-twitter" hoverColor="#000000" />
              <SocialBtn href="https://github.com" icon="fa-brands fa-github" hoverColor="#6e5494" />
              <SocialBtn href={`https://wa.me/${rawPhone}`} icon="fa-brands fa-whatsapp" hoverColor="#25D366" />
            </div>
          </div>

          {/* Column 2 — Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SectionHeading title="Explore" accentColor={SAND} />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />
              <NavLink to="/projects" label="Projects" />
              <NavLink to="/services" label="Skills" />
              <NavLink to="/contact" label="Contact" />
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SectionHeading title="Get in Touch" accentColor={RED_DEEP} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <ContactCard
                icon="fa-solid fa-phone"
                label="Direct Call"
                value="Call Me"
                href={`tel:${phoneNumber}`}
                accentColor={SAND}
              />
              <ContactCard
                icon="fa-brands fa-whatsapp"
                label="WhatsApp"
                value="Message Me"
                href={`https://wa.me/${rawPhone}`}
                accentColor={SAND}
                isExternal
              />
              <ContactCard
                icon="fa-solid fa-envelope"
                label="Email"
                value="Email Me"
                href={`mailto:${email}`}
                accentColor={SAND}
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '1.6rem 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <span style={{ color: SAND_DIM, fontSize: '0.82rem' }}>
            &copy; {new Date().getFullYear()} <span style={{ color: SAND, fontWeight: 600 }}>veeramani.in</span>. All rights reserved.
          </span>
          <span style={{ 
            color: SAND_DIM, 
            fontSize: '0.82rem',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            {currentQuote.text} <i className={currentQuote.icon} style={{ color: currentQuote.color, margin: '0 4px', filter: `drop-shadow(0 0 4px ${currentQuote.color})` }}></i> {currentQuote.suffix}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
