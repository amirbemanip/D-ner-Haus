import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-white text-black hover:bg-gold",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      outline: "border border-white/10 text-white hover:bg-white hover:text-black",
      ghost: "text-gray-500 hover:text-white",
      gold: "bg-gold text-black hover:bg-white"
    }

    const sizes = {
      sm: "px-4 py-2 text-[10px]",
      md: "px-6 py-4 text-xs",
      lg: "px-8 py-6 text-sm",
      xl: "px-10 py-8 text-base"
    }

    return (
      <button
        className={cn(
          "btn-magnetic font-bold uppercase tracking-widest transition-all rounded-xl cursor-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
