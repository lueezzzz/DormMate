import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AdminPermits from "./pages/AdminPermits.jsx";
import TransientView from "./pages/TransientView.jsx";
import TransientSuccess from "./pages/TransientSuccess.jsx";
import TransientBooking from "./pages/TransientBooking.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ManageDormers from "./pages/ManageDormers.jsx";
import ManageRooms from "./pages/ManageRooms.jsx";
import FilePermitPage from "./pages/FilePermitPage.jsx";
import PermitLogsPage from "./pages/PermitLogsPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import { applyStoredTheme } from "./utils/theme";
import RequireAdmin from "./components/RequireAdmin.jsx";
import RequireUser from "./components/RequireUser.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

applyStoredTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/transient",
    element: <TransientView />,
  },
  {
    path: "/transient-success",
    element: <TransientSuccess />,
  },
  {
    path: "/transient-booking",
    element: <TransientBooking />,
  },
  {
    element: <RequireUser />,
    children: [
      {
        path: "/file-permit",
        element: <FilePermitPage />,
      },
      {
        path: "/permit-log",
        element: <PermitLogsPage />,
      },
      {
        path: "/notifications",
        element: <NotificationPage />,
      },
    ],
  },
  {
    element: <RequireAdmin />,
    children: [
      {
        path: "/manage",
        element: <AdminPermits />,
      },
      {
        path: "/manage-dormers",
        element: <ManageDormers />,
      },
      {
        path: "/manage-rooms",
        element: <ManageRooms />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);