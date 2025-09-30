'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, AlertTriangle } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import Papa from 'papaparse'
import Button from '@/components/Button'

// URL del CSV en Google Drive (reemplaza con tu URL real)
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMjQjIlj8I1-43wCIOC5u46bhNv2zww_mnbq05GqKl9s0Ia8o_zeVgOClOAx9YR5fHQTkUJ_iHJroM/pub?output=csv'

// Interfaz para los datos del CSV
interface BookedDateCSV {
  id?: string
  date: string
  clientName: string
  Novios: string
  eventType: string
  status: 'ocupada' | 'cotizar'
  cantidadInvitados?: string
  observaciones?: string
}

// Estados de las fechas
type DateStatus = 'available' | 'cotizar' | 'muy-demandada' | 'ocupada'

interface DateInfo {
  status: DateStatus
  bookings: BookedDateCSV[]
}

const eventTypeLabels = {
  'matrimonio tradicional con coctel, cena y fiesta': 'Matrimonio Tradicional',
  'matrimonio de coctel relajado con fiesta': 'Cóctel Relajado',
  'matrimonio asado buffet mas fiesta': 'Asado Buffet',
  'evento corporativo': 'Evento Corporativo',
  'otros': 'Otro evento'
}

export default function FechasDisponiblesPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [bookedData, setBookedData] = useState<BookedDateCSV[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos del CSV
  useEffect(() => {
    const loadBookedDates = async () => {
      try {
        const response = await fetch(CSV_URL)
        if (!response.ok) {
          throw new Error('Error al cargar las fechas')
        }

        const csvText = await response.text()
        const parsed = Papa.parse<BookedDateCSV>(csvText, {
          header: true,
          skipEmptyLines: true
        })

        setBookedData(parsed.data)
        setLoading(false)
      } catch (err) {
        console.error('Error loading CSV:', err)
        setError('Error al cargar las fechas. Mostrando datos de ejemplo.')
        setLoading(false)
        // Fallback a datos de ejemplo si el CSV falla
        setBookedData([
          {
            id: '1',
            date: '2025-10-04',
            clientName: 'Sofia Marengo',
            Novios: 'Sofia & Mateo',
            eventType: 'matrimonio tradicional con coctel, cena y fiesta',
            status: 'ocupada',
            cantidadInvitados: '',
            observaciones: 'peso pesado, ceremonia, santa luz de lumaco'
          },
          {
            id: '2',
            date: '2025-10-10',
            clientName: 'Santiago Gaymer',
            Novios: 'Isabella & Santiago',
            eventType: 'matrimonio de coctel relajado con fiesta',
            status: 'ocupada',
            cantidadInvitados: '',
            observaciones: 'equilibrado, sin ceremonia, gay domicilio'
          }
        ])
      }
    }

    loadBookedDates()
  }, [])

  // Obtener primer y último día del mes actual
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Función para obtener información de una fecha
  const getDateInfo = (date: Date): DateInfo => {
    const dateString = format(date, 'yyyy-MM-dd')
    const bookingsForDate = bookedData.filter(booking => booking.date === dateString)

    if (bookingsForDate.length === 0) {
      return { status: 'available', bookings: [] }
    }

    const hasOccupied = bookingsForDate.some(booking => booking.status === 'ocupada')
    const cotizarCount = bookingsForDate.filter(booking => booking.status === 'cotizar').length

    if (hasOccupied) {
      return { status: 'ocupada', bookings: bookingsForDate }
    }

    if (cotizarCount > 1) {
      return { status: 'muy-demandada', bookings: bookingsForDate }
    }

    return { status: 'cotizar', bookings: bookingsForDate }
  }

  // Función para obtener el color de una fecha
  const getDateColor = (status: DateStatus) => {
    switch (status) {
      case 'ocupada':
        return 'bg-red-100 border-red-300 text-red-800'
      case 'muy-demandada':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'cotizar':
        return 'bg-green-100 border-green-300 text-green-800'
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-50'
    }
  }

  // Función para obtener el texto de estado
  const getStatusText = (status: DateStatus) => {
    switch (status) {
      case 'ocupada':
        return 'Ocupada'
      case 'muy-demandada':
        return 'Muy demandada'
      case 'cotizar':
        return 'Cotizando'
      default:
        return ''
    }
  }

  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando calendario...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fechas Disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consulta nuestro calendario para ver las fechas disponibles para tu evento.
            Las fechas marcadas tienen diferentes estados según la demanda.
          </p>
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-yellow-800">{error}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Header del calendario */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ←
                </button>
                <h2 className="text-2xl font-semibold">
                  {format(currentDate, 'MMMM yyyy', { locale: es })}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  →
                </button>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {/* Espacios vacíos para el inicio del mes */}
                {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                  <div key={index} className="p-2"></div>
                ))}

                {/* Días del mes */}
                {monthDays.map((day) => {
                  const dateInfo = getDateInfo(day)
                  const isTodayDate = isToday(day)

                  return (
                    <div
                      key={day.toString()}
                      className={`
                        p-2 text-center border rounded-lg cursor-pointer transition-colors
                        ${isTodayDate ? 'border-pink-500 bg-pink-50' : ''}
                        ${dateInfo.status !== 'available' ? getDateColor(dateInfo.status) : 'border-gray-200 hover:bg-gray-50'}
                      `}
                    >
                      <div className="font-medium">{format(day, 'd')}</div>
                      {dateInfo.status !== 'available' && (
                        <div className="text-xs mt-1">
                          {getStatusText(dateInfo.status)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Leyenda */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
                  Fecha ocupada
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
                  Muy demandada
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
                  Cotizando
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded mr-2"></div>
                  Disponible
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-pink-50 border border-pink-500 rounded mr-2"></div>
                  Hoy
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral con próximos eventos */}
          <div className="space-y-6">
            {/* Próximos eventos */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                Estado de Fechas
              </h3>
              <div className="space-y-3">
                {bookedData
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 8)
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${
                        event.status === 'ocupada'
                          ? 'bg-red-50 border-red-200'
                          : event.status === 'cotizar'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="font-medium">{event.Novios || event.clientName}</div>
                      <div className="text-sm opacity-75">
                        {eventTypeLabels[event.eventType as keyof typeof eventTypeLabels] || event.eventType}
                      </div>
                      <div className="text-sm flex items-center justify-between mt-1">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(new Date(event.date), "d 'de' MMM", { locale: es })}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          event.status === 'ocupada'
                            ? 'bg-red-200 text-red-800'
                            : event.status === 'cotizar'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="gradient-bg rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">
                ¿Encontraste tu fecha ideal?
              </h3>
              <p className="mb-4 opacity-90">
                Contacta con nosotros y asegura tu fecha especial.
              </p>
              <Button
                href="/agendar"
                variant="outlined"
                size="sm"
              >
                Cotiza ya!
              </Button>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Estadísticas del Mes
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fechas ocupadas</span>
                  <span className="font-semibold text-red-600">
                    {monthDays.filter(day => getDateInfo(day).status === 'ocupada').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Muy demandadas</span>
                  <span className="font-semibold text-yellow-600">
                    {monthDays.filter(day => getDateInfo(day).status === 'muy-demandada').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cotizando</span>
                  <span className="font-semibold text-green-600">
                    {monthDays.filter(day => getDateInfo(day).status === 'cotizar').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Disponibles</span>
                  <span className="font-semibold text-blue-600">
                    {monthDays.filter(day => getDateInfo(day).status === 'available').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}