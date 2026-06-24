import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const unitOptions = [
  'Penthouse Suite',
  'Garden Villa',
  'Sky Apartment',
  'Waterfront Loft',
  'Undecided — Show Me All',
]

export default function LeadCapture() {
  const sectionRef = useRef<HTMLElement>(null)
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    unit: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fieldsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(245, 240, 235, 0.2)',
    color: '#f5f0eb',
    padding: '14px 0',
    fontSize: '0.9375rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    outline: 'none',
    transition: 'border-color 0.3s ease',
    borderRadius: 0,
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = '#c8a97e'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = 'rgba(245, 240, 235, 0.2)'
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        background: '#1a1a1a',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        {/* Label */}
        <span
          className="block"
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
          REGISTER YOUR INTEREST
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: '#f5f0eb',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            textWrap: 'balance',
          }}
        >
          Be among the first to experience Skyline Heights
        </h2>

        {submitted ? (
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              border: '1px solid rgba(200, 169, 126, 0.3)',
            }}
          >
            <h3
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#f5f0eb',
                marginBottom: '0.75rem',
              }}
            >
              Thank you for your interest
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '0.9375rem',
                color: 'rgba(245, 240, 235, 0.6)',
                lineHeight: 1.6,
              }}
            >
              Our team will be in touch shortly to arrange your private viewing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name */}
            <div ref={(el) => { fieldsRef.current[0] = el }} className="opacity-0">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                aria-label="Full Name"
              />
            </div>

            {/* Email */}
            <div ref={(el) => { fieldsRef.current[1] = el }} className="opacity-0">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                aria-label="Email Address"
              />
            </div>

            {/* Phone */}
            <div ref={(el) => { fieldsRef.current[2] = el }} className="opacity-0">
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                aria-label="Phone Number"
              />
            </div>

            {/* Unit Interest */}
            <div ref={(el) => { fieldsRef.current[3] = el }} className="opacity-0">
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,240,235,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0 center',
                  paddingRight: 20,
                }}
                aria-label="Unit Interest"
              >
                <option value="" disabled>
                  Select Unit Type
                </option>
                {unitOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div ref={(el) => { fieldsRef.current[4] = el }} className="opacity-0">
              <textarea
                placeholder="Tell us about your requirements (optional)"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                }}
                aria-label="Message"
              />
            </div>

            {/* Submit */}
            <div ref={(el) => { fieldsRef.current[5] = el }} className="opacity-0" style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="w-full transition-colors duration-300 cursor-pointer"
                style={{
                  background: '#c8a97e',
                  color: '#1a1a1a',
                  padding: '16px 32px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  border: 'none',
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d4b88e'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#c8a97e'
                }}
              >
                Register Interest
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
