import { Heart, Users, Calendar, Camera, Utensils, Music, MapPin, Star } from 'lucide-react'
import Link from 'next/link'

export default function ServiciosPage() {
  const services = [
    {
      icon: Heart,
      title: 'Organización de Bodas',
      description: 'Hacemos realidad la boda de tus sueños con planificación integral y atención a cada detalle.',
      features: [
        'Coordinación general del evento',
        'Selección y coordinación de proveedores',
        'Decoración temática personalizada',
        'Protocolo de ceremonia y recepción',
        'Timeline detallado del evento',
        'Supervisión el día de la boda'
      ],
      price: 'Desde $150,000',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80'
    },
    {
      icon: Users,
      title: 'Quinceaños Únicos',
      description: 'Celebra este momento tan especial con una fiesta inolvidable llena de magia y diversión.',
      features: [
        'Decoración temática personalizada',
        'Protocolo de vals y ceremonia',
        'Coordinación de DJ y música',
        'Mesa de dulces y torta',
        'Fotografía y video del evento',
        'Animación y entretenimiento'
      ],
      price: 'Desde $80,000',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80'
    },
    {
      icon: Utensils,
      title: 'Catering Premium',
      description: 'Menús exquisitos diseñados por chefs profesionales para deleitar a todos tus invitados.',
      features: [
        'Menús personalizados según preferencias',
        'Opciones vegetarianas y veganas',
        'Servicio de meseros profesional',
        'Bebidas y cocktails incluidos',
        'Montaje elegante de mesas',
        'Servicio de barra libre'
      ],
      price: 'Desde $2,500 por persona',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
    },
    {
      icon: Camera,
      title: 'Fotografía y Video',
      description: 'Capturamos cada momento especial con profesionalismo y creatividad artística.',
      features: [
        'Sesión de fotos pre-evento',
        'Cobertura completa del evento',
        'Video cinematográfico profesional',
        'Entrega de fotos editadas',
        'Album digital personalizado',
        'Drone para tomas aéreas'
      ],
      price: 'Desde $45,000',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80'
    },
    {
      icon: Music,
      title: 'Entretenimiento',
      description: 'Música, sonido e iluminación profesional para mantener la energía durante toda la celebración.',
      features: [
        'DJ profesional especializado',
        'Sistema de sonido de alta calidad',
        'Iluminación LED especializada',
        'Pista de baile portátil',
        'Micrófono inalámbrico',
        'Música personalizada según gustos'
      ],
      price: 'Desde $35,000',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80'
    },
    {
      icon: MapPin,
      title: 'Espacios y Venues',
      description: 'Selección de los mejores espacios para tu evento, desde jardines hasta salones elegantes.',
      features: [
        'Jardines para ceremonias al aire libre',
        'Salones elegantes para recepciones',
        'Terrazas con vistas panorámicas',
        'Espacios históricos únicos',
        'Coordinación con el venue',
        'Visitas guiadas a espacios'
      ],
      price: 'Consultar disponibilidad',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80'
    }
  ]

  const packages = [
    {
      name: 'Paquete Básico',
      description: 'Perfecto para eventos íntimos',
      price: '$120,000',
      features: [
        'Coordinación general',
        'Decoración básica',
        'Catering para 50 personas',
        'DJ por 6 horas',
        'Fotografía básica'
      ]
    },
    {
      name: 'Paquete Premium',
      description: 'La opción más popular',
      price: '$250,000',
      features: [
        'Coordinación integral',
        'Decoración temática completa',
        'Catering gourmet para 100 personas',
        'DJ + iluminación profesional',
        'Fotografía y video completo',
        'Flores y centros de mesa'
      ],
      popular: true
    },
    {
      name: 'Paquete Luxury',
      description: 'Experiencia premium total',
      price: '$450,000',
      features: [
        'Coordinación VIP completa',
        'Decoración de lujo personalizada',
        'Catering premium para 150 personas',
        'Entretenimiento completo',
        'Fotografía + video cinematográfico',
        'Transporte y hospedaje coordinado',
        'Wedding planner dedicado'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
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
                    <span className="text-2xl font-bold text-pink-600">{service.price}</span>
                    <Link 
                      href="/agendar"
                      className="bg-[#ff6b81] text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      Consultar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Paquetes Integrales
            </h2>
            <p className="text-xl text-gray-600">
              Opciones completas diseñadas para diferentes necesidades y presupuestos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-8 transition-transform hover:scale-105 ${
                  pkg.popular 
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white ring-4 ring-pink-200' 
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-5 w-5 mr-1" />
                    <span className="text-sm font-semibold">MÁS POPULAR</span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-gray-800'}`}>
                  {pkg.name}
                </h3>
                <p className={`mb-6 ${pkg.popular ? 'text-pink-100' : 'text-gray-600'}`}>
                  {pkg.description}
                </p>
                <div className="text-4xl font-bold mb-6">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 ${
                        pkg.popular ? 'bg-white' : 'bg-pink-500'
                      }`}></span>
                      <span className={pkg.popular ? 'text-pink-100' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/agendar"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    pkg.popular 
                      ? 'bg-white text-pink-600 hover:bg-gray-100' 
                      : 'bg-[#ff6b81] text-white hover:bg-pink-600'
                  }`}
                >
                  Seleccionar Paquete
                </Link>
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
            Agenda una consulta gratuita y conversemos sobre cómo hacer realidad la celebración perfecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/agendar"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Agendar Consulta Gratuita
            </Link>
            <Link 
              href="/galeria"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              Ver Galería
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}