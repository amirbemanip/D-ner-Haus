import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'gold' | 'green' | 'red' | 'gray'
}

function Badge({ className, variant = 'gray', ...props }: BadgeProps) {
  const variants = {
    gold: "border-gold/20 text-gold bg-gold/5",
    green: "border-green-500/20 text-green-500 bg-green-500/5",
    red: "border-red-500/20 text-red-500 bg-red-500/5",
    gray: "border-white/10 text-gray-500 bg-white/5"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
