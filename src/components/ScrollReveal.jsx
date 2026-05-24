import React from 'react';

export default function ScrollReveal({ children, className = "", delay = 0 }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
