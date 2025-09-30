'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#141414]/40 shadow-md sticky top-0 z-50 backdrop-blur-sm">
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
                className="text-white hover:text-gray-300 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="/galeria"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Galería
              </Link>
              <Button
                href="/agendar"
                variant="solid"
                size="sm"
              >
                Cotiza ya!
              </Button>
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
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-full text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-full text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/galeria"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-full text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Galería
              </Link>
              <Button
                href="/agendar"
                variant="solid"
                size="md"
                onClick={() => setIsOpen(false)}
                className="block text-center"
              >
                Contactános
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
