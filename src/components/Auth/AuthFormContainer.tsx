import React, { useState, useEffect } from 'react'
import { AuthProvider } from '../../lib/AuthContext'
import '../../styles/auth.css'

interface AuthFormContainerProps {
  children: React.ReactNode
}

export function AuthFormContainer({ children }: AuthFormContainerProps) {
  const [mounted, setMounted] = useState(false)

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

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
