import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export function TestAuth() {
  const [status, setStatus] = useState<string>('Testing connection...')

  useEffect(() => {
    async function testConnection() {
      try {
        // Test Supabase connection by getting the current user
        const { data, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error('Supabase error:', error)
          setStatus(`❌ Error: ${error.message}`)
          return
        }

        // If we get here, the connection is working
        setStatus('✅ Supabase connection successful!')
        console.log('Current auth state:', data)
      } catch (err) {
        console.error('Unexpected error:', err)
        setStatus(`❌ Unexpected error: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      <p className={`${status.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
        {status}
      </p>
    </div>
  )
}
