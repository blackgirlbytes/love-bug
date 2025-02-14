import React from 'react'

export function Button({ className, variant = 'default', children, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-valentine-primary text-white hover:bg-valentine-deep focus:ring-valentine-primary/50',
    outline: 'border border-valentine-primary/20 bg-transparent text-valentine-primary hover:bg-valentine-primary/10 focus:ring-valentine-primary/50',
    secondary: 'bg-valentine-light text-valentine-primary hover:bg-valentine-accent/20 focus:ring-valentine-primary/50'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}