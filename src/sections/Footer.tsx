import { useEffect, useRef } from 'react'

const ringTexts = [
  'SKYLINE HEIGHTS',
  'LUXURY LIVING',
  'WATERFRONT VIEWS',
  'ARCHITECTURAL EXCELLENCE',
]

// Duplicate items 3x for seamless infinite scrolling
const items = Array(3).fill(ringTexts).flat()

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const rotationRef = useRef({ y: 0 })
  const rafRef = useRef<number>(0)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const ringItems = itemsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!ringItems.length) return

    const itemCount = ringItems.length
    const angleStep = 360 / itemCount

    const updatePositions = () => {
      const ringRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35

      ringItems.forEach((item, index) => {
        const angle = (index * angleStep + rotationRef.current.y) * (Math.PI / 180)
        const isTopHalf = ((index * angleStep + rotationRef.current.y) % 360 + 360) % 360 < 180
        const extraRotationX = isHoveredRef.current ? (isTopHalf ? -1 : 1) * 15 : 0

        const y = -ringRadius * Math.cos(angle)
        const z = ringRadius * Math.sin(angle)
        const rotationX = index * angleStep + rotationRef.current.y + extraRotationX

        item.style.transform = `translate3d(0px, ${y}px, ${z}px) rotateX(${rotationX}deg)`
        item.style.opacity = `${0.3 + 0.7 * ((Math.sin(angle) + 1) / 2)}`
      })
    }

    const animate = () => {
      const speed = isHoveredRef.current ? 0.15 : 0.35
      rotationRef.current.y += speed
      updatePositions()
      rafRef.current = requestAnimationFrame(animate)
    }

    // Set initial styles
    ringItems.forEach((item) => {
      item.style.willChange = 'transform'
      item.style.transformOrigin = 'center'
    })

    updatePositions()
    rafRef.current = requestAnimationFrame(animate)

    const handleResize = () => updatePositions()
    window.addEventListener('resize', handleResize)

    // Hover interactions
    const section = sectionRef.current
    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }
    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    section?.addEventListener('mouseenter', handleMouseEnter)
    section?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      section?.removeEventListener('mouseenter', handleMouseEnter)
      section?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <footer
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      {/* 3D Text Ring */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50vh',
          minHeight: 300,
          overflow: 'hidden',
          transform: 'scale(1.5)',
        }}
      >
        {/* Radial mask */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            backgroundImage: 'radial-gradient(circle at center, transparent 30%, rgb(15, 15, 15) 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Ring */}
        <div
          ref={ringRef}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            perspective: 1000,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((text, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el }}
              className="ring-item"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase',
                fontFamily: '"Instrument Serif", serif',
                fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
                fontWeight: 400,
                color: '#f5f0eb',
                transition: 'color 0.3s ease',
                cursor: 'default',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c8a97e'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#f5f0eb'
              }}
            >
              <span className="relative">
                {text}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    content: '""',
                    inset: '-4px -12px',
                    background: 'radial-gradient(ellipse at center, rgba(200, 169, 126, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact details */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center flex-wrap"
        style={{
          gap: 'clamp(1rem, 3vw, 2.5rem)',
          marginTop: 'clamp(2rem, 5vw, 4rem)',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {[
          'hello@skylineheights.com',
          '+1 (212) 555-0147',
          'Waterfront District, Marina Bay',
        ].map((contact) => (
          <span
            key={contact}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.875rem',
              color: 'rgba(245, 240, 235, 0.5)',
            }}
          >
            {contact}
          </span>
        ))}
      </div>

      {/* Copyright */}
      <div
        style={{
          marginTop: 'clamp(2rem, 4vw, 3rem)',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '0.6875rem',
            color: 'rgba(245, 240, 235, 0.3)',
          }}
        >
          &copy; 2025 Skyline Heights. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
