import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
