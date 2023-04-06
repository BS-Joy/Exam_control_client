import { React, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RoomAlloc = () => {
  const [slots, setSlots] = useState([]);
  const [examSlot, setExamSlot] = useState();
  const [semester, setSemester] = useState();
  const [reqRooms, setReqRooms] = useState();
  const [query, setQuery] = useState({});
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState();
  const [roomAllocation, setRoomAllocation] = useState();
  // const [noExam, setNoExam] = useState(true)

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
      setSlots(midSlot);
    } else if (type === "Final") {
      setSlots(finalSlot);
    } else {
      setSlots([]);
    }
  };

  // onchange handle for getting all the query params to get the course list
  const queryHandle = (event) => {
    const filed = event.target.name;
    const value = event.target.value;
    const newQuery = { ...query };

    newQuery[filed] = value;
    console.log(newQuery)
    setQuery(newQuery);
  };

  // for getting all the Course list according to the three params which are date, exam type & slot
  const getCourse = (e) => {
    e.preventDefault();

    const slot = e.target.value;
    setExamSlot(slot);

    fetch(
      `http://localhost:3001/exams/${query.date}/${query.exam_type}/${slot}`
    )
      .then((res) => res.json())
      .then((data) => {
        const course = [];
        data.map((c) => course.push(c.course_code));

        find_total(course);
      });
  };

  // function for find the total student
  const find_total = async (course) => {
    const student = await Promise.all(
      course.map((course) =>
        fetch(`http://localhost:3001/students/${course}`).then((res) =>
          res.json()
        )
      )
    );
    const exam_courses = student.map((stu) => stu[0]);
    setCourses(exam_courses);
    const reg_students = student
      .map((stu) => (stu[0] ? parseInt(stu[0].reg_students) : null))
      .filter((num) => num !== null);
    const total_student = reg_students.reduce((a, b) => a + b, 0);
    setTotal(total_student);

    findReqRoom(total_student, rooms_list);
  };

  //   function for find the required room aginst total students
  const findReqRoom = (total_student, rooms) => {
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
    setReqRooms(req_rooms);
  };

  // submit handling
  const submitHandle = async (e) => {
    e.preventDefault();

    // if(courses.length > 0){
    //   setNoExam(false);
    // }

    if (courses.length > 0 && reqRooms.length > 0) {
      const temp_req_room = [];

      for (let i in courses) {
        let remaining_student = Math.ceil(courses[i].reg_students / 2);
        const room_need = {
          course: courses[i].course,
          initial: courses[i].initial,
          section: courses[i].section,
          total: courses[i].reg_students,
          room: [],
          student: [],
        };
        for (let j in reqRooms) {
          if (reqRooms[j].total !== 0 && remaining_student !== 0) {
            if (reqRooms[j].total > remaining_student) {
              room_need.room.push(reqRooms[j].room_no);
              room_need.student.push(remaining_student);
              reqRooms[j].total = reqRooms[j].total - remaining_student;
              remaining_student = courses[i].reg_students - remaining_student;
              courses[i].reg_students = remaining_student;
            } else {
              if (reqRooms[j].total >= 7) {
                courses[i].reg_students =
                  courses[i].reg_students - reqRooms[j].total;
                remaining_student = courses[i].reg_students;
                room_need.room.push(reqRooms[j].room_no);
                room_need.student.push(reqRooms[j].total);
                reqRooms[j].total = 0;
              } else {
                remaining_student = courses[i].reg_students;
              }
            }
          }
        }
        temp_req_room.push(room_need);
      }

      console.log(temp_req_room);
      setRoomAllocation(temp_req_room);
    }
  };

  const exportPdf = () => {
    console.log("exported as pdf");
    const doc = new jsPDF();

    // for reverse the date format
    // const arrayDate = query.date.split("");
    // const reverseArrayDate = arrayDate.reverse();
    const reverseDate = query.date.split('-').reverse().join('-');

    autoTable(doc, {
      body: [
        [
          {
            content:
              `${query.exam_type} Term Examination, ${
                semester && semester
              }-${new Date().getFullYear()}` +
              `\n Date: ${reverseDate}    Slot: (${examSlot})` +
              `\n Total Seats: ${total}`,
            styles: {
              halign: "center",
              fontSize: 15,
            },
          },
        ],
      ],
    });

    autoTable(doc, {
      html: "#room_alloc_table",
      theme: "grid",
    });

    doc.save(`${query.exam_type} Term ${semester}-${new Date().getFullYear()}_${reverseDate}, Slot-${examSlot}.pdf`);
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {/* alert */}
        {/* <div className={`alert alert-warning shadow-lg ${noExam ? 'block' : 'hidden'}`}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: No exam on this day</span>
          </div>
        </div> */}
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
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
                    {slots.length > 0
                      ? "Choose Slot"
                      : "Choose Exam type first"}
                  </option>
                  {slots.map((slot, index) => (
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
                    setSemester(e.target.value);
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
        {roomAllocation ? (
          <div className="overflow-x-auto mt-8 mb-8">
            <h1 className="text-center text-3xl font-bold mb-3">Room Allocation List</h1>
            <table id="room_alloc_table" className="mb-8 table table-compact w-full border rounded-md border-slate-900">
              <thead>
                <tr>
                  <th className="border-2 border-slate-900 text-center">Course</th>
                  <th className="border-2 border-slate-900 text-center">Tech.Int</th>
                  <th className="border-2 border-slate-900 text-center">Section</th>
                  <th className="border-2 border-slate-900 text-center">Room No</th>
                  <th className="border-2 border-slate-900 text-center">Seats</th>
                  <th className="border-2 border-slate-900 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {roomAllocation.map((course) => {
                  return course.room.map((room, index) => {
                    return (
                      <tr className="border-b-2 border-slate-900" key={room}>
                        {index === 0 && (
                          <td className="border-2 border-slate-900 text-center" rowSpan={course.room.length}>{course.course}</td>
                        )}
                        {index === 0 && (
                          <td className="border-2 border-slate-900 text-center" rowSpan={course.room.length}>{course.initial}</td>
                        )}
                        {index === 0 && (
                          <td className="border-2 border-slate-900 text-center" rowSpan={course.room.length}>{course.section}</td>
                        )}
                        <td className="border-2 border-slate-900 text-center">{room}</td>
                        <td className="border-2 border-slate-900 text-center">{course.student[index]}</td>
                        {index === 0 && (
                          <td className="border-2 border-slate-900 text-center" rowSpan={course.room.length}>{course.total}</td>
                        )}
                      </tr>
                    );
                  });
                })}
                <tr>
                  <td className="border-2 border-slate-900 text-center" colSpan="5">Total</td>
                  <td className="border-2 border-slate-900 text-center">{total}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={exportPdf}
              className="btn-primary px-8 py-3 rounded-md"
            >
              Download
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RoomAlloc;
