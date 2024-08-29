import {
  DashboardAdminPage,
  DashboardResellerPage,
  DashboardUserPage,
  DetailProjectsPage,
  DetailTicketPage,
  DetailUserPage,
  OverviewPage,
  ProjectsPage,
  UserDetailProjectsPage,
  UserOverviewPage,
  UserProjectsPage,
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
        path: 'project-detail/:projectId',
        element: <DetailProjectsPage />,
      },
      {
        path: 'ticket-detail/:ticketId',
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
    children: [
      //Overview
      {
        path: 'overview',
        element: <UserOverviewPage />,
      },

      // projects
      {
        path: 'projects',
        element: <UserProjectsPage />,
      },
      {
        path: 'project-detail/:projectId',
        element: <UserDetailProjectsPage />,
      },
      {
        path: 'ticket-detail/:ticketId',
        element: <DetailTicketPage />,
      },

      // users
      {
        path: 'resellers',
        element: <UsersPage />,
      },
      {
        path: 'resellers/details/:id',
        element: <DetailUserPage />,
      },
    ],
  },

  {
    path: '/reseller',
    element: <DashboardResellerPage />,
    allowedRoles: ['RESELLER_ROLE'],
    children: [
      //Overview
      /*
      {
        path: "overview",
        element: <OverviewPage />,
      },
      */

      // projects
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'project-detail/:projectId',
        element: <DetailProjectsPage />,
      },
      {
        path: 'ticket-detail/:ticketId',
        element: <DetailTicketPage />,
      },
    ],
  },
]
