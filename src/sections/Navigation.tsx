import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { label: 'Residences', href: '#residences' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full transition-shadow duration-300"
      style={{
        height: 64,
        zIndex: 1000,
        background: 'rgba(245, 240, 235, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 0 rgba(26,26,26,0.06)' : 'none',
      }}
    >
      <div
        className="flex items-center justify-between h-full"
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="tracking-[0.14em] text-[#1a1a1a] no-underline"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase' }}
        >
          SKYLINE HEIGHTS
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#1a1a1a] no-underline relative group"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.8125rem', letterSpacing: '0.02em' }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c8a97e] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="no-underline transition-colors duration-300"
            style={{
              background: '#c8a97e',
              color: '#1a1a1a',
              padding: '8px 20px',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Book a Viewing
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          style={{ width: 28, height: 28, gap: 5 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block transition-all duration-300 bg-[#1a1a1a]"
            style={{
              width: 22,
              height: 1.5,
              transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="block transition-all duration-300 bg-[#1a1a1a]"
            style={{
              width: 22,
              height: 1.5,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block transition-all duration-300 bg-[#1a1a1a]"
            style={{
              width: 22,
              height: 1.5,
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed left-0 w-full flex flex-col"
          style={{
            top: 64,
            background: 'rgba(245, 240, 235, 0.98)',
            backdropFilter: 'blur(12px)',
            zIndex: 999,
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#1a1a1a] no-underline block"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '0.9375rem',
                padding: '16px clamp(1.5rem, 5vw, 4rem)',
                borderTop: i === 0 ? '1px solid rgba(26,26,26,0.08)' : 'none',
                borderBottom: '1px solid rgba(26,26,26,0.08)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="no-underline block text-center transition-colors duration-300"
            style={{
              background: '#c8a97e',
              color: '#1a1a1a',
              padding: '14px 20px',
              margin: '16px clamp(1.5rem, 5vw, 4rem)',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Book a Viewing
          </a>
        </div>
      )}
    </nav>
  )
}
