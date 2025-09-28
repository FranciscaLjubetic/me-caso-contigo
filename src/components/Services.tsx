import { Heart, Utensils, Music } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: 'Organización de Bodas',
      description: 'Planificación de tu boda desde la ceremonia hasta la fiesta.',
      features: ['Coordinación general', 'Gastronomía', 'Ambientación', 'Servicio', 'Timeline detallado']
    },
    {
      icon: Utensils,
      title: 'Catering Premium',
      description: 'Menús diseñados especialmente para tu evento. Desde cenas formales hasta cocktails casuales.',
      features: ['Menús personalizados', 'Servicio profesional', 'Opciones especiales']
    },
    {
      icon: Music,
      title: 'Entretenimiento',
      description: 'Música e Ambientación para darle a tus invitados toda una experiencia.',
      features: ['DJ', 'iluminación', 'Ambientación', 'Pista de baile']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-700/25 via-gray-700/30 to-stone-700/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ofrecemos servicios integrales para hacer de tu evento una experiencia perfecta
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-gray-600/40 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-rose-300 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-200 mb-4">{service.description}</p>
              <ul className="space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-rose-300 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}