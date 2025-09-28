'use client'

import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { BookedDate } from '@/lib/types'
import Button from '@/components/Button'

// Datos de ejemplo de fechas ocupadas
const bookedDates: BookedDate[] = [
  {
    id: '1',
    date: new Date(2025, 9, 25), // 25 de octubre 2025
    clientName: 'María y Carlos',
    eventType: 'tradicional_equilibrado'
  },
  {
    id: '2',
    date: new Date(2025, 10, 8), // 8 de noviembre 2025
    clientName: 'Ana y Roberto',
    eventType: 'coctel_del_mar'
  },
  {
    id: '3',
    date: new Date(2025, 10, 15), // 15 de noviembre 2025
    clientName: 'Carmen y Diego',
    eventType: 'tradicional_peso_pesado'
  },
  {
    id: '4',
    date: new Date(2025, 10, 22), // 22 de noviembre 2025
    clientName: 'Patricia y Andrés',
    eventType: 'coctel_liviano'
  },
  {
    id: '5',
    date: new Date(2025, 11, 6), // 6 de diciembre 2025
    clientName: 'Laura y Miguel',
    eventType: 'tradicional_liviano'
  },
  {
    id: '6',
    date: new Date(2025, 11, 13), // 13 de diciembre 2025
    clientName: 'Valentina y Sebastián',
    eventType: 'coctel_peso_pesado'
  }
]

const eventTypeColors = {
  'tradicional_liviano': 'bg-pink-100 text-pink-800 border-pink-200',
  'tradicional_equilibrado': 'bg-pink-200 text-pink-900 border-pink-300',
  'tradicional_peso_pesado': 'bg-pink-300 text-pink-900 border-pink-400',
  'coctel_liviano': 'bg-purple-100 text-purple-800 border-purple-200',
  'coctel_del_mar': 'bg-purple-200 text-purple-900 border-purple-300',
  'coctel_peso_pesado': 'bg-purple-300 text-purple-900 border-purple-400',
  'otro': 'bg-gray-100 text-gray-800 border-gray-200'
}

const eventTypeLabels = {
  'tradicional_liviano': 'Tradicional Liviano',
  'tradicional_equilibrado': 'Tradicional Equilibrado',
  'tradicional_peso_pesado': 'Tradicional Peso Pesado',
  'coctel_liviano': 'Cóctel Liviano',
  'coctel_del_mar': 'Cóctel del Mar',
  'coctel_peso_pesado': 'Cóctel Peso Pesado',
  'otro': 'Otro evento'
}

export default function FechasDisponiblesPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Obtener primer y último día del mes actual
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Función para verificar si una fecha está ocupada
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate.date, date))
  }

  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
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
            Las fechas marcadas ya están reservadas.
          </p>
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
                  const isBooked = isDateBooked(day)
                  const isTodayDate = isToday(day)
                  
                  return (
                    <div
                      key={day.toString()}
                      className={`
                        p-2 text-center border rounded-lg cursor-pointer transition-colors
                        ${isTodayDate ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}
                        ${isBooked ? 'bg-red-100 border-red-300' : 'hover:bg-gray-50'}
                      `}
                    >
                      <div className="font-medium">{format(day, 'd')}</div>
                      {isBooked && (
                        <div className="text-xs text-red-600 mt-1">
                          Ocupado
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
                  <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded mr-2"></div>
                  Fecha disponible
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
                Próximos Eventos
              </h3>
              <div className="space-y-3">
                {bookedDates
                  .filter(event => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${eventTypeColors[event.eventType]}`}
                    >
                      <div className="font-medium">{event.clientName}</div>
                      <div className="text-sm opacity-75">
                        {eventTypeLabels[event.eventType]}
                      </div>
                      <div className="text-sm flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(event.date, "d 'de' MMM", { locale: es })}
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
                  <span className="text-gray-600">Eventos programados</span>
                  <span className="font-semibold">
                    {bookedDates.filter(event => 
                      event.date.getMonth() === currentDate.getMonth() &&
                      event.date.getFullYear() === currentDate.getFullYear()
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fechas disponibles</span>
                  <span className="font-semibold text-green-600">
                    {monthDays.length - bookedDates.filter(event => 
                      event.date.getMonth() === currentDate.getMonth() &&
                      event.date.getFullYear() === currentDate.getFullYear()
                    ).length}
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