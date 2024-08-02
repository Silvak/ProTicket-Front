import {
  DashboardAdminPage,
  OverviewPage,
  ProjectsPage,
  SearchProjectsPage,
  EditProjectsPage,
  UsersPage,
} from "@/pages";

export const privateRoutes = [
  {
    path: "/admin",
    element: <DashboardAdminPage />,
    children: [
      //Overview
      {
        path: "overview",
        element: <OverviewPage />,
      },

      // projects
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/search",
        element: <SearchProjectsPage />,
      },
      {
        path: "projects/edit/:id",
        element: <EditProjectsPage />,
      },

      // users
      {
        path: "users",
        element: <ProjectsPage />,
      },
      {
        path: "users/search",
        element: <UsersPage />,
      },
      {
        path: "users/edit/:id",
        element: <ProjectsPage />,
      },

      // notifications
      {
        path: "notification",
        element: <ProjectsPage />,
      },
      {
        path: "notification/search",
        element: <UsersPage />,
      },
      {
        path: "notification/email",
        element: <UsersPage />,
      },
      {
        path: "notification/edit/:id",
        element: <ProjectsPage />,
      },

      // database
      {
        path: "data",
        element: <ProjectsPage />,
      },
      {
        path: "data/search",
        element: <UsersPage />,
      },
      {
        path: "data/edit/:id",
        element: <ProjectsPage />,
      },

      // report
      {
        path: "reports",
        element: <ProjectsPage />,
      },
      {
        path: "reports/search",
        element: <UsersPage />,
      },
      {
        path: "reports/edit/:id",
        element: <ProjectsPage />,
      },
    ],
  },

  {
    path: "/user",
    element: <DashboardAdminPage />,
    children: [],
  },

  {
    path: "/reseller",
    element: <DashboardAdminPage />,
    children: [],
  },
];
