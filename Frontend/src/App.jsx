import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router";
import { router } from "./appRoutes";
import { AuthProvider } from "./features/auth/authContext";
import { InterviewProvider } from "./features/interview/interviewContext";

function App() {
  return (
    <>
      <AuthProvider>
        {/* Toast Notification Container */}
        <ToastContainer position="top-center" autoClose={3000} />
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  );
}

export default App;
