import React, { useState, useEffect } from 'react';
import EmailOverlay from './EmailOverlay';

interface ContentGateProps {
  children: React.ReactNode;
}

export default function ContentGate({ children }: ContentGateProps) {
  // Single source of truth for visibility
  const [showOverlay, setShowOverlay] = useState(true);
  
  // Check localStorage on mount
  useEffect(() => {
    const hasSubmitted = localStorage.getItem('emailSubmitted') === 'true';
    if (hasSubmitted) {
      setShowOverlay(false);
    }
  }, []);

  const handleSubmit = async (email: string) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('emailSubmitted', 'true');
        setShowOverlay(false);
        return null;
      } else {
        return data.error || 'Failed to subscribe';
      }
    } catch (error) {
      return 'Failed to subscribe';
    }
  };

  // Dev reset button
  const handleReset = () => {
    localStorage.removeItem('emailSubmitted');
    setShowOverlay(true);
  };

  return (
    <div className="relative">
      {/* Dev reset button */}
      {import.meta.env.DEV && (
        <button
          onClick={handleReset}
          className="fixed bottom-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-md text-sm opacity-50 hover:opacity-100 z-50"
        >
          Reset Overlay
        </button>
      )}

      {/* Main content with mask */}
      <div 
        className={showOverlay ? 'relative' : ''}
        style={showOverlay ? {
          maxHeight: '1000px',
          overflow: 'hidden',
          mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)',
          WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)'
        } : {}}
      >
        {children}
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="relative px-4 sm:px-6 lg:px-8" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div className="max-w-[680px] mx-auto bg-white pt-4">
            <EmailOverlay onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
