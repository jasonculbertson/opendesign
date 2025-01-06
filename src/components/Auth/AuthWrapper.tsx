import { useEffect, useState } from 'react'
import { AuthProvider } from '../../lib/AuthContext'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return <AuthProvider>{children}</AuthProvider>
}
