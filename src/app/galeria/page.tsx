'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryImage } from '@/lib/types'

// Datos de ejemplo para la galería (en producción vendrían de una API)
const galleryImages: GalleryImage[] = [
  // Bodas
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Ceremonia de boda elegante',
    category: 'bodas'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    alt: 'Mesa de boda decorada',
    category: 'bodas'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    alt: 'Pareja de novios',
    category: 'bodas'
  },
  
  // Decoración
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
    alt: 'Decoración floral elegante',
    category: 'decoracion'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    alt: 'Centro de mesa con velas',
    category: 'decoracion'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    alt: 'Arreglo floral para evento',
    category: 'decoracion'
  },
  
  // Catering
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Mesa de catering gourmet',
    category: 'catering'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1516865131505-4dabf2efc692?w=800&q=80',
    alt: 'Platos de alta cocina',
    category: 'catering'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    alt: 'Mesa de dulces para evento',
    category: 'catering'
  },
  
  // Venues
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    alt: 'Salón de eventos elegante',
    category: 'venues'
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
    alt: 'Jardín para ceremonia',
    category: 'venues'
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80',
    alt: 'Terraza con vista panorámica',
    category: 'venues'
  },
  
  // Fotos reales de eventos
  {
    id: '13',
    src: '/Bodas de Oro 23 12 2017-107.jpg',
    alt: 'Boda de Oro elegante',
    category: 'bodas'
  },
  {
    id: '14',
    src: '/20161001_130315_edited.jpg',
    alt: 'Celebración de matrimonio',
    category: 'bodas'
  },
  {
    id: '15',
    src: '/20180310_190425.jpg',
    alt: 'Mesa de boda decorada',
    category: 'decoracion'
  },
  {
    id: '16',
    src: '/53723621_162714281312773_6833258771406389248_n.jpg',
    alt: 'Decoración floral para evento',
    category: 'decoracion'
  },
  {
    id: '17',
    src: '/IMG_20190303_115626 (1).jpg',
    alt: 'Setup de evento',
    category: 'venues'
  },
  {
    id: '18',
    src: '/IMG_20190303_115626.jpg',
    alt: 'Preparación de salón',
    category: 'venues'
  },
  {
    id: '19',
    src: '/IMG_20190303_115745.jpg',
    alt: 'Decoración de mesa',
    category: 'decoracion'
  },
  {
    id: '20',
    src: '/IMG_20190303_120526.jpg',
    alt: 'Arreglo floral central',
    category: 'decoracion'
  },
  {
    id: '21',
    src: '/IMG_20190303_140245.jpg',
    alt: 'Mesa de catering',
    category: 'catering'
  },
  {
    id: '22',
    src: '/IMG-20181014-WA0000.jpg',
    alt: 'Evento corporativo',
    category: 'venues'
  },
  {
    id: '23',
    src: '/IMG-20190209-WA0011.jpg',
    alt: 'Decoración de boda',
    category: 'bodas'
  },
  {
    id: '24',
    src: '/IMG-20190209-WA0014.jpg',
    alt: 'Mesa nupcial decorada',
    category: 'bodas'
  },
  {
    id: '25',
    src: '/t30_82071 (1).jpg',
    alt: 'Celebración especial',
    category: 'bodas'
  },
  {
    id: '26',
    src: '/WhatsApp Image 2018-07-22 at 15.43.30 (2).jpeg',
    alt: 'Evento de verano',
    category: 'venues'
  },
  {
    id: '27',
    src: '/WhatsApp Image 2018-11-11 at 12.34.19 (1).jpeg',
    alt: 'Decoración otoñal',
    category: 'decoracion'
  },
  {
    id: '28',
    src: '/WhatsApp Image 2018-11-11 at 12.34.19.jpeg',
    alt: 'Setup de mesa elegante',
    category: 'decoracion'
  },
  {
    id: '29',
    src: '/WhatsApp Image 2019-01-27 at 13.50.19.jpeg',
    alt: 'Evento de enero',
    category: 'venues'
  },
  {
    id: '30',
    src: '/WhatsApp Image 2019-01-27 at 13.51.51.jpeg',
    alt: 'Decoración de temporada',
    category: 'decoracion'
  },
  {
    id: '31',
    src: '/WhatsApp Image 2019-03-17 at 19.23.44.jpeg',
    alt: 'Celebración nocturna',
    category: 'bodas'
  },
  {
    id: '32',
    src: '/0B6kGPIBZlePHRWJPQ3RPbmlxZDQ.jpeg',
    alt: 'Evento especial',
    category: 'venues'
  },
  {
    id: '33',
    src: '/club_suizo_07_07_2015.webp',
    alt: 'Evento en Club Suizo',
    category: 'venues'
  },
  {
    id: '34',
    src: '/club_suizo_tati_17_07_2017.webp',
    alt: 'Celebración Club Suizo 2017',
    category: 'bodas'
  },
  {
    id: '35',
    src: '/club_suizo_tati_17_07_2017_2.webp',
    alt: 'Decoración Club Suizo',
    category: 'decoracion'
  },
  {
    id: '36',
    src: '/club_suizo_yasutaro_11_02_2018.webp',
    alt: 'Evento Yasutaro 2018',
    category: 'bodas'
  },
  {
    id: '37',
    src: '/altar.png',
    alt: 'Decoración de altar',
    category: 'decoracion'
  },
  {
    id: '38',
    src: '/coctel.png',
    alt: 'Mesa de cóctel',
    category: 'catering'
  },
  {
    id: '39',
    src: '/codegua.png',
    alt: 'Evento en Codegua',
    category: 'venues'
  }
]

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'bodas', label: 'Bodas' },
  { key: 'decoracion', label: 'Decoración' },
  { key: 'catering', label: 'Catering' },
  { key: 'venues', label: 'Espacios' }
]

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Filtrar imágenes según la categoría seleccionada
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  // Abrir modal de imagen
  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id))
  }

  // Cerrar modal
  const closeModal = () => {
    setSelectedImage(null)
  }

  // Navegar entre imágenes en el modal
  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      const prevImage = filteredImages[currentImageIndex - 1]
      setSelectedImage(prevImage)
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      const nextImage = filteredImages[currentImageIndex + 1]
      setSelectedImage(nextImage)
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Galería de Eventos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre algunos de nuestros eventos más destacados. Cada imagen cuenta la historia 
            de momentos únicos e inolvidables que hemos tenido el honor de crear.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => openImageModal(image)}
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay imágenes */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay imágenes en esta categoría todavía.
            </p>
          </div>
        )}

        {/* Modal para imagen ampliada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Botón anterior */}
              {currentImageIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="h-12 w-12" />
                </button>
              )}

              {/* Botón siguiente */}
              {currentImageIndex < filteredImages.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronRight className="h-12 w-12" />
                </button>
              )}

              {/* Imagen */}
              <div className="relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={600}
                  className="max-w-full max-h-screen object-contain"
                />
                
                {/* Información de la imagen */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {selectedImage.alt}
                  </h3>
                  <p className="text-gray-300">
                    {currentImageIndex + 1} de {filteredImages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA al final */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Te inspiraste?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cada evento es único y especial. Conversemos sobre cómo podemos hacer realidad 
            la celebración de tus sueños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/agendar"
              className="bg-pink-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              Agendar Consulta
            </a>
            <a
              href="/fechas-disponibles"
              className="border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-500 hover:text-white transition-colors"
            >
              Ver Fechas Disponibles
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}