import React, { useState } from 'react';
import { validateEmail } from '../lib/emailValidation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface EmailOverlayProps {
  onSubmit: (email: string) => Promise<string | null>;
}

export default function EmailOverlay({ onSubmit }: EmailOverlayProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    
    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    // Submit email
    setIsSubmitting(true);
    const error = await onSubmit(email);
    setIsSubmitting(false);

    if (error) {
      setError(error);
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900">
        {isSuccess ? 'Thank you!' : 'Get unlimited access'}
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        {isSuccess 
          ? 'You\'re all set! The content will be visible in a moment.'
          : 'Read the full guide and unlock our entire library of essential design leadership resources.'
        }
      </p>

      <div className="max-w-md mx-auto">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              disabled={isSubmitting}
              required
              placeholder="Your email"
              className="w-full max-w-sm mx-auto px-6 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 block"
            />
            
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-sm mx-auto bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Continue reading'}
            </button>
          </form>
        ) : (
          <div className="text-center mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
          </div>
        )}

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
