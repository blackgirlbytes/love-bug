import { cn } from "../lib/utils"

export function Card({
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-valentine-primary/20 bg-white p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
  ...props
}) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-valentine-primary",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  className,
  children,
  ...props
}) {
  return (
    <p
      className={cn("text-sm text-valentine-secondary", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export function CardContent({
  className,
  children,
  ...props
}) {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn("flex items-center pt-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}