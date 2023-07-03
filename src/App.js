import Layout from "./components/layout/Layout";
import ExamInfo from "./components/pages/Exam_info";
import ExamReg from "./components/pages/Exam_reg";
import AddRoutine from "./components/pages/admin/Add_Routine";
import AddRoom from "./components/pages/admin/Add_Room";
import RoomAlloc from "./components/pages/Room_alloc";
import AddCourse from "./components/pages/admin/AddCourse";
import Courses from "./components/pages/admin/Courses"
import Rooms from "./components/pages/admin/Rooms"
import Exams from "./components/pages/admin/Exams"
import Routines from "./components/pages/admin/Routines"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { RoomAllocSeatPlanProvider } from "./context/RoomAlloc_SeatPlan_Context";
import { AllocContextProvider } from "./context/SeatAllocContext";
import RoomAllocationTable from "./components/pages/Room_Allocation_Table";
import Login from "./components/pages/auth/LogIn"
import SignUp from "./components/pages/auth/SignUp";
import AdminSignUp from "./components/pages/auth/Admin_SignUp";
import ForgotPass from "./components/pages/auth/ForgotPass";
import UpdatePassword from "./components/pages/auth/UpdatePassword";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import AdminRoute from "./components/routes/AdminRoute";
import TeachersRoute from "./components/routes/TeachersRoute";
import Error from "./components/Error";
import Profile from "./components/pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/home",
          element: <PrivateRoute><ExamInfo /></PrivateRoute>,
          loader: () => fetch("https://exam-control-server.vercel.app"),
        },
        {
          path: "/",
          element: <PublicRoute><Login /></PublicRoute>,
        },
        {
          path: "/signup",
          element: <PublicRoute><SignUp /></PublicRoute>,
        },
        {
          path: "/admin_signup",
          element: <PublicRoute><AdminSignUp /></PublicRoute>,
        },

        {
          path: "/password_reset",
          element: <PublicRoute><ForgotPass /></PublicRoute>,
        },

        // teacher routes
        {
          path: "/exam_reg",
          element: <TeachersRoute><ExamReg /></TeachersRoute>,
        },

        // admin routes
        {
          path: "/add_routine",
          element: <AdminRoute><AddRoutine /></AdminRoute>,
        },
        {
          path: "/add_room",
          element: <AdminRoute><AddRoom /></AdminRoute>,
        },
        {
          path: "/room_alloc",
          element: <AdminRoute><RoomAlloc /></AdminRoute>,
          loader: () => fetch("https://exam-control-server.vercel.app/rooms"),
        },
        {
          path: "/add_course",
          element: <AdminRoute><AddCourse /></AdminRoute>
        },
        {
          path: "/courses",
          element: <AdminRoute><Courses /></AdminRoute>,
          loader: () => fetch("http://localhost:5000/all_courses")
        },
        {
          path: "/rooms",
          element: <AdminRoute><Rooms /></AdminRoute>,
          loader: () => fetch("http://localhost:5000/")
        },
        {
          path: "/exams",
          element: <AdminRoute><Exams /></AdminRoute>,
          loader: () => fetch("http://localhost:5000/")
        },
        {
          path: "/routines",
          element: <AdminRoute><Routines /></AdminRoute>,
          loader: () => fetch("http://localhost:5000/")
        },
        {
          path: "/allocated_rooms",
          element: <AdminRoute><RoomAllocationTable /></AdminRoute>
        },
        {
          path: "/profile",
          element: <PrivateRoute><Profile /></PrivateRoute>
        },
        {
          path: "/change_Pass",
          element: <PrivateRoute><UpdatePassword /></PrivateRoute>
        }
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RoomAllocSeatPlanProvider>
          <AllocContextProvider>
            <RouterProvider router={router} />
          </AllocContextProvider>
        </RoomAllocSeatPlanProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
