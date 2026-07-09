import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img 
      src="/Logo.png" 
      alt="Brain Tiq Ora Logo" 
      className={`h-8 w-auto object-contain ${className}`} 
    />
  );
}
