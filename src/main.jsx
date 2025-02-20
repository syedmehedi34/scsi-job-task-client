import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeContext";
import { TaskProvider } from "./providers/TaskContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <ThemeProvider>
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
              }}
            />
            <ToastContainer />
          </ThemeProvider>
        </TaskProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
