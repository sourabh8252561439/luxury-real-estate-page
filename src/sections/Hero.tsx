import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

interface LetterColumn {
  letters: string[]
}

const line1Columns: LetterColumn[] = [
  { letters: ['T', 'H', 'E'] },
  { letters: ['F', 'U', 'T', 'U', 'R', 'E'] },
]

const line2Columns: LetterColumn[] = [
  { letters: ['O', 'F'] },
  { letters: ['U', 'R', 'B', 'A', 'N'] },
  { letters: ['L', 'I', 'V', 'I', 'N', 'G'] },
]

function LetterLine({
  columns,
  lineId,
}: {
  columns: LetterColumn[]
  lineId: string
}) {
  const totalLetters = columns.reduce((sum, col) => sum + col.letters.length, 0)
  const letterWidthVw = 5

  return (
    <div
      className="header-line"
      data-line={lineId}
      style={{
        display: 'flex',
        gap: '5vw',
        overflow: 'hidden',
        height: 'clamp(4rem, 15vw, 12rem)',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {columns.map((column, colIdx) => {
        const prevLetters = columns
          .slice(0, colIdx)
          .reduce((sum, c) => sum + c.letters.length, 0)
        return (
          <div
            key={colIdx}
            className={`column column-${lineId}-${colIdx}`}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              width: `${column.letters.length * letterWidthVw}vw`,
              height: 'clamp(4rem, 15vw, 12rem)',
            }}
          >
            {column.letters.map((letter, letterIdx) => {
              const globalIdx = prevLetters + letterIdx
              const isLeftHalf = globalIdx < totalLetters / 2
              return (
                <div
                  key={letterIdx}
                  className="letter-wrapper"
                  style={{
                    position: 'absolute',
                    width: `${letterWidthVw}vw`,
                    height: 'clamp(4rem, 15vw, 12rem)',
                    left: `${letterIdx * letterWidthVw}vw`,
                    overflow: 'hidden',
                  }}
                >
                  <span
                    className={`letter letter-${lineId}`}
                    data-direction={isLeftHalf ? 'left' : 'right'}
                    style={{
                      display: 'block',
                      width: `${letterWidthVw}vw`,
                      height: 'clamp(4rem, 15vw, 12rem)',
                      fontSize: 'clamp(3rem, 12vw, 10rem)',
                      fontWeight: 400,
                      fontFamily: '"Instrument Serif", serif',
                      lineHeight: 'clamp(4rem, 15vw, 12rem)',
                      textAlign: 'center',
                      color: '#f5f0eb',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    {letter}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setShowSubtitle(true)
      setShowScrollIndicator(true)
      return
    }

    const tl = anime.timeline({ loop: false })

    // Animate columns converging
    tl.add({
      targets: '.column',
      translateX: (el: HTMLElement, _i: number) => {
        const columnsInLine = el.parentElement?.querySelectorAll('.column')
        if (!columnsInLine) return 0
        const colIdx = Array.from(columnsInLine).indexOf(el)
        const halfCount = columnsInLine.length / 2
        return colIdx < halfCount ? ['2.5vw', '0vw'] : ['-2.5vw', '0vw']
      },
      easing: 'easeOutQuad',
      duration: 1000,
    })

    // Animate letters sliding in
    tl.add(
      {
        targets: '.letter',
        translateX: (el: HTMLElement) => {
          const direction = el.getAttribute('data-direction')
          return direction === 'left' ? ['-102%', '0%'] : ['102%', '0%']
        },
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(50, { start: 200 }),
      },
      0
    )

    // Show subtitle after animation
    tl.finished.then(() => {
      setTimeout(() => setShowSubtitle(true), 200)
      setTimeout(() => setShowScrollIndicator(true), 500)
    })
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex flex-col items-center justify-center"
      style={{
        height: '100vh',
        minHeight: 600,
        background: '#0f0f0f',
        overflow: 'hidden',
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
        <LetterLine columns={line1Columns} lineId="l1" />
        <LetterLine columns={line2Columns} lineId="l2" />
      </div>

      {/* Subtitle */}
      <div
        className="transition-all duration-700"
        style={{
          marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
          maxWidth: 480,
          textAlign: 'center',
          padding: '0 1.5rem',
          opacity: showSubtitle ? 1 : 0,
          transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
            color: 'rgba(245, 240, 235, 0.6)',
            lineHeight: 1.6,
          }}
        >
          Exclusive waterfront residences. Panoramic views. Uncompromising luxury.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute flex flex-col items-center transition-all duration-700"
        style={{
          bottom: 'clamp(2rem, 5vh, 4rem)',
          opacity: showScrollIndicator ? 1 : 0,
          transform: showScrollIndicator ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'rgba(245, 240, 235, 0.35)',
            marginBottom: 12,
          }}
        >
          Scroll to explore
        </span>
        <div
          className="relative"
          style={{ width: 1, height: 40, background: 'rgba(200, 169, 126, 0.3)' }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#c8a97e',
              animation: 'scrollDot 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0% { top: 0; opacity: 1; }
          80% { top: 36px; opacity: 0.3; }
          100% { top: 0; opacity: 1; }
        }
      `}</style>
    </section>
  )
}
