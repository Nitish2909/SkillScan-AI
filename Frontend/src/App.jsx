import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router";
import { router } from "./appRoutes";
import { AuthProvider } from "./features/auth/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        {/* Toast Notification Container */}
        <ToastContainer position="top-center" autoClose={3000} />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
