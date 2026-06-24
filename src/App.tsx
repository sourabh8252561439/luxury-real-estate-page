import { useEffect } from 'react'
import Lenis from 'lenis'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Introduction from './sections/Introduction'
import Residences from './sections/Residences'
import Gallery from './sections/Gallery'
import Amenities from './sections/Amenities'
import Location from './sections/Location'
import LeadCapture from './sections/LeadCapture'
import Footer from './sections/Footer'

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Navigation />
      <main>
        <Hero />
        <Introduction />
        <Residences />
        <Gallery />
        <Amenities />
        <Location />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  )
}
