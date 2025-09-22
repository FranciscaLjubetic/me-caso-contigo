'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryImage } from '@/lib/types'
import { galleryImages } from '@/lib/gallery-data'
import Button from '@/components/Button'

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'bodas', label: 'Bodas' },
  { key: 'decoracion', label: 'Decoración' },
  { key: 'catering', label: 'Catering' }
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
            <Button
              href="/agendar"
              variant="primary"
              size="lg"
            >
              Cotiza Ya!
            </Button>
            <Button
              href="/fechas-disponibles"
              variant="secondary"
              size="lg"
            >
              Ver Fechas Disponibles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}