# Configuración de Google Sheets API

Para que el formulario de reservas escriba en Google Sheets, necesitas configurar las credenciales de Google Cloud.

## Pasos de configuración

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente

### 2. Habilitar Google Sheets API

1. En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
2. Busca "Google Sheets API" y habilítala

### 3. Crear una cuenta de servicio

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Cuenta de servicio"
3. Completa el nombre y descripción
4. Haz clic en "Crear y continuar"
5. Otorga el rol "Editor" o "Viewer" (dependiendo de tus necesidades)
6. Haz clic en "Listo"

### 4. Generar clave JSON

1. En la lista de cuentas de servicio, haz clic en la cuenta que creaste
2. Ve a la pestaña "Claves"
3. Haz clic en "Agregar clave" > "Crear nueva clave"
4. Selecciona "JSON" y descarga el archivo

### 5. Compartir la hoja de cálculo

1. Abre tu Google Sheet
2. Haz clic en "Compartir"
3. Agrega el email de la cuenta de servicio (termina en @your-project.iam.gserviceaccount.com) como editor

### 6. Configurar variables de entorno

1. Copia `.env.example` a `.env.local`
2. Completa las variables:
   - `GOOGLE_SHEETS_CLIENT_EMAIL`: El email de la cuenta de servicio
   - `GOOGLE_SHEETS_PRIVATE_KEY`: La clave privada (incluyendo las comillas y \n)
   - `GOOGLE_SHEETS_SPREADSHEET_ID`: El ID de tu Google Sheet (de la URL)

### 7. Obtener el Spreadsheet ID

**IMPORTANTE**: El ID que necesitas NO es el de la URL de exportación CSV, sino el ID real de la hoja de cálculo.

1. Abre tu Google Sheet en el navegador
2. La URL se verá así: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
3. Copia la parte que está entre `/d/` y `/edit` (debe ser un string largo con letras y números)
4. **Ejemplo correcto**: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

**❌ NO uses**: El ID de la URL de exportación CSV (que contiene "2PACX-")

### 8. Verificar permisos de la cuenta de servicio

1. Abre tu Google Sheet
2. Haz clic en "Compartir"
3. Agrega el email de la cuenta de servicio como **Editor** (no solo como Viewer)
4. El email debe terminar en `@[tu-proyecto].iam.gserviceaccount.com`

## Estructura de la hoja de cálculo

Asegúrate de que tu hoja tenga las siguientes columnas en el orden correcto:

- A: id
- B: date
- C: clientName
- D: Novios
- E: eventType
- F: status
- G: cantidadInvitados
- H: observaciones

## Verificación

Después de configurar todo:

### 1. Probar la conexión
1. Reinicia el servidor de desarrollo: `npm run dev`
2. Visita: `http://localhost:3000/api/book-date`
3. Deberías ver una respuesta JSON confirmando la conexión exitosa

### 2. Probar el formulario
1. Ve a la página de agendar
2. Completa y envía el formulario
3. Los datos deberían aparecer en tu Google Sheet

## Solución de problemas

### Error 403 (Forbidden)
- Verifica que la cuenta de servicio tenga permisos de **Editor** en la hoja
- Asegúrate de que el email de la cuenta de servicio esté bien escrito

### Error 404 (Not Found)
- Verifica que el `SPREADSHEET_ID` sea correcto (el ID real de la URL `/edit`, no el de exportación)
- Asegúrate de que la hoja se llame "Sheet1" o ajusta el rango en el código

### Variables de entorno faltantes
- Verifica que `.env.local` esté en la raíz del proyecto
- Reinicia el servidor después de cambiar las variables

### Otros errores
- Revisa la consola del servidor para mensajes detallados
- Verifica que todas las APIs estén habilitadas en Google Cloud Console