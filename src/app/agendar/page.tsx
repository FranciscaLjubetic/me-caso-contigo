'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { format, addDays, isWeekend } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, Clock, User } from 'lucide-react'
import "react-datepicker/dist/react-datepicker.css"
import Button from '@/components/Button'

export default function AgendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    notes: ''
  })

  
  const modalidades = [
    { value: 'tradicional-liviana', label: 'Tradicional - Liviano' },
    { value: 'tradicional-equilibrada', label: 'Tradicional - Equilibrado' },
    { value: 'tradicional-peso-pesado', label: 'Tradicional - Peso Pesado' },
    { value: 'coctel-liviana', label: 'Cóctel - Liviano' },
    { value: 'coctel-equilibrada-mar', label: 'Cóctel - Equilibrado del Mar' },
    { value: 'coctel-peso-pesado', label: 'Cóctel - Peso Pesado' }
  ]

  // Configurar fechas disponibles (lunes a viernes, sin fines de semana)
  const isDateAvailable = (date: Date) => {
    return !isWeekend(date) && date >= new Date()
  }

  // Horarios disponibles
  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    // Aquí se enviaría la información al backend
    console.log('Cita agendada:', {
      date: selectedDate,
      time: selectedTime,
      ...formData
    })

    alert('¡Cita agendada exitosamente! Te contactaremos pronto para confirmar los detalles.')
    
    // Reset form
    setSelectedDate(null)
    setSelectedTime('')
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      notes: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Pídenos tu Cotización
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Déjanos tu contacto y los datos generales del evento y nos pondremos en contacto contigo a la brevedad.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Calendario */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center mr-8">
                <Calendar className="h-6 w-6 text-pink-500 mr-2" />
                Selecciona la fecha de tu evento
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  filterDate={isDateAvailable}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 90)}
                  locale={es}
                  inline
                  className="w-full"
                />
              </div>

              {selectedDate && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-pink-500 mr-2" />
                    Horarios disponibles
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
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
                    Formato del evento
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Selecciona tipo de Evento</option>
                    {modalidades.map((m) => (
                      <option key={m.value} value={m.value}>
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
                  disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          
        </div>
      </div>
    </div>
  )
}