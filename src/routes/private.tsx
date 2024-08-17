import {
  DashboardAdminPage,
  DetailProjectsPage,
  DetailUserPage,
  OverviewPage,
  ProjectsPage,
  UsersPage,
} from '@/pages'

export const privateRoutes = [
  {
    path: '/admin',
    element: <DashboardAdminPage />,
    allowedRoles: ['ADMIN_ROLE'],
    children: [
      //Overview
      {
        path: 'overview',
        element: <OverviewPage />,
      },

      // projects
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'projects/details/:id',
        element: <DetailProjectsPage />,
      },

      // users
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/details/:id',
        element: <DetailUserPage />,
      },
    ],
  },

  {
    path: '/user',
    element: <DashboardAdminPage />,
    allowedRoles: ['USER_ROLE'],
    children: [],
  },

  {
    path: '/reseller',
    element: <DashboardAdminPage />,
    allowedRoles: ['RESELLER_ROLE'],
    children: [],
  },
]
