import { Heart, Users, Utensils } from 'lucide-react'
import { Service } from './types'

export const services: Service[] = [
  {
    icon: Heart,
    title: 'Matrimonio Tradicional',
    description: 'La experiencia completa de matrimonio con ceremonia, cóctel, cena y fiesta. Todo lo que necesitas para tu día soñado.',
    features: [
      'Ceremonia opcional (1 hora)',
      'Cóctel con bocados variados (45 min - 1:30 hrs)',
      'Cena completa: entrada + plato de fondo + postres',
      'Fiesta con barra libre completa',
      'Trasnoche incluido',
      'Ambientación completa para todos los ambientes',
      'DJ y música para todo el evento',
      'Duración: 8-10 horas'
    ],
    price: 'Desde $65,000 (100 personas)',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80'
  },
  {
    icon: Users,
    title: 'Matrimonio Cóctel',
    description: 'Una celebración más relajada e íntima con ceremonia, cóctel extenso y fiesta. Perfecto para eventos más casuales.',
    features: [
      'Ceremonia opcional (1 hora)',
      'Cóctel extenso de 2 horas con 18 bocados',
      'Tablas gourmet: quesos, embutidos, frutos secos',
      'Opción de tabla de mariscos',
      'Barra de postres y tortas personalizables',
      'Fiesta con barra libre',
      'Trasnoche incluido',
      'Ambientación completa',
      'DJ y música - Duración: 7 horas'
    ],
    price: 'Desde $55,000 (100 personas)',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80'
  },
  {
    icon: Utensils,
    title: 'Servicios Gastronómicos',
    description: 'Experiencias culinarias excepcionales que incluyen desde barra libre premium hasta cordero al palo y especialidades marinas.',
    features: [
      'Barra libre completa (pisco, ron, vodka, energética)',
      'Bebidas especiales: pisco sour, mango sour, aperol, ramazotti',
      'Opciones de cervezas incluidas',
      'Cordero al palo con tostadas y salsas',
      'Tabla de mariscos en hielo',
      'Mini churrascos y acompañamientos',
      'Consomé de trasnoche',
      'Tortas personalizables'
    ],
    price: 'Incluido en todos los paquetes',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
  }
]