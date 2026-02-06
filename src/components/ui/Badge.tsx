import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const variants = {
    primary: 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20',
    secondary: 'bg-brand-gray text-brand-white',
    success: 'bg-green-500/10 text-green-500 border border-green-500/20',
    outline: 'border border-brand-gray text-brand-white/70',
  };

  return (
    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full inline-block ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
