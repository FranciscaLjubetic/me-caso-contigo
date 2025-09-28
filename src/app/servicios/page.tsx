import { Heart, Users, Calendar, Camera, Star } from 'lucide-react'
import Link from 'next/link'
import { services } from '@/lib/services-data'
import { packages } from '@/lib/packages-data'
import Button from '@/components/Button'

export default function ServiciosPage() {

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero Section */}
    <section className="bg-gradient-to-br from-[#ff6b81] to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">
        Nuestros Servicios
        </h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
        Ofrecemos servicios integrales para hacer de tu evento una experiencia perfecta e inolvidable. 
        Cada detalle cuidadosamente planificado para superar tus expectativas.
        </p>
      </div>
    </section>

      {/* Servicios Principales */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Servicios Especializados
            </h2>
            <p className="text-xl text-gray-600">
              Cada servicio está diseñado para crear momentos mágicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-8 w-8 text-pink-500 mr-3" />
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-pink-600">{service.price}</span>
                    <Button 
                      href="/agendar"
                      variant="primary"
                      size="sm"
                    >
                      Consultar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Por qué elegirnos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir Me Caso Contigo?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experiencia Comprobada</h3>
              <p className="text-gray-600">Más de 500 eventos exitosos nos respaldan</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">Cada evento es único y especial para nosotros</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coordinación Total</h3>
              <p className="text-gray-600">Nos encargamos de todos los detalles</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipo Profesional</h3>
              <p className="text-gray-600">Proveedores de confianza y calidad garantizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-[#ff6b81] to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para planificar tu evento soñado?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contacta con nosotros y conversemos sobre cómo hacer realidad la celebración perfecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/agendar"
              variant="secondary"
              size="lg"
            >
              Cotiza con nosotros
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
      </section>
    </div>
  )
}