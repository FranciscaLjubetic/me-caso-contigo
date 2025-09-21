'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14', 
    lg: 'w-40 h-40',
    xl: 'w-72 h-72'
  }

  return (
    <div className={`${sizes[size]} ${className} flex items-center justify-center`}>
      <img src="/Logo2_blanco.svg" alt="" />
    </div>
  )
}