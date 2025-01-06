import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/AuthContext'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Don't render anything during SSR
  }

  // Only use auth hooks after client check
  const ClientSideContent = () => {
    const { signInWithEmail, signInWithGoogle } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)
      
      try {
        await signInWithEmail('login', email)
        setSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    const handleGoogleSignIn = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        await signInWithGoogle()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setIsLoading(false)
      }
    }

    if (success) {
      return (
        <div className="auth-success">
          <h3 className="text-lg font-medium text-green-900">Check your email</h3>
          <p className="mt-2 text-sm text-green-700">
            We've sent a magic link to {email}. Click the link to sign in.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Sign in with Email'}
          </button>
        </form>

        <div className="auth-divider">
          <div className="auth-divider-text">
            <span>Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="auth-button-secondary"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
            <path d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.0362 19.252 6.3106 17.1399 5.3646 14.3003H1.3916V17.3912C3.37 21.4434 7.4854 24.0008 12.24 24.0008Z" fill="#34A853"/>
            <path d="M5.36451 14.3003C5.14451 13.5593 5.02051 12.7733 5.02051 11.9666C5.02051 11.1599 5.14451 10.3739 5.36451 9.63293V6.54202H1.39151C0.507514 8.20283 0 10.0297 0 11.9666C0 13.9035 0.507514 15.7304 1.39151 17.3912L5.36451 14.3003Z" fill="#FBBC05"/>
            <path d="M12.24 4.68186C14.0291 4.68186 15.6265 5.32607 16.8574 6.49357L20.2695 3.0814C18.2001 1.1742 15.4764 0 12.24 0C7.4854 0 3.37 2.55742 1.3916 6.54202L5.3646 9.63293C6.3106 6.79326 9.0362 4.68186 12.24 4.68186Z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    )
  }

  return <ClientSideContent />
}
