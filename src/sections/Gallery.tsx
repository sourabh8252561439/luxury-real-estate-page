import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Double-height lobby with travertine walls and sculptural chandelier' },
  { src: '/images/gallery-2.jpg', alt: 'Modern residential tower complex at twilight with illuminated pool deck' },
  { src: '/images/gallery-3.jpg', alt: 'Private home cinema with plush velvet seats and acoustic wood paneling' },
  { src: '/images/gallery-4.jpg', alt: 'Landscaped rooftop garden with timber decking and outdoor dining' },
  { src: '/images/gallery-5.jpg', alt: 'Luxury kitchen with marble island bench and waterfront views' },
  { src: '/images/gallery-6.jpg', alt: 'Waterfront promenade at dusk with modern residential towers' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[]
      if (!items.length) return

      // 3D parallax scroll animation
      items.forEach((item, index) => {
        const isEven = index % 2 === 0
        const rotationY = isMobile ? 15 : 45
        const zStart = isMobile ? -800 : -2000
        const zEnd = isMobile ? 600 : 1500

        gsap.fromTo(
          item,
          {
            z: zStart,
            yPercent: isEven ? -100 : 100,
            rotationY: isEven ? rotationY : -rotationY,
          },
          {
            z: zEnd,
            yPercent: isEven ? 100 : -100,
            rotationY: isEven ? -rotationY : rotationY,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'center bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        padding: '10vh 0 20vh',
        background: '#faf8f5',
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
            color: '#c8a97e',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          GALLERY
        </span>

        {/* Heading */}
        <h2
          className="text-center"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: '#1a1a1a',
            marginBottom: 'clamp(4rem, 8vw, 6rem)',
            textWrap: 'balance',
          }}
        >
          Every angle, a masterpiece
        </h2>
      </div>

      {/* 3D Grid */}
      <div
        ref={gridRef}
        className="grid-container"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          perspective: 1000,
          transformStyle: 'preserve-3d',
          gap: '2vw',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
        }}
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => { itemsRef.current[i] = el }}
            className="gallery-item"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              marginTop: i % 2 === 0 ? 50 : 0,
              width: '100%',
            }}
          >
            <div
              className="gallery-item-img"
              style={{
                width: '100%',
                aspectRatio: '2/3',
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              role="img"
              aria-label={img.alt}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
