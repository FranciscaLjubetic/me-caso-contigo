import { Package } from './types'

export const packages: Package[] = [
  // MATRIMONIO TRADICIONAL (ceremonia + coctel + cena + fiesta)
  {
    name: 'Matrimonio Tradicional - Liviano',
    description: 'Ceremonia, cóctel, cena y fiesta para 100 personas',
    price: '$65,000 (IVA incluido)',
    features: [
      'Recepción con líquidos sin alcohol + pisco sour, mango sour y ramazotti',
      'Ceremonia opcional (1 hora)',
      'Cóctel 45 minutos con 11 bocados',
      'Cena: entrada + plato de fondo + barra de postres (2.5 pp) + vino tinto',
      'Fiesta: barra libre (bebidas, hielo, pisco, ron, vodka)',
      'Trasnoche: consomé',
      'Ambientación completa para los 3 ambientes',
      'DJ y música para todo el evento',
      '8 horas totales de evento'
    ],
    category: 'tradicional'
  },
  {
    name: 'Matrimonio Tradicional - Equilibrado',
    description: 'La opción más completa y popular',
    price: '$75,000 (IVA incluido)',
    features: [
      'Recepción con líquidos + pisco sour, mango sour, ramazotti y cervezas',
      'Ceremonia opcional (1 hora)',
      'Cóctel 1 hora con 15 bocados',
      'Cena: entrada + plato de fondo + barra de postres (3.5 pp) + vino tinto y blanco',
      'Fiesta: barra libre (bebidas, hielo, pisco, ron, vodka, energética)',
      'Trasnoche: consomé + mini churrascos + papas fritas',
      'Ambientación completa para los 3 ambientes',
      'DJ y música para todo el evento',
      '10 horas de evento'
    ],
    popular: true,
    category: 'tradicional'
  },
  {
    name: 'Matrimonio Tradicional - Peso Pesado',
    description: 'Experiencia premium completa',
    price: '$85,000 (IVA incluido)',
    features: [
      'Recepción con líquidos + pisco sour, mango sour, aperol, ramazotti y cervezas',
      'Ceremonia opcional (1 hora)',
      'Cóctel 1:30 horas con 20 bocados',
      'Cena: entrada + plato de fondo + barra de postres (3.5 pp) + tortas personalizables (1 c/25 pp) + vino tinto y blanco',
      'Fiesta: barra libre (bebidas, hielo, pisco, ron, vodka, energética)',
      'Trasnoche: consomé + papas fritas + cordero al palo',
      'Ambientación completa para los 3 ambientes',
      'DJ y música para todo el evento',
      '10 horas totales de evento'
    ],
    category: 'tradicional'
  },
  
  // MATRIMONIO CÓCTEL (ceremonia + coctel + fiesta)
  {
    name: 'Matrimonio Cóctel - Liviano',
    description: 'Ceremonia, cóctel y fiesta para 100 personas',
    price: '$55,000 (IVA incluido)',
    features: [
      'Recepción con líquidos sin alcohol + pisco sour, mango sour y ramazotti',
      'Ceremonia opcional (1 hora)',
      'Cóctel 2 horas con 18 bocados',
      'Tabla de quesos, embutidos, frutos secos y fruta XL + vino tinto',
      'Barra de postres de 3 postres pp',
      'Fiesta: barra libre (bebidas, hielo, pisco, ron, vodka)',
      'Trasnoche: consomé',
      'Ambientación completa para los 3 ambientes',
      'DJ y música para todo el evento',
      '7 horas totales de evento'
    ],
    category: 'coctel'
  },
  {
    name: 'Matrimonio Cóctel - Equilibrado del Mar',
    description: 'Con especialidades marinas',
    price: '$63,000 (IVA incluido)',
    features: [
      'Recepción con líquidos + pisco sour, mango sour, cervezas (0.5 pp) y ramazotti',
      'Ceremonia opcional (1 hora)',
      'Cóctel 2 horas con 18 bocados',
      'Tabla de quesos, embutidos, frutos secos y fruta XL + vino tinto',
      'Tabla de mariscos en hielo XL + limón + vino blanco',
      'Barra de postres de 3 postres pp + 1 torta personalizable cada 33 pp',
      'Fiesta: barra libre (bebidas, hielo, pisco, ron, vodka)',
      'Trasnoche: consomé + mini churrascos',
      'Ambientación completa para los 3 ambientes',
      'DJ y música para todo el evento',
      '7 horas totales de evento'
    ],
    category: 'coctel'
  },
  {
    name: 'Matrimonio Cóctel - Peso Pesado',
    description: 'La experiencia cóctel más completa',
    price: '$70,000 (IVA incluido)',
    features: [
      'Recepción con líquidos + pisco sour, mango sour, aperol y ramazotti + tina de cervezas',
      'Ceremonia opcional (1 hora)',
      'Cóctel 2 horas con 18 bocados',
      'Tabla de quesos, embutidos, frutos secos y fruta XL + vino tinto',
      'Tabla de mariscos en hielo XL + limón + vino blanco',
      'Barra de postres de 3 postres pp + 1 torta personalizable cada 33 pp',
      'Fiesta: barra libre (bebidas, hielo, pisco, ron, vodka)',
      'Trasnoche: consomé + papas fritas + cordero al palo con tostadas y salsas',
      'Ambientación completa para los 3 ambientes',
      'DJ y música para todo el evento',
      '7 horas totales de evento'
    ],
    category: 'coctel'
  }
]