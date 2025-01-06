import React, { useEffect, useState } from 'react'
import { AuthProvider } from '../../lib/AuthContext'
import { UserProfile } from './UserProfile'
import '../../styles/auth.css'

interface AuthContainerProps {
  showUserProfile?: boolean
  children?: React.ReactNode
}

export function AuthContainer({ showUserProfile = false, children }: AuthContainerProps) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-red-600">Error: {error.message}</div>
      </div>
    )
  }

  try {
    return (
      <AuthProvider>
        {showUserProfile && <UserProfile />}
        {children}
      </AuthProvider>
    )
  } catch (e) {
    console.error('Error in AuthContainer:', e)
    setError(e instanceof Error ? e : new Error('Unknown error'))
    return null
  }
}
