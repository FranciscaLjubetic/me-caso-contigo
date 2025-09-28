import { Calendar, Heart, Star } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          {/* Logo grande */}
          <div className="mb-2">
            <Logo size="xl" className="mx-auto" />
          </div>
          
          <h1 className="text-2xl md:text-2xl font-bold text-white mb-4">
            Tu Día Perfecto
            <span className=" text-pink-400"> Empieza Aquí</span>
          </h1>
          <p className="textlg text-gray-100 mb-8 max-w-3xl mx-auto">
            Creamos experiencias únicas e inolvidables para tu matrimonio y eventos especiales. 
            Cada detalle pensado con amor para hacer realidad el evento de tus sueños.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              href="/agendar"
              variant="primary"
              size="lg"
            >
              Cotizar
            </Button>
            <Button 
              href="/galeria"
              variant="secondary"
              size="lg"
            >
              Ver Galería
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg shadow-lg border border-gray-600/40">
            <Calendar className="h-12 w-12 text-rose-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Planificación Personalizada</h3>
            <p className="text-gray-200">
              Agenda una cita y trabajemos juntos para crear el evento perfecto
            </p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg border border-gray-600/40">
            <Heart className="h-12 w-12 text-rose-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Atención al Detalle</h3>
            <p className="text-gray-200">
              Cuidamos cada aspecto de tu evento para que sea memorable
            </p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg border border-gray-600/40">
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