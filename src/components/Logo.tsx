'use client'

import Image from 'next/image'

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
    <div className={`${sizes[size]} ${className} relative flex items-center justify-center`}>
      <Image
        src="/Logo2_blanco.svg"
        alt="Me Caso Contigo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}