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
  eventType: 'tradicional_liviano' | 'tradicional_equilibrado' | 'tradicional_peso_pesado' | 'coctel_liviano' | 'coctel_del_mar' | 'coctel_peso_pesado' | 'otro'
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'bodas' | 'decoracion' | 'catering' | 'venues'
}

import type { LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  price: string
  image: string
}

export interface Package {
  name: string
  description: string
  price: string
  features: string[]
  popular?: boolean
  category?: 'tradicional' | 'coctel'
}