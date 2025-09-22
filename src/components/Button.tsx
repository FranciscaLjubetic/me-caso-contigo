import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  isLoading = false
}) => {
  // Clases base para todos los botones
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  // Variantes de color
  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 focus:ring-pink-500',
    secondary: 'bg-gradient-to-r from-pink-300 to-purple-300 text-gray-700 hover:from-pink-300 hover:to-purple-300 focus:ring-pink-300'
  }
  
  // Tamaños
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-base'
  }
  
  // Combinar todas las clases
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  // Contenido del botón con estado de loading
  const buttonContent = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {isLoading ? 'Cargando...' : children}
    </>
  )
  
  // Si tiene href, renderizar como Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    )
  }
  
  // Renderizar como button normal
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {buttonContent}
    </button>
  )
}

export default Button