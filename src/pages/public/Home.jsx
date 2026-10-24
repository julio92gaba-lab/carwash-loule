import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Differentials from '../../components/Differentials'
import Services from '../../components/Services'
import Gallery from '../../components/Gallery'
import BookingSection from '../../components/BookingSection'
import Location from '../../components/Location'
import Footer from '../../components/Footer'

export default function Home() {
  const scrollToAgendar = () => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div>
      <Navbar onAgendar={scrollToAgendar} />
      <Hero onAgendar={scrollToAgendar} />
      <Differentials />
      <Services />
      <Gallery />
      <BookingSection />
      <Location />
      <Footer />
    </div>
  )
}
