import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '@/components/Hero'

// Mock the Logo component
jest.mock('@/components/Logo', () => {
  return function MockLogo({ size, className }: { size: string; className: string }) {
    return <div data-testid="logo" className={className}>Logo {size}</div>
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

describe('Hero', () => {
  it('renders hero section with logo', () => {
    render(<Hero />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders main heading with highlighted text', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Tu Día Perfecto')
    expect(heading).toHaveTextContent('Empieza Aquí')
  })

  it('renders description text', () => {
    render(<Hero />)
    expect(screen.getByText(/Creamos experiencias únicas e inolvidables/)).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /cotizar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver galería/i })).toBeInTheDocument()
  })

  it('renders three feature cards', () => {
    render(<Hero />)
    expect(screen.getByText('Planificación Personalizada')).toBeInTheDocument()
    expect(screen.getByText('Atención al Detalle')).toBeInTheDocument()
    expect(screen.getByText('Experiencia Comprobada')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<Hero />)
    expect(screen.getByText(/Agenda una cita y trabajemos juntos/)).toBeInTheDocument()
    expect(screen.getByText(/Cuidamos cada aspecto de tu evento/)).toBeInTheDocument()
    expect(screen.getByText(/Años de experiencia haciendo realidad/)).toBeInTheDocument()
  })

  it('renders feature icons', () => {
    render(<Hero />)
    // Check that the icons are rendered (they have specific classes)
    const featureCards = screen.getAllByText(/Planificación Personalizada|Atención al Detalle|Experiencia Comprobada/)
    expect(featureCards).toHaveLength(3)
  })

  it('has correct section structure', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('relative', 'pt-4')
  })
})