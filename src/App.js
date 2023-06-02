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
import GetUser from "./components/GetUser";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ExamInfo />,
          loader: () => fetch("http://localhost:5000"),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/input_schedule",
          element: <ExamReg />,
        },
        {
          path: "/routine",
          element: <Routine />,
        },
        {
          path: "/add_room",
          element: <AddRoom />,
        },
        {
          path: "/room_alloc",
          element: <RoomAlloc />,
          loader: () => fetch("http://localhost:5000/rooms"),
        },
        {
          path: "/add_course",
          element: <AddCourse />
        },
        {
          path: "/allocated_rooms",
          element: <RoomAllocationTable />
        },
        {
          path: "/getUser",
          element: <GetUser />,
        },
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
