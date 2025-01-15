import React, { useState, useEffect } from 'react';
import EmailOverlay from './EmailOverlay';

interface ContentGateProps {
  children: React.ReactNode;
}

export default function ContentGate({ children }: ContentGateProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const payload = { email };
      console.log('Submitting request:', payload);
      
      const response = await fetch('/api/test.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      const text = await response.text();
      console.log('Raw response text:', text);

      let data;
      try {
        data = JSON.parse(text);
        console.log('Parsed response:', data);
      } catch (parseError) {
        console.error('Failed to parse response:', {
          error: parseError,
          text: text.slice(0, 200) + '...' // Show first 200 chars
        });
        throw new Error('Server returned an invalid response');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Test failed');
      }

      setHasSubmittedEmail(true);
      localStorage.setItem('emailSubmitted', 'true');
      setShowOverlay(false);
    } catch (error) {
      console.error('Error in handleEmailSubmit:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      setError(error instanceof Error ? error.message : 'Test failed');
    }
  };

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
            <EmailOverlay onEmailSubmit={handleEmailSubmit} error={error} />
          </div>
        </div>
      )}
    </div>
  );
}
