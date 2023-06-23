import Layout from "./components/layout/Layout";
import ExamInfo from "./components/pages/Exam_info";
import ExamReg from "./components/pages/Exam_reg";
import Routine from "./components/pages/Routine";
import AddRoom from "./components/pages/Add_Room";
import RoomAlloc from "./components/pages/Room_alloc";
import AddCourse from "./components/pages/AddCourse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { RoomAllocSeatPlanProvider } from "./context/RoomAlloc_SeatPlan_Context";
import { AllocContextProvider } from "./context/SeatAllocContext";
import RoomAllocationTable from "./components/pages/Room_Allocation_Table";
import Login from "./components/pages/auth/LogIn"
import SignUp from "./components/pages/auth/SignUp";
import AdminSignUp from "./components/pages/auth/Admin_SignUp";
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
          loader: () => fetch("https://exam-control.onrender.com"),
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
          path: "/admin-signup",
          element: <PublicRoute><AdminSignUp /></PublicRoute>,
        },
        {
          path: "/input_schedule",
          element: <TeachersRoute><ExamReg /></TeachersRoute>,
        },
        {
          path: "/routine",
          element: <AdminRoute><Routine /></AdminRoute>,
        },
        {
          path: "/add_room",
          element: <AdminRoute><AddRoom /></AdminRoute>,
        },
        {
          path: "/room_alloc",
          element: <AdminRoute><RoomAlloc /></AdminRoute>,
          loader: () => fetch("https://exam-control.onrender.com/rooms"),
        },
        {
          path: "/add_course",
          element: <AdminRoute><AddCourse /></AdminRoute>
        },
        {
          path: "/allocated_rooms",
          element: <RoomAllocationTable />
        },
        {
          path: "/profile",
          element: <PrivateRoute><Profile /></PrivateRoute>
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
