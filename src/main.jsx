import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AdminPermits from "./pages/AdminPermits.jsx";
import DormerHomepage from "./pages/DormerHomepage.jsx";
import TransientView from "./pages/TransientView.jsx";
import TransientSuccess from "./pages/TransientSuccess.jsx";
import TransientBooking from "./pages/TransientBooking.jsx";
import LoginPage from "./pages/Login.jsx";
import TestDormPage from "./pages/TestDormerPage.jsx";
import ManageDormers from "./pages/ManageDormers.jsx";
import ManageRooms from "./pages/ManageRooms.jsx";
import FilePermitPage from "./pages/FilePermitPage.jsx";
import PermitLogsPage from "./pages/PermitLogsPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manage",
    element: <AdminPermits />,
  },
  {
    path: "/file-permit",
    element: <FilePermitPage/>,
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
    path: "/testDormer",
    element: <TestDormPage />,
  },
  {
    path: "/manage-dormers",
    element: <ManageDormers/>
  },
  {
    path: "/manage-rooms",
    element: <ManageRooms/>
  },
  {
    path: "/permit-log",
    element: <PermitLogsPage/>
  },
  {
    path: "/notifications",
    element: <NotificationPage/>
  }

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
