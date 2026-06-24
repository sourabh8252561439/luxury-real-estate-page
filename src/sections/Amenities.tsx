import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const amenities = [
  { name: 'Infinity Pool & Spa Terrace', desc: 'Sunset lounge with panoramic views' },
  { name: 'Private Cinema', desc: '40-seat theatre with Dolby Atmos' },
  { name: 'Sky Fitness Center', desc: 'State-of-the-art equipment' },
  { name: 'Wine Cellar & Tasting Room', desc: 'Curated collection' },
  { name: 'Concierge & Valet Service', desc: '24/7 dedicated staff' },
  { name: 'Rooftop Garden', desc: 'Landscaped oasis with event pavilion' },
]

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current.filter(Boolean),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="amenities"
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        background: '#0f0f0f',
      }}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{ maxWidth: 1280, margin: '0 auto', gap: 'clamp(2rem, 4vw, 4rem)' }}
      >
        {/* Left column - 45% */}
        <div className="w-full md:w-[45%]">
          <span
            className="block"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c8a97e',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            AMENITIES
          </span>
          <h2
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              color: '#f5f0eb',
              textWrap: 'balance',
            }}
          >
            Life elevated at every level
          </h2>
        </div>

        {/* Right column - 50% */}
        <div className="w-full md:w-[50%]" style={{ display: 'flex', flexDirection: 'column' }}>
          {amenities.map((amenity, i) => (
            <div
              key={amenity.name}
              ref={(el) => { rowsRef.current[i] = el }}
              className="opacity-0"
              style={{
                borderTop: '1px solid rgba(245, 240, 235, 0.1)',
                padding: 'clamp(1.25rem, 2vw, 1.75rem) 0',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ gap: '0.25rem' }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#f5f0eb',
                  }}
                >
                  {amenity.name}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.8125rem',
                    color: 'rgba(245, 240, 235, 0.4)',
                  }}
                >
                  {amenity.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
