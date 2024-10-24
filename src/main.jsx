import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AdminPermits from "./pages/AdminPermits.jsx";
import DormerHomepage from "./pages/DormerHomepage.jsx";
import TransientView from "./pages/TransientView.jsx";
import TransientSuccess from "./pages/TransientSuccess.jsx";
import LoginPage from "./pages/Login.jsx";


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
    path: "/dormer",
    element: <DormerHomepage />,
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
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
