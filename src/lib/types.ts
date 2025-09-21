export interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  date: Date
  time: string
  notes?: string
}

export interface BookedDate {
  id: string
  date: Date
  clientName: string
  eventType: 'boda' | 'quinceaños' | 'bautizo' | 'comunion' | 'otro'
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'bodas' | 'decoracion' | 'catering' | 'venues'
}