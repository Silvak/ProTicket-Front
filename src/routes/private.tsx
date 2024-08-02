import {
  DashboardAdminPage,
  OverviewPage,
  ProjectsPage,
  UsersPage,
} from '@/pages'

export const privateRoutes = [
  {
    path: '/admin',
    element: <DashboardAdminPage />,
    children: [
      {
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
    ],
  },
]
