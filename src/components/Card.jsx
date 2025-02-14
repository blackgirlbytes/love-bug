import React from 'react'

export function Card({ className, children }) {
  return (
    <div className={`rounded-xl border border-valentine-accent/20 bg-white/80 backdrop-blur-lg shadow-soft transition-all duration-300 hover:shadow-glow ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children }) {
  return (
    <h3 className={`text-2xl font-semibold text-valentine-neutral tracking-tight ${className}`}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children }) {
  return (
    <p className={`mt-2 text-valentine-neutral/80 ${className}`}>
      {children}
    </p>
  )
}

export function CardContent({ className, children }) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
}