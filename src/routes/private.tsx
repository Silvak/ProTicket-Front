import {
  DashboardAdminPage,
  DashboardPage,
  DashboardUserPage,
  DetailProjectsPage,
  DetailTicketPage,
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
        path: 'projects/details/:projectId',
        element: <DetailProjectsPage />,
      },
      {
        path: 'projects/details/:projectId/ticket/:ticketId',
        element: <DetailTicketPage />,
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
    element: <DashboardUserPage />,
    allowedRoles: ['USER_ROLE'],
    children: [],
  },

  {
    path: '/reseller',
    element: <DashboardPage />,
    allowedRoles: ['RESELLER_ROLE'],
    children: [],
  },
]
