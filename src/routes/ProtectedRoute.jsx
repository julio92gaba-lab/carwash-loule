import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">A verificar sessão...</p>
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />

  return children
}
