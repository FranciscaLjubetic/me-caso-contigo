import { Heart, Users, Utensils } from 'lucide-react'
import { Service } from './types'

export const services: Service[] = [
  {
    icon: Heart,
    title: 'Matrimonio Tradicional',
    description: 'La experiencia completa de matrimonio con ceremonia, cóctel, cena y fiesta. Todo lo que necesitas para tu día soñado.',
    features: [
      'Ambientación de ceremonia',
      'Cóctel',
      'Cena completa: entrada + plato de fondo + barra de postres',
      'Fiesta con barra libre completa',
      'Servicio de Trasnoche',
      'Ambientación completa',
      'DJ y música para todo el evento',
    ],
    price: 'Desde $1,7 UFs por persona (100 personas)',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80'
  },
  {
    icon: Users,
    title: 'Matrimonio Cóctel',
    description: 'Una celebración más relajada e íntima con ceremonia, cóctel extenso y fiesta. Perfecto para eventos más casuales.',
    features: [
      'Ambientación de ceremonia',
      'Cóctel',
      'Tablas-puerta gourmet: quesos, embutidos, frutos secos',
      'Opción de tabla de mariscos',
      'Fiesta con barra libre completa',
      'Servicio de Trasnoche',
      'Ambientación completa',
      'DJ y música para todo el evento',
    ],
    price: 'Desde $1,4 UFs por persona (100 personas)',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80'
  },
  {
    icon: Utensils,
    title: 'Servicios Gastronómicos',
    description: 'Experiencias culinarias excepcionales.',
    features: [
      'Barra completa y cocktails preparados (pisco, ron, vodka, gin, ramazotti, pisco sour, mango sour, cervezas, vinos, espumantes)',
      'Barra de exquisitos postres preparados con ingredientes de calidad y opciones especiales, sin azucar, celíacos, etc.',
      'Cordero al palo',
      'Asado buffet con opciones gourmet',
      'Tablas de queso, encurtidos y frutos secos en formato puerta',
      'Tabla de mariscos en hielo',
      'Tortas personalizables',
      'Bollería, chocolatería y galletas finas',
      'Café y té de especialidad',
      'Menús personalizados según tus gustos y necesidades',
    ],
    price: '',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
  }
]