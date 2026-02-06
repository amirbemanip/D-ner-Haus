import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300';

  const variants = {
    primary: 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20',
    secondary: 'bg-brand-white/5 text-brand-white/50 border border-brand-white/10',
    outline: 'bg-transparent border border-brand-white/20 text-brand-white/60',
    success: 'bg-green-500/10 text-green-500 border border-green-500/20',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
