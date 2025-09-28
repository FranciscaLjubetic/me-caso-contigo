export interface ServicePackageOption {
  id: string
  name: string
  duration: string
  baseGuests: number
  priceCLPPerGuest: number
  details: Record<string, string>
}

export interface ServicePackageCategory {
  id: string
  title: string
  subtitle: string
  options: ServicePackageOption[]
}

export const SERVICE_PACKAGES: ServicePackageCategory[] = [
  {
    id: 'matrimonio-tradicional',
    title: 'Matrimonio tradicional',
    subtitle: 'Ceremonia + cóctel + cena + fiesta',
    options: [
      {
        id: 'tradicional-liviana',
        name: 'Opción Liviana',
        duration: '8 horas',
        baseGuests: 100,
        priceCLPPerGuest: 65000,
        details: {
          Recepción:
            'Líquidos sin alcohol, pisco sour, mango sour y ramazzotti para iniciar la celebración.',
          Ceremonia: '1 hora (opcional).',
          Cóctel: '45 minutos con 11 bocados.',
          Cena: 'Entrada, plato de fondo y barra de postres (2,5 por persona) + vino tinto.',
          Fiesta: 'Barra libre de bebidas, hielo, pisco, ron y vodka.',
          Trasnoche: 'Consomé reconfortante para cerrar la jornada.',
          'Ambientación y servicios':
            'Ambientación completa en ceremonia, cóctel, cena y pista de baile + DJ y música durante todo el evento.',
        },
      },
      {
        id: 'tradicional-equilibrada',
        name: 'Opción Equilibrada',
        duration: '10 horas',
        baseGuests: 100,
        priceCLPPerGuest: 75000,
        details: {
          Recepción:
            'Líquidos sin alcohol, pisco sour, mango sour, ramazzotti y cervezas.',
          Ceremonia: '1 hora (opcional).',
          Cóctel: '1 hora con 15 bocados.',
          Cena:
            'Entrada, plato de fondo, barra de postres (3,5 por persona) + vinos tinto y blanco.',
          Fiesta:
            'Barra libre con bebidas, hielo, pisco, ron, vodka y opciones energéticas.',
          Trasnoche: 'Consomé, mini churrascos y papas fritas.',
          'Ambientación y servicios':
            'Ambientación total en ceremonia, cóctel, cena y pista de baile + DJ y música durante todo el evento.',
        },
      },
      {
        id: 'tradicional-peso-pesado',
        name: 'Opción Peso-Pesado',
        duration: '10 horas',
        baseGuests: 100,
        priceCLPPerGuest: 85000,
        details: {
          Recepción:
            'Líquidos sin alcohol, pisco sour, mango sour, aperol, ramazzotti y cervezas.',
          Ceremonia: '1 hora (opcional).',
          Cóctel: '1 hora 30 minutos con 20 bocados.',
          Cena:
            'Entrada, plato de fondo, barra de postres (3,5 por persona), tortas personalizables (1 cada 25 invitados) + vinos tinto y blanco.',
          Fiesta:
            'Barra libre con bebidas, hielo, pisco, ron, vodka y opciones energéticas.',
          Trasnoche: 'Consomé, papas fritas y cordero al palo.',
          'Ambientación y servicios':
            'Ambientación total en ceremonia, cóctel, cena y pista de baile + DJ y música durante todo el evento.',
        },
      },
    ],
  },
  {
    id: 'matrimonio-coctel',
    title: 'Matrimonio cóctel',
    subtitle: 'Ceremonia + cóctel + fiesta',
    options: [
      {
        id: 'coctel-liviana',
        name: 'Opción Liviana',
        duration: '7 horas',
        baseGuests: 100,
        priceCLPPerGuest: 55000,
        details: {
          Recepción:
            'Líquidos sin alcohol, pisco sour, mango sour y ramazzotti.',
          Ceremonia: '1 hora (opcional).',
          Cóctel: '2 horas con 18 bocados.',
          Tablas:
            'Tabla XL de quesos, embutidos, frutos secos y frutas + vinos tintos seleccionados.',
          Fiesta: 'Barra libre de bebidas, hielo, pisco, ron y vodka.',
          Trasnoche: 'Consomé.',
          'Ambientación y servicios':
            'Ambientación total en ceremonia, cóctel y pista de baile + DJ y música durante todo el evento.',
        },
      },
      {
        id: 'coctel-equilibrada',
        name: 'Opción Equilibrada del Mar',
        duration: '7 horas',
        baseGuests: 100,
        priceCLPPerGuest: 63000,
        details: {
          Recepción:
            'Líquidos sin alcohol, pisco sour, mango sour, cervezas (0,5 por persona) y ramazzotti.',
          Ceremonia: '1 hora (opcional).',
          Cóctel: '2 horas con 18 bocados.',
          Tablas:
            'Tabla XL de quesos, embutidos, frutos secos y frutas + tabla de mariscos en hielo + vinos tinto y blanco.',
          Fiesta: 'Barra libre de bebidas, hielo, pisco, ron y vodka.',
          Trasnoche: 'Consomé y mini churrascos.',
          'Ambientación y servicios':
            'Ambientación total en ceremonia, cóctel y pista de baile + DJ y música durante todo el evento.',
        },
      },
      {
        id: 'coctel-peso-pesado',
        name: 'Opción Peso-Pesado',
        duration: '7 horas',
        baseGuests: 100,
        priceCLPPerGuest: 70000,
        details: {
          Recepción:
            'Líquidos sin alcohol, pisco sour, mango sour, aperol, ramazzotti y tina de cervezas.',
          Ceremonia: '1 hora (opcional).',
          Cóctel: '2 horas con 18 bocados.',
          Tablas:
            'Tabla XL de quesos, embutidos, frutos secos y frutas + tabla de mariscos en hielo + vinos tinto y blanco.',
          Fiesta: 'Barra libre de bebidas, hielo, pisco, ron y vodka.',
          Trasnoche:
            'Consomé, papas fritas y cordero al palo con tostadas y salsas.',
          'Ambientación y servicios':
            'Ambientación total en ceremonia, cóctel y pista de baile + DJ y música durante todo el evento.',
        },
      },
    ],
  },
]
