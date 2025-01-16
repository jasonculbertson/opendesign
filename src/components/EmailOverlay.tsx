import React, { useState } from 'react';
import { validateEmail } from '../lib/emailValidation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface EmailOverlayProps {
  onSuccess: () => void;
}

export default function EmailOverlay({ onSuccess }: EmailOverlayProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    // Submit email
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(onSuccess, 1000); // Allow success message to show
      } else if (data.error?.includes('already subscribed')) {
        // Handle duplicate emails gracefully
        setShowSuccess(true);
        setTimeout(onSuccess, 1000);
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      setError('Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900">
          Thank you!
        </h2>
        <p className="text-lg text-gray-600">
          You're all set! The content will be visible in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900">
        Get unlimited access
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Access to all leadership guides
      </p>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            disabled={isSubmitting}
            placeholder="Your email"
            className="w-full max-w-sm mx-auto px-6 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 block disabled:opacity-50 disabled:cursor-not-allowed"
          />
          
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full max-w-sm mx-auto bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium block disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
              Continue reading
            </span>
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-[15px] text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Access to all leadership guides and templates</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Exclusive design case studies</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Regular updates with new content</span>
          </div>
        </div>

        <div className="mt-8 pb-16 text-sm text-gray-400">
          We respect your privacy. No spam, ever. Unsubscribe anytime.
        </div>
      </div>
    </div>
  );
}
