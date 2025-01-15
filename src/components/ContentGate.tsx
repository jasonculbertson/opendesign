import React, { useState, useEffect } from 'react';
import EmailOverlay from './EmailOverlay';

interface ContentGateProps {
  children: React.ReactNode;
}

export default function ContentGate({ children }: ContentGateProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (!emailSubmitted) {
      setShowOverlay(true);
    } else {
      setHasSubmittedEmail(true);
    }
  }, []);

  const handleEmailSubmit = async (email: string) => {
    try {
      setError(null);
      setIsSuccess(false);
      console.log('Starting email submission:', email);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      console.log('Response received:', {
        status: response.status,
        ok: response.ok
      });

      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      console.log('Setting success state');
      setIsSuccess(true);
      setHasSubmittedEmail(true);
      localStorage.setItem('emailSubmitted', 'true');
      
      console.log('Waiting for animation');
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      console.log('Hiding overlay');
      setShowOverlay(false);
    } catch (error) {
      console.error('Error subscribing:', error);
      setError(error instanceof Error ? error.message : 'Failed to subscribe');
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    console.log('State changed:', {
      showOverlay,
      hasSubmittedEmail,
      error,
      isSuccess
    });
  }, [showOverlay, hasSubmittedEmail, error, isSuccess]);

  const resetOverlay = () => {
    localStorage.removeItem('emailSubmitted');
    setHasSubmittedEmail(false);
    setShowOverlay(true);
    setError(null);
  };

  return (
    <div className="relative">
      {/* Dev tools - only shown in development */}
      {import.meta.env.DEV && (
        <button
          onClick={resetOverlay}
          className="fixed bottom-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-md text-sm opacity-50 hover:opacity-100 z-50"
        >
          Reset Overlay
        </button>
      )}

      {/* Content section with mask */}
      <div 
        className={showOverlay && !hasSubmittedEmail ? 'relative' : ''}
        style={showOverlay && !hasSubmittedEmail ? {
          maxHeight: '1000px',
          overflow: 'hidden',
          mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)',
          WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)'
        } : {}}
      >
        {children}
      </div>

      {/* Overlay section */}
      {showOverlay && !hasSubmittedEmail && (
        <div className="relative px-4 sm:px-6 lg:px-8" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div className="max-w-[680px] mx-auto bg-white pt-4">
            <EmailOverlay 
              onEmailSubmit={handleEmailSubmit} 
              error={error}
              isSuccess={isSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}
