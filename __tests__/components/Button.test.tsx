import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '@/components/Button'

describe('Button', () => {
  it('renders button with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-pink-500', 'text-white')
  })

  it('renders link when href is provided', () => {
    render(<Button href="/test">Click me</Button>)
    const link = screen.getByRole('link', { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies outlined variant correctly', () => {
    render(<Button variant="outlined">Outlined Button</Button>)
    const button = screen.getByRole('button', { name: /outlined button/i })
    expect(button).toHaveClass('bg-transparent', 'border-pink-500')
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-sm')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-base')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-8', 'py-3', 'text-base')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading Button</Button>)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button', { name: /custom button/i })
    expect(button).toHaveClass('custom-class')
  })

  it('renders with correct button type', () => {
    render(<Button type="submit">Submit Button</Button>)
    const button = screen.getByRole('button', { name: /submit button/i })
    expect(button).toHaveAttribute('type', 'submit')
  })
})