import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-16 w-full rounded-xl border border-white/10 bg-obsidian-surface px-6 py-4 text-sm font-mono uppercase text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-700 focus:border-gold outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
