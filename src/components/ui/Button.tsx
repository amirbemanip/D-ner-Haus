"use client"
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none tracking-widest uppercase';

  const variants = {
    primary: 'bg-brand-orange text-brand-black hover:bg-brand-orange-light shadow-[0_10px_30px_rgba(230,126,34,0.3)]',
    secondary: 'bg-brand-white text-brand-black hover:bg-white',
    outline: 'border border-brand-orange/50 text-brand-orange hover:bg-brand-orange hover:text-brand-black',
    ghost: 'bg-transparent text-brand-white hover:bg-brand-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] rounded-brand-md',
    md: 'px-6 py-3 text-[11px] rounded-brand-lg',
    lg: 'px-10 py-4 text-xs rounded-brand-xl',
    xl: 'px-12 py-6 text-sm rounded-brand-pill',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
