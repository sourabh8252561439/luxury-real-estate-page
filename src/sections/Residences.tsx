import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const residences = [
  {
    title: 'Penthouse Suites',
    image: '/images/residence-1.jpg',
    alt: 'Luxury penthouse living room with panoramic city views at golden hour',
  },
  {
    title: 'Garden Villas',
    image: '/images/residence-2.jpg',
    alt: 'Aerial view of modern glass residential tower at dusk reflecting on waterfront',
  },
  {
    title: 'Sky Apartments',
    image: '/images/residence-3.jpg',
    alt: 'Luxury bedroom with panoramic waterfront views and morning light',
  },
  {
    title: 'Waterfront Lofts',
    image: '/images/residence-4.jpg',
    alt: 'Private rooftop terrace with infinity pool overlooking city skyline at sunset',
  },
]

export default function Residences() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
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
      id="residences"
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        background: '#1a1a1a',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
        {/* Label */}
        <span
          className="block text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.6875rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245, 240, 235, 0.4)',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          RESIDENCES
        </span>

        {/* Heading */}
        <h2
          className="text-center mx-auto"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: '#f5f0eb',
            maxWidth: 700,
            marginBottom: 'clamp(3rem, 6vw, 4rem)',
            textWrap: 'balance',
          }}
        >
          Designed for those who expect more
        </h2>
      </div>

      {/* Grid - 1px gap shows dark background as grid lines */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 1,
          background: '#1a1a1a',
        }}
      >
        {residences.map((residence, i) => (
          <div
            key={residence.title}
            ref={(el) => { cardsRef.current[i] = el }}
            className="group relative cursor-pointer overflow-hidden"
            style={{ opacity: 0 }}
          >
            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={residence.image}
                alt={residence.alt}
                className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(15,15,15,0.6) 0%, transparent 50%)',
                }}
              />
              {/* Gold border on hover */}
              <div
                className="absolute bottom-0 left-0 w-0 h-px bg-[#c8a97e] transition-all duration-500 group-hover:w-full"
              />
            </div>

            {/* Title */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              <h3
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontWeight: 400,
                  fontSize: '1.5rem',
                  color: '#f5f0eb',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {residence.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
