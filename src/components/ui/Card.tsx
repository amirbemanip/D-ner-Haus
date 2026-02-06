import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-brand-charcoal border border-brand-gray/50 rounded-brand-xl p-6 shadow-xl ${onClick ? 'cursor-pointer hover:border-brand-orange/50 transition-all active:scale-[0.98]' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
