import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/app/page'

// Mock the components
jest.mock('@/components/Hero', () => {
  return function MockHero() {
    return <section data-testid="hero">Hero Component</section>
  }
})

jest.mock('@/components/Services', () => {
  return function MockServices() {
    return <section data-testid="services">Services Component</section>
  }
})

describe('Home Page', () => {
  it('renders main element', () => {
    render(<Home />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('renders Hero component', () => {
    render(<Home />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })

  it('renders Services component', () => {
    render(<Home />)
    expect(screen.getByTestId('services')).toBeInTheDocument()
  })

  it('renders components in correct order', () => {
    const { container } = render(<Home />)
    const main = container.querySelector('main')
    const children = main?.children
    expect(children?.[0]).toHaveAttribute('data-testid', 'hero')
    expect(children?.[1]).toHaveAttribute('data-testid', 'services')
  })
})