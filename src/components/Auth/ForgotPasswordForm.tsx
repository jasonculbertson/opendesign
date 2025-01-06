import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      setSuccessMessage('Check your email for the password reset link!')
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSuccessMessage(null)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-[15px]">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-blue-50 text-blue-600 p-3 rounded-lg text-[15px]">
            {successMessage}
          </div>
        )}
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="block w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[15px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 rounded-lg text-[15px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Send reset link
        </button>
      </form>

      <div className="text-center">
        <a href="/login" className="text-[15px] text-blue-600 hover:text-blue-700">
          Back to login
        </a>
      </div>
    </div>
  )
}
