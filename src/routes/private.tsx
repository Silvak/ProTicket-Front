import { DashboardPage } from '@/pages'

export const privateRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        path: 'overview',
        element: <> OVERVIEW </>,
      },
    ],
  },
]
