import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AdminPermits from "./pages/AdminPermits.jsx";
import PermitCard from "./components/PermitCard.jsx";

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
    path: "/permit",
    element: <PermitCard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
