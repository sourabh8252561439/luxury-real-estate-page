import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(labelRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          headingRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .to(
          bodyRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          statsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        background: '#faf8f5',
      }}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{ maxWidth: 1280, margin: '0 auto', gap: 'clamp(2rem, 4vw, 4rem)' }}
      >
        {/* Left column - 40% */}
        <div className="w-full md:w-[40%]">
          <span
            ref={labelRef}
            className="block opacity-0 translate-y-[30px]"
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
            THE VISION
          </span>
          <h2
            ref={headingRef}
            className="opacity-0 translate-y-[30px]"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              color: '#1a1a1a',
              textWrap: 'balance',
            }}
          >
            Where architecture meets the horizon
          </h2>
        </div>

        {/* Right column - 55% with 5% offset */}
        <div className="w-full md:w-[55%] md:ml-[5%]">
          <p
            ref={bodyRef}
            className="opacity-0 translate-y-[30px]"
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
            Skyline Heights represents a new paradigm in luxury waterfront living. 
            Rising 45 stories above the Marina District, this architectural landmark 
            offers an unparalleled collection of residences designed for those who 
            refuse to compromise. Every detail — from the hand-selected Italian marble 
            to the floor-to-ceiling windows that frame panoramic water views — has been 
            meticulously considered to create spaces that inspire and endure.
          </p>

          <div
            ref={statsRef}
            className="flex flex-wrap opacity-0 translate-y-[30px]"
            style={{
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
              borderTop: '1px solid rgba(26, 26, 26, 0.1)',
            }}
          >
            {[
              { value: '45', label: 'Floors' },
              { value: '280', label: 'Residences' },
              { value: '12', label: 'Amenities' },
            ].map((stat) => (
              <div key={stat.label}>
                <span
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontWeight: 400,
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
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
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(26, 26, 26, 0.5)',
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
