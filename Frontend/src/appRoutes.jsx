import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/SignUp";
import Protected from "./features/auth/components/Protected";
import InterviewReport from "./features/interview/pages/InterviewReport";
import Interview from "./features/interview/pages/Interview";
import HeroPage from "./features/Home/HeroPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/", element: <HeroPage/>
  }
  ,{
   path:"/interview",
   element: (<Protected><Interview/></Protected>)
  }
,
  {
    path: "/interviewReport/:interviewId",
    element: (
      <Protected>
        <InterviewReport />
      </Protected>
    ),
  },
  // {
  //     path:"/interview/:interviewId",
  //      element: <Protected><Interview/></Protected>
  // }
]);
