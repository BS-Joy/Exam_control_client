import { React, useReducer } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import RoomAllocationTable from "../Room_Allocation_Table";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  slots: [],
  examSlot: "",
  semester: "",
  reqRooms: [],
  query: {},
  courses: [],
  total: 0,
  roomAllocation: [],
  seatPlan: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "slot":
      return {
        ...state,
        slots: action.result,
      };
    case "examSlot":
      return {
        ...state,
        examSlot: action.result,
      };
    case "semester":
      return {
        ...state,
        semester: action.result,
      };
    case "reqRooms":
      return {
        ...state,
        reqRooms: action.result,
      };
    case "query":
      return {
        ...state,
        query: action.result,
      };
    case "courses":
      return {
        ...state,
        courses: action.result,
      };
    case "total":
      return {
        ...state,
        total: action.result,
      };
    case "roomAllocation":
      return {
        ...state,
        roomAllocation: action.result,
      };
    case "seatPlan":
      return {
        ...state,
        seatPlan: action.result,
      };
    default:
      return state;
  }
};

const RoomAlloc = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const rooms_list = useLoaderData();

  // handling exam slot
  const midSlot = [
    "A (9:00 AM - 10:30 AM)",
    "B (11:30 AM - 1:00 PM)",
    "C (02:00 PM - 3:30 PM)",
    "D (06:00 PM - 8:30 PM)",
  ];
  const finalSlot = [
    "A (9:00 AM - 11:00 AM)",
    "B (12:00 PM - 2:00 PM)",
    "C (03:00 PM - 5:00 PM)",
    "D (6:00 PM - 8:00 PM)",
  ];

  const slotHandle = (e) => {
    e.preventDefault();

    const type = e.target.value;
    if (type === "Mid") {
      dispatch({ type: "slot", result: midSlot });
    } else if (type === "Final") {
      dispatch({ type: "slot", result: finalSlot });
    } else {
      dispatch({ type: "slot", result: [] });
    }
  };

  // onchange handle for getting all the query params to get the course list
  const queryHandle = (event) => {
    const filed = event.target.name;
    const value = event.target.value;
    const newQuery = { ...state.query };

    newQuery[filed] = value;
    console.log(newQuery);
    dispatch({ type: "query", result: newQuery });
  };

  // for getting all the Course list according to the three params which are date, exam type & slot
  const getCourse = (e) => {
    e.preventDefault();

    const slot = e.target.value;
    dispatch({ type: "examSlot", result: slot });
    console.log(state.examSlot);

    fetch(
      `http://localhost:5000/exams/${state.query.date}/${state.query.exam_type}/${slot}`
    )
      .then((res) => res.json())
      .then((data) => {
        const course = [];
        data.map((c) => course.push(c.course_code));

        find_total(course);
      });
  };

  // function to find the total student
  const find_total = async (course) => {
    const student = await Promise.all(
      course.map((course) =>
        fetch(`http://localhost:5000/students/${course}`).then((res) =>
          res.json()
        )
      )
    );
    const exam_courses = student.map((stu) => stu[0]);
    dispatch({ type: "courses", result: exam_courses });
    const reg_students = student
      .map((stu) => (stu[0] ? parseInt(stu[0].reg_students) : null))
      .filter((num) => num !== null);
    const total_student = reg_students.reduce((a, b) => a + b, 0);
    console.log(total_student);
    dispatch({ type: "total", result: total_student });

    findReqRoom(total_student, rooms_list);
  };

  // function for find the required room aginst total students
  const findReqRoom = (total_student, rooms) => {
    rooms.sort((a, b) => b.total - a.total);
    const req_rooms = [];
    let total = 0;
    for (let i in rooms) {
      if (total >= total_student) {
        break;
      } else {
        req_rooms.push(rooms[i]);
        total += rooms[i].total;
      }
    }
    dispatch({ type: "reqRooms", result: req_rooms });
  };

  // toast function
  // const toastFunction = () => {
  //   toast.info("No exam found!", {
  //     position: "bottom-center",
  //     autoClose: 1000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // };

  // submit handling
  const submitHandle = async (e) => {
    e.preventDefault();
    if (state.total > 0) {
      const pre_seat_plan = [];

      for (let i in state.reqRooms) {
        pre_seat_plan.push({
          room: state.reqRooms[i],
          course: [],
          student: [],
        });
      }

      if (state.courses.length > 0 && state.reqRooms.length > 0) {
        const temp_room_alloc = [];

        for (let i in state.courses) {
          let remaining_student = Math.ceil(state.courses[i].reg_students / 2);

          const room_need = {
            course: state.courses[i].course,
            initial: state.courses[i].initial,
            section: state.courses[i].section,
            total: state.courses[i].reg_students,
            room: [],
            student: [],
          };
          for (let j in state.reqRooms) {
            if (state.reqRooms[j].total !== 0 && remaining_student !== 0) {
              if (state.reqRooms[j].total > remaining_student) {
                for (let x in pre_seat_plan) {
                  if (
                    pre_seat_plan[x].room.room_no === state.reqRooms[j].room_no
                  ) {
                    pre_seat_plan[x].course.push(state.courses[i].course);
                    pre_seat_plan[x].student.push(remaining_student);
                  }
                }
                room_need.room.push(state.reqRooms[j].room_no);
                room_need.student.push(remaining_student);
                state.reqRooms[j].total =
                  state.reqRooms[j].total - remaining_student;
                remaining_student =
                  state.courses[i].reg_students - remaining_student;
                state.courses[i].reg_students = remaining_student;
              } else {
                if (state.reqRooms[j].total >= 7) {
                  for (let x in pre_seat_plan) {
                    if (
                      pre_seat_plan[x].room.room_no ===
                      state.reqRooms[j].room_no
                    ) {
                      pre_seat_plan[x].course.push(state.courses[i].course);
                      pre_seat_plan[x].student.push(state.reqRooms[j].total);
                    }
                  }
                  state.courses[i].reg_students =
                    state.courses[i].reg_students - state.reqRooms[j].total;
                  remaining_student = state.courses[i].reg_students;
                  room_need.room.push(state.reqRooms[j].room_no);
                  room_need.student.push(state.reqRooms[j].total);
                  state.reqRooms[j].total = 0;
                } else {
                  remaining_student = state.courses[i].reg_students;
                }
              }
            }
          }
          temp_room_alloc.push(room_need);
        }

        // console.log(pre_seat_plan);
        dispatch({ type: "seatPlan", result: pre_seat_plan });
        console.log(temp_room_alloc);
        console.log(typeof temp_room_alloc);
        dispatch({ type: "roomAllocation", result: temp_room_alloc });
      }
    } else {
      toast.info("No exam found!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <div>
            <ToastContainer
              position="bottom-center"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="light"
              transition={Slide}
            />
          </div>
          <Link to="/">
            <FaArrowLeft />
          </Link>
          {/* <div>Total: {total ? total : "Not yet calculate"}</div> */}
          <form className="space-y-4" onSubmit={submitHandle}>
            <legend className="text-center text-3xl font-bold underline">
              Room Allocation
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Date */}
              <div>
                <label className="font-medium text-gray-900">Date:</label>
                <input
                  required
                  onBlur={queryHandle}
                  type="date"
                  name="date"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                />
              </div>

              {/* Exam type */}
              <div>
                <label className="font-medium text-gray-900">Exam Type:</label>
                <select
                  required
                  onBlur={queryHandle}
                  onMouseLeave={slotHandle}
                  id="exam_type"
                  name="exam_type"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                >
                  <option defaultValue={"Choose exam type"}>
                    Choose exam type
                  </option>
                  <option value="Mid">Mid</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              {/* slot */}
              <div>
                <label className="font-medium text-gray-900">Slot:</label>
                <select
                  required
                  onChange={getCourse}
                  id="slot"
                  name="slot"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                >
                  <option defaultValue="Choose Slot">
                    {state.slots.length > 0
                      ? "Choose Slot"
                      : "Choose Exam type first"}
                  </option>
                  {state.slots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              {/* semester */}
              <div>
                <label className="font-medium text-gray-900">
                  Select Semester:
                </label>
                <select
                  required
                  onChange={(e) => {
                    dispatch({ type: "semester", result: e.target.value });
                  }}
                  id="semester"
                  name="semester"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                >
                  <option defaultValue={"Choose Semester"}>
                    Choose Semester
                  </option>
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>
            </div>

            {/* submit */}
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-3 text-white sm:w-auto"
              >
                <span className="font-medium">Submit</span>
              </button>
            </div>
          </form>
        </div>
        {state.roomAllocation.length > 0 ? (
          <RoomAllocationTable
            roomAllocation={state.roomAllocation}
            total={state.total}
            query={state.query}
            semester={state.semester}
            examSlot={state.examSlot}
            pre_seat_plan={state.seatPlan}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RoomAlloc;
