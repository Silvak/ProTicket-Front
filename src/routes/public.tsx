import { HomePage } from '@/pages'

export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <>LoginPage</>,
  },
  {
    path: '/register',
    element: <>RegisterPage</>,
  },
]
