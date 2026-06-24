import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '3 min', label: 'Walk to Marina Promenade' },
  { value: '12 min', label: 'Drive to Financial District' },
  { value: '28 min', label: 'Transfer to International Airport' },
]

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slides in from left
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Text content staggers in from right
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="location"
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        background: '#faf8f5',
      }}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{ maxWidth: 1280, margin: '0 auto', gap: 'clamp(2rem, 4vw, 4rem)' }}
      >
        {/* Left column - 55% image */}
        <div className="w-full md:w-[55%]">
          <div
            ref={imageRef}
            className="opacity-0 overflow-hidden"
            style={{ aspectRatio: '16/10' }}
          >
            <img
              src="/images/location-view.jpg"
              alt="Aerial view of waterfront district with marina and contemporary residential towers"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right column - 45% */}
        <div ref={textRef} className="w-full md:w-[45%] flex flex-col justify-center">
          <span
            className="opacity-0"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c8a97e',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              display: 'block',
            }}
          >
            LOCATION
          </span>

          <h2
            className="opacity-0"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              color: '#1a1a1a',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              textWrap: 'balance',
            }}
          >
            The heart of the waterfront district
          </h2>

          <p
            className="opacity-0"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
              lineHeight: 1.7,
              letterSpacing: '0.005em',
              color: 'rgba(26, 26, 26, 0.7)',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            Nestled in the coveted Marina District, Skyline Heights offers unparalleled 
            access to the city's finest dining, cultural landmarks, and leisure destinations. 
            The waterfront promenade is your front yard, while the financial district and 
            international airport are just minutes away.
          </p>

          {/* Stats */}
          <div className="flex flex-col opacity-0" style={{ gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <span
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontWeight: 400,
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    color: '#c8a97e',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.8125rem',
                    color: 'rgba(26, 26, 26, 0.55)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
