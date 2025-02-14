import { cn } from "../lib/utils"

export function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-valentine-primary text-white shadow hover:bg-valentine-primary/90",
    secondary: "bg-valentine-secondary text-white shadow-sm hover:bg-valentine-secondary/90",
    outline: "border border-valentine-primary bg-transparent hover:bg-valentine-primary/10 text-valentine-primary",
    ghost: "hover:bg-valentine-primary/10 text-valentine-primary",
  }

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}