"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card = ({ children, className = '', animate = true }: CardProps) => {
  const content = (
    <div className={`glass rounded-brand-xl overflow-hidden border border-brand-white/5 transition-all duration-500 hover:border-brand-orange/20 ${className}`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
};
