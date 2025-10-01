import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

// Configuración de Google Sheets
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID!
const CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL!

// Procesar la clave privada para manejar diferentes formatos
let privateKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY!

// Remover comillas si las tiene
if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
  privateKey = privateKey.slice(1, -1)
}

// Convertir \n literales a saltos de línea reales
privateKey = privateKey.replace(/\\n/g, '\n')

const PRIVATE_KEY = privateKey

// Autenticación con Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

interface BookingData {
  id: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  eventType: string
  guests: string
  notes: string
}

// Endpoint GET para probar la conexión y obtener información de la hoja
export async function GET() {
  try {
    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      return NextResponse.json(
        {
          error: 'Configuración incompleta',
          hasSpreadsheetId: !!SPREADSHEET_ID,
          hasClientEmail: !!CLIENT_EMAIL,
          hasPrivateKey: !!PRIVATE_KEY
        },
        { status: 500 }
      )
    }

    // Obtener información de la hoja de cálculo
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    })

    console.log('Información de la hoja:', {
      title: spreadsheetInfo.data.properties?.title,
      sheets: spreadsheetInfo.data.sheets?.map(sheet => ({
        name: sheet.properties?.title,
        id: sheet.properties?.sheetId
      }))
    })

    // Intentar leer una celda para verificar permisos
    const firstSheetName = spreadsheetInfo.data.sheets?.[0]?.properties?.title || 'Sheet1'
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${firstSheetName}!A1:A1`,
    })

    return NextResponse.json({
      success: true,
      message: 'Conexión exitosa con Google Sheets',
      spreadsheetId: SPREADSHEET_ID,
      spreadsheetTitle: spreadsheetInfo.data.properties?.title,
      sheets: spreadsheetInfo.data.sheets?.map(sheet => sheet.properties?.title),
      firstSheetName: firstSheetName,
      clientEmail: CLIENT_EMAIL.substring(0, 30) + '...',
      data: response.data
    })

  } catch (error: unknown) {
    console.error('Error de conexión:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorCode = (error && typeof error === 'object' && 'code' in error) ? (error as { code: unknown }).code : 'UNKNOWN'
    return NextResponse.json(
      {
        error: 'Error de conexión',
        message: errorMessage,
        code: errorCode
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json()

    // Validar datos requeridos
    if (!body.date || !body.time || !body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Validar que las variables de entorno estén configuradas
    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      console.error('Variables de entorno faltantes:', {
        hasSpreadsheetId: !!SPREADSHEET_ID,
        hasClientEmail: !!CLIENT_EMAIL,
        hasPrivateKey: !!PRIVATE_KEY
      })
      return NextResponse.json(
        { error: 'Configuración de Google Sheets API incompleta' },
        { status: 500 }
      )
    }

    // Usar ID enviado desde el frontend (datetime exacto del submit)
    const id = body.id

    // Preparar fila para insertar
    const row = [
      id, // id
      body.date, // date
      body.name, // clientName
      `${body.name} & Pareja`, // Novios (placeholder)
      body.eventType, // eventType
      'cotizar', // status (nueva reserva siempre es 'cotizar')
      body.guests, // cantidadInvitados
      body.notes // observaciones
    ]

    console.log('Intentando escribir en hoja:', {
      spreadsheetId: SPREADSHEET_ID,
      row: row
    })

    // Obtener información de la hoja de cálculo para usar el nombre correcto
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    })

    const firstSheetName = spreadsheetInfo.data.sheets?.[0]?.properties?.title || 'fechas' // Usar 'fechas' como fallback
    const range = `${firstSheetName}!A:H`

    console.log('Usando rango:', range)

    // Agregar fila a la hoja de cálculo
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    })

    console.log('Respuesta de Google Sheets:', response.data)

    return NextResponse.json({
      success: true,
      message: 'Reserva creada exitosamente',
      id: id
    })

  } catch (error: unknown) {
    console.error('Error completo al crear reserva:', error)

    // Manejar errores específicos de Google Sheets
    const errorCode = (error && typeof error === 'object' && 'code' in error) ? (error as { code: unknown }).code : undefined
    if (errorCode === 403) {
      return NextResponse.json(
        { error: 'Permisos insuficientes. Verifica que la cuenta de servicio tenga acceso de edición a la hoja de cálculo.' },
        { status: 403 }
      )
    }

    if (errorCode === 404) {
      return NextResponse.json(
        { error: 'Hoja de cálculo no encontrada. Verifica el SPREADSHEET_ID.' },
        { status: 404 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Error interno del servidor: ${errorMessage}` },
      { status: 500 }
    )
  }
}