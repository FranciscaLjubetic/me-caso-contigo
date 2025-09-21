# Me Caso Contigo - Sitio Web de Eventos

Un sitio web moderno y elegante para la organización de bodas, quinceaños y eventos especiales.

## Características Principales

- 🏠 **Landing Page Atractiva**: Hero section con servicios destacados
- 📅 **Agendador de Citas**: Sistema interactivo para agendar consultas
- 📊 **Calendario de Fechas**: Visualización de fechas disponibles y ocupadas
- 🖼️ **Galería de Imágenes**: Showcase de eventos anteriores con filtros
- 📱 **WhatsApp Integration**: Botón flotante para contacto directo
- 🎨 **Diseño Responsive**: Optimizado para móviles y desktop

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **React DatePicker** - Componente de calendario
- **Lucide React** - Iconos modernos
- **Date-fns** - Manipulación de fechas

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd me-caso-contigo-landing
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Ir a [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── app/                     # App Router de Next.js
│   ├── agendar/            # Página de agendamiento
│   ├── fechas-disponibles/ # Calendario de fechas
│   ├── galeria/            # Galería de imágenes
│   ├── servicios/          # Página de servicios
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── components/             # Componentes reutilizables
│   ├── Hero.tsx           # Hero section
│   ├── Navbar.tsx         # Navegación
│   ├── Services.tsx       # Sección de servicios
│   └── WhatsAppButton.tsx # Botón de WhatsApp
└── lib/                   # Utilidades y tipos
    ├── types.ts           # Interfaces TypeScript
    └── utils.ts           # Funciones utilitarias
```

## Funcionalidades Principales

### 1. Agendador de Citas (/agendar)
- Calendario interactivo para seleccionar fechas
- Formulario de contacto con validación
- Horarios disponibles
- Resumen de la cita antes de confirmar

### 2. Fechas Disponibles (/fechas-disponibles)
- Calendario mensual con fechas ocupadas
- Lista de próximos eventos
- Navegación entre meses
- Estadísticas del mes

### 3. Galería (/galeria)
- Filtros por categoría (bodas, decoración, catering, venues)
- Modal para ver imágenes ampliadas
- Navegación entre imágenes
- Diseño tipo grid responsive

### 4. Servicios (/servicios)
- Detalle completo de servicios
- Paquetes con precios
- Características destacadas
- Call-to-action integrados

## Personalización

### Cambiar Número de WhatsApp
Editar el archivo `src/components/WhatsAppButton.tsx`:
```typescript
const phoneNumber = 'TU_NUMERO_AQUI' // Formato: 5491234567890
```

### Modificar Fechas Ocupadas
Editar el archivo `src/app/fechas-disponibles/page.tsx`:
```typescript
const bookedDates: BookedDate[] = [
  // Agregar tus fechas ocupadas aquí
]
```

### Actualizar Galería
Las imágenes actuales usan Unsplash. Para usar tus propias imágenes:
1. Subir imágenes a `public/images/`
2. Actualizar el array `galleryImages` en `src/app/galeria/page.tsx`

## Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linter ESLint
```

## Próximas Mejoras

- [ ] Integración con base de datos
- [ ] Sistema de autenticación para admin
- [ ] Backend API para manejar citas
- [ ] Integración con sistemas de pago
- [ ] Panel de administración
- [ ] Notificaciones por email
- [ ] Optimización SEO avanzada

## Contacto

Para soporte o consultas sobre el proyecto, contactar a través de WhatsApp o email.

---

**Me Caso Contigo** - Haciendo realidad los eventos de tus sueños ✨
