import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AdminPermits from "./pages/AdminPermits.jsx";
import TransientView from "./pages/TransientView.jsx";
import TransientSuccess from "./pages/TransientSuccess.jsx";
import TransientBooking from "./pages/TransientBooking.jsx";
import LoginPage from "./pages/Login.jsx";
import ManageDormers from "./pages/ManageDormers.jsx";
import ManageRooms from "./pages/ManageRooms.jsx";
import FilePermitPage from "./pages/FilePermitPage.jsx";
import PermitLogsPage from "./pages/PermitLogsPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import { applyStoredTheme } from "./utils/theme";
import RequireAdmin from "./components/RequireAdmin.jsx";
import RequireUser from "./components/RequireUser.jsx";

applyStoredTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manage",
    element: (
      <RequireAdmin>
        <AdminPermits />
      </RequireAdmin>
    ),
  },
  {
    path: "/file-permit",
    element: (
      <RequireUser>
        <FilePermitPage />
      </RequireUser>
    ),
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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/manage-dormers",
    element: (
      <RequireAdmin>
        <ManageDormers />
      </RequireAdmin>
    ),
  },
  {
    path: "/manage-rooms",
    element: (
      <RequireAdmin>
        <ManageRooms />
      </RequireAdmin>
    ),
  },
  {
    path: "/permit-log",
    element: (
      <RequireUser>
        <PermitLogsPage />
      </RequireUser>
    ),
  },
  {
    path: "/notifications",
    element: (
      <RequireUser>
        <NotificationPage />
      </RequireUser>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
