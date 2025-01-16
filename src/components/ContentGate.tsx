import React, { useState, useEffect } from 'react';
import EmailOverlay from './EmailOverlay';

interface ContentGateProps {
  children: React.ReactNode;
}

export default function ContentGate({ children }: ContentGateProps) {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('emailSubscribed') === 'true';
  });
  const [isHiding, setIsHiding] = useState(false);

  const handleSuccess = () => {
    setIsHiding(true);
    // Wait for success animation before hiding
    setTimeout(() => {
      localStorage.setItem('emailSubscribed', 'true');
      setIsSubscribed(true);
    }, 1500);
  };

  if (isSubscribed) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div 
        className="relative transition-opacity duration-500" 
        style={{
          maxHeight: '1000px',
          overflow: 'hidden',
          mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)',
          WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)'
        }}
      >
        {children}
      </div>

      <div 
        className={`relative px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          isHiding ? 'opacity-0 transform translate-y-4' : 'opacity-100'
        }`} 
        style={{ mask: 'none', WebkitMask: 'none' }}
      >
        <div className="max-w-[680px] mx-auto bg-white pt-4">
          <EmailOverlay onSuccess={handleSuccess} />
        </div>
      </div>

      {/* Dev reset button */}
      {import.meta.env.DEV && (
        <button
          onClick={() => {
            localStorage.removeItem('emailSubscribed');
            setIsSubscribed(false);
            setIsHiding(false);
          }}
          className="fixed bottom-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-md text-sm opacity-50 hover:opacity-100 z-50"
        >
          Reset Overlay
        </button>
      )}
    </div>
  );
}
