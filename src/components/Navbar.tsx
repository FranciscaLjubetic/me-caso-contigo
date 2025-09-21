'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-slate-800/40 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-10 w-10" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="/galeria"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Galería
              </Link>
              <Link
                href="/fechas-disponibles"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Fechas Disponibles
              </Link>
              <Link
                href="/agendar"
                className="bg-rose-300 text-rose-900 hover:bg-rose-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Agendar Cita
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/40 border-t border-gray-600/50 backdrop-blur-sm">
              <Link
                href="/"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/galeria"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Galería
              </Link>
              <Link
                href="/fechas-disponibles"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Fechas Disponibles
              </Link>
              <Link
                href="/agendar"
                className="bg-rose-300 text-rose-900 hover:bg-rose-200 block px-3 py-2 rounded-md text-base font-medium text-center"
                onClick={() => setIsOpen(false)}
              >
                Agendar Cita
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
