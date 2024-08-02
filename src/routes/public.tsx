import { HomePage, LoginPage } from '@/pages'

export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]
