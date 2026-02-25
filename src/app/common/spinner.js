"use client";

import React from 'react';

const Spinner = ({ size = 4, color = "text-white" }) => {
  const paddingClass = `p-${size}`;
  
  return (
    <div className={`flex items-center justify-center ${paddingClass}`}>
      <div className={`animate-spin rounded-full h-6 w-6 border-2 border-t-transparent ${color}`}></div>
    </div>
  );
};

export default Spinner;

