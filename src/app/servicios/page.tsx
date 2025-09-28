"use client"

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Heart, Users, Calendar, Star } from 'lucide-react'
import { services } from '@/lib/services-data'
import { SERVICE_PACKAGES } from '@/lib/service-packages'
import Button from '@/components/Button'

export default function ServiciosPage() {

  const [activePriceId, setActivePriceId] = useState<string | null>(null)

  const UF_REFERENCE_VALUE = 37000

  const detailKeysByCategory = useMemo(() => {
    return SERVICE_PACKAGES.reduce<Record<string, string[]>>((acc, category) => {
      const uniqueKeys = new Set<string>()
      category.options.forEach((option) => {
        Object.keys(option.details).forEach((key) => uniqueKeys.add(key))
      })
      acc[category.id] = Array.from(uniqueKeys)
      return acc
    }, {})
  }, [])

  const togglePrice = (id: string) => {
    setActivePriceId((current) => (current === id ? null : id))
  }

  const getPriceInUF = (priceCLPPerGuest: number, guests: number) => {
    const totalCLP = priceCLPPerGuest * guests
    return totalCLP / UF_REFERENCE_VALUE
  }

  const formatUF = (value: number) =>
    value.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Comparador de paquetes</h2>
            <p className="text-lg text-gray-600">
              Selecciona cada alternativa para conocer su inversión estimada en UF (referencia {UF_REFERENCE_VALUE.toLocaleString('es-CL')} CLP por UF) para {SERVICE_PACKAGES[0].options[0].baseGuests} invitados.
            </p>
          </div>

          <div className="space-y-12">
            {SERVICE_PACKAGES.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-100 overflow-hidden"
              >
                <div className="px-6 py-5 bg-pink-100/70">
                  <h3 className="text-2xl font-semibold text-gray-800">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.subtitle}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                          Detalle
                        </th>
                        {category.options.map((option) => (
                          <th
                            key={option.id}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                          >
                            <div className="flex flex-col gap-1">
                              <span className="text-base font-semibold text-gray-800">{option.name}</span>
                              <span className="text-xs text-gray-500">
                                {option.duration} · Base {option.baseGuests} personas
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {detailKeysByCategory[category.id].map((detailKey) => (
                        <tr key={detailKey} className="align-top">
                          <th className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                            {detailKey}
                          </th>
                          {category.options.map((option) => (
                            <td
                              key={`${option.id}-${detailKey}`}
                              className="px-4 py-3 text-sm text-gray-600"
                            >
                              {option.details[detailKey] ?? '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <th className="bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700">
                          Precio estimado
                        </th>
                        {category.options.map((option) => {
                          const isActive = activePriceId === option.id
                          const priceInUF = getPriceInUF(option.priceCLPPerGuest, option.baseGuests)

                          return (
                            <td key={`${option.id}-price`} className="px-4 py-4 text-sm">
                              <button
                                type="button"
                                onClick={() => togglePrice(option.id)}
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                                  isActive
                                    ? 'border-pink-600 bg-pink-600 text-white'
                                    : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                                }`}
                              >
                                {isActive ? 'Ocultar precio' : 'Mostrar precio'}
                              </button>
                              {isActive && (
                                <div className="mt-3 space-y-1">
                                  <p className="text-lg font-semibold text-pink-600">
                                    {formatUF(priceInUF)} UF
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Referencial para {option.baseGuests} invitados. Ajustable según asistentes y valor UF vigente.
                                  </p>
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-500 text-center">
            Los valores son estimaciones iniciales y pueden variar según requerimientos específicos o cambios en la UF.
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
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={index < 2}
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