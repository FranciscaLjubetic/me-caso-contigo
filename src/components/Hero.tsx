import Link from 'next/link'
import { Calendar, Heart, Star } from 'lucide-react'
import Logo from './Logo'

export default function Hero() {
  return (
    <section className="relative pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          {/* Logo grande */}
          <div className="mb-4">
            <Logo size="xl" className="mx-auto" />
          </div>
          
          <h1 className="text-3xl md:text-3xl font-bold text-white mb-6">
            Tu Día Perfecto
            <span className="block text-pink-200">Empieza Aquí</span>
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Creamos experiencias únicas e inolvidables para tu boda, quinceaños y eventos especiales. 
            Cada detalle pensado con amor para hacer realidad el evento de tus sueños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/agendar"
              className="bg-rose-200 text-rose-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-rose-200 transition-colors"
            >
              Agendar Consulta Gratuita
            </Link>
            <Link 
              href="/galeria"
              className="border-2 border-rose-200 text-rose-100 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-rose-300 hover:text-rose-900 transition-colors"
            >
              Ver Galería
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg shadow-lg">
            <Calendar className="h-12 w-12 text-rose-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Planificación Personalizada</h3>
            <p className="text-gray-200">
              Agenda una cita y trabajemos juntos para crear el evento perfecto
            </p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg">
            <Heart className="h-12 w-12 text-rose-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Atención al Detalle</h3>
            <p className="text-gray-200">
              Cuidamos cada aspecto de tu evento para que sea memorable
            </p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg">
            <Star className="h-12 w-12 text-rose-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Experiencia Comprobada</h3>
            <p className="text-gray-200">
              Años de experiencia haciendo realidad sueños y celebraciones únicas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}