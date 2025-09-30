'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, AlertTriangle } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import Button from '@/components/Button'
import Papa from 'papaparse'

// URL del CSV en Google Drive
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

export default function AgendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [bookedData, setBookedData] = useState<BookedDateCSV[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Efecto para recargar la página después de 10 segundos cuando hay éxito
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        window.location.reload()
      }, 10000) // 10 segundos

      return () => clearTimeout(timer)
    }
  }, [submitSuccess])

  // Función para cargar fechas ocupadas desde el CSV
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
    } catch (err) {
      console.error('Error loading CSV:', err)
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

  // Cargar fechas ocupadas desde el CSV al montar el componente
  useEffect(() => {
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

  
  const modalidades = [
    { value: 'matrimonio tradicional con coctel, cena y fiesta', label: 'matrimonio tradicional con coctel, cena y fiesta' },
    { value: 'matrimonio de coctel relajado con fiesta', label: 'matrimonio de coctel relajado con fiesta' },
    { value: 'matrimonio asado buffet mas fiesta', label: 'matrimonio asado buffet mas fiesta' },
    { value: 'evento corporativo', label: 'evento corporativo' },
    { value: 'otros', label: 'otros' },
  ]

  // Función para verificar si una fecha es seleccionable
  const isDateSelectable = (date: Date) => {
    // Solo fechas futuras
    if (date < new Date()) return false
    
    const dateInfo = getDateInfo(date)
    // Disponible si no está ocupada
    return dateInfo.status !== 'ocupada'
  }

  // Función para seleccionar una fecha
  const selectDate = (date: Date) => {
    if (isDateSelectable(date)) {
      setSelectedDate(date)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const bookingData = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        guests: formData.guests,
        notes: formData.notes
      }

      const response = await fetch('/api/book-date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al enviar la reserva')
      }

      await response.json()

      setSubmitSuccess(true)

      // Reset form
      setSelectedDate(null)
      setSelectedTime('')
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        guests: '',
        notes: ''
      })

      // Recargar datos del calendario para reflejar la nueva reserva
      loadBookedDates()

    } catch (error) {
      console.error('Error al enviar reserva:', error)
      setSubmitError('Ups! tuvimos un problema')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Asegura tu fecha
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Déjanos tu contacto y los datos generales del evento y nos pondremos en contacto contigo a la brevedad.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Calendario */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6 flex items-center mr-8">
                <Calendar className="h-6 w-6 text-pink-500 mr-2" />
                Selecciona la fecha de tu evento
              </h2>
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
                    const isSelected = selectedDate && isSameDay(day, selectedDate)
                    const isSelectable = isDateSelectable(day)

                    return (
                      <div
                        key={day.toString()}
                        className={`
                          p-2 text-center border rounded-lg cursor-pointer transition-colors
                          ${isTodayDate ? 'border-pink-500 bg-pink-50' : ''}
                          ${isSelected ? 'ring-2 ring-pink-500 bg-pink-100' : ''}
                          ${isSelectable ? (dateInfo.status !== 'available' ? getDateColor(dateInfo.status) : 'border-gray-200 hover:bg-gray-50') : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'}
                        `}
                        onClick={() => isSelectable && selectDate(day)}
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
                  <div className="flex items-center">
                    <div className="w-4 h-4 ring-2 ring-pink-500 bg-pink-100 rounded mr-2"></div>
                    Seleccionada
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-pink-500 mr-2" />
                    Horarios disponibles
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Formulario */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User className="h-6 w-6 text-pink-500 mr-2" />
                Tus datos
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de invitados
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Cantidad aproximada de invitados"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Formato del evento
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    style={{ fontSize: '0.5 rem' }} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Selecciona tipo de Evento</option>
                    {modalidades.map((m) => (
                      <option
                        key={m.value}
                        value={m.value}
                        className="text-sm"
                        
                      >
                        {m.label}
                      </option>
                    ))}
                    <option value="otro">Otro evento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Cuéntanos más detalles sobre tu evento..."
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-red-800 font-medium">Error al enviar la reserva</span>
                    </div>
                    <p className="text-red-700 mt-1">{submitError}</p>
                  </div>
                )}

                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-green-800 font-medium">¡Reserva enviada exitosamente!</span>
                    </div>
                    <p className="text-green-700 mt-1">Te contactaremos pronto para confirmar los detalles.</p>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-pink-800">Resumen de tu cita:</h4>
                    <p className="text-pink-700">
                      📅 {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                    <p className="text-pink-700">
                      ⏰ {selectedTime} hrs
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone || isSubmitting}
                  variant="solid"
                  size="lg"
                  className="w-full"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Información adicional del calendario */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
          {/* Próximos eventos */}
          <div className="lg:col-span-2">
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
                        {event.eventType}
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
          </div>

          {/* Estadísticas */}
          <div className="lg:col-span-2">
            <div className="gradient-bg rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">
                Estadísticas del Mes
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white">Fechas ocupadas</span>
                  <span className="font-semibold text-white">
                    {monthDays.filter(day => getDateInfo(day).status === 'ocupada').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Muy demandadas</span>
                  <span className="font-semibold text-white">
                    {monthDays.filter(day => getDateInfo(day).status === 'muy-demandada').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Cotizando</span>
                  <span className="font-semibold text-white">
                    {monthDays.filter(day => getDateInfo(day).status === 'cotizar').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Disponibles</span>
                  <span className="font-semibold text-white">
                    {monthDays.filter(day => getDateInfo(day).status === 'available').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}