import './App.css';
import Layout from './components/Layout';
import ExamInfo from './components/pages/Exam_info';
import ExamReg from "./components/pages/Exam_reg"
import Routine from './components/pages/Routine';
import RoomReg from './components/pages/Room_reg'
import RoomAlloc from './components/pages/Room_alloc';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TeacherContextProvider } from './context/InitialContext';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ExamInfo />,
          loader: () => fetch('http://localhost:3001')
        },
        {
          path: '/input_schedule',
          element: <ExamReg />
        },
        {
          path: '/routine',
          element: <Routine />,
        },
        {
          path: '/room',
          element: <RoomReg />
        },
        {
          path: '/room_alloc',
          element: <RoomAlloc />,
          loader: () => fetch('http://localhost:3001/rooms')
        }
      ]
    }
  ])

  return (
    <>
    <TeacherContextProvider>
      <RouterProvider router={router} />
    </TeacherContextProvider>
    </>

  );
}

export default App;