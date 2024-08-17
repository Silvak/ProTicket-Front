import { useAuthStore } from '@/store'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((state) => state.status) === 'authorized'
  const user = useAuthStore((state) => state.user)
  const userRole = user
  console.log(userRole)

  const { pathname } = useLocation()

  // Verifica si el usuario está autenticado
  if (!isLoggedIn) {
    return <Navigate to={`/login?from=${pathname}`} />
  }

  // Verifica si el rol del usuario está permitido
  if (allowedRoles && !allowedRoles.includes('ADMIN_ROLE')) {
    return <Navigate to="/unauthorized" />
  }

  return <>{children}</>
}
