import React, { useState } from 'react';
import { validateEmail } from '../lib/emailValidation';

interface EmailOverlayProps {
  onEmailSubmit: (email: string) => Promise<void>;
  error: string | null;
}

export default function EmailOverlay({ onEmailSubmit, error }: EmailOverlayProps) {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [suggestedEmail, setSuggestedEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuggestedEmail(null);

    const validation = validateEmail(email);

    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid email');
      return;
    }

    if (validation.correctedEmail) {
      setSuggestedEmail(validation.correctedEmail);
      setValidationError(validation.error || null);
      return;
    }

    setIsSubmitting(true);
    try {
      await onEmailSubmit(validation.correctedEmail || email);
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestedEmailClick = async () => {
    if (suggestedEmail) {
      setEmail(suggestedEmail);
      setSuggestedEmail(null);
      setValidationError(null);
      setIsSubmitting(true);
      try {
        await onEmailSubmit(suggestedEmail);
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 1000));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900">Get unlimited access</h2>
      <p className="text-lg text-gray-600 mb-6">
        Read the full guide and unlock our entire library of essential design leadership resources.
      </p>

      <div className="max-w-md mx-auto">
        {!isSubmitting ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationError(null);
                setSuggestedEmail(null);
              }}
              required
              placeholder="Your email"
              className="w-full max-w-sm mx-auto px-6 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 block"
            />
            
            {validationError && (
              <div className="text-red-500 text-sm mt-2">{validationError}</div>
            )}
            
            {error && !validationError && (
              <div className="text-sm mt-2">
                {error.includes('already subscribed') ? (
                  <div className="text-green-600">
                    <p>{error}</p>
                    <a 
                      href="mailto:support@opendesign.com" 
                      className="text-blue-500 hover:underline mt-1 inline-block"
                    >
                      Contact Support
                    </a>
                  </div>
                ) : (
                  <div className="text-red-500">{error}</div>
                )}
              </div>
            )}

            {suggestedEmail && (
              <button
                type="button"
                onClick={handleSuggestedEmailClick}
                className="mt-2 text-blue-500 text-sm hover:underline"
              >
                Use {suggestedEmail} instead?
              </button>
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
          <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-8 h-8 text-green-500 animate-check" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-green-600 font-medium">Email saved!</p>
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
