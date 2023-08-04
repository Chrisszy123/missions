import React, { FC } from 'react';

interface OverlayProps{
    children: React.ReactNode
}
const Overlay = ({ children }: OverlayProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
       {children}
      </div>
    </div>
  );
};

export default Overlay;