import { React, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RoomAlloc = () => {
  const [slot, setSlot] = useState([]);
  const [reqRooms, setReqRooms] = useState();
  const [query, setQuery] = useState({});
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState();
  const [roomAllocation, setRoomAllocation] = useState();

  const rooms_list = useLoaderData();

  // handling exam slot
  const midSlot = [
    "Slot A: 9:00 - 10:30 am",
    "Slot B: 11:30 - 1:00 pm",
    "Slot C: 02:00 - 3:30 pm",
    "Slot D: 06:00 - 8:30 pm",
  ];
  const finalSlot = [
    "Slot A: 9:00 - 11:00 am",
    "Slot B: 12:00 - 2:00 pm",
    "Slot C: 03:00 - 5:00 pm",
    "Slot D: 6:00 - 8:00 pm",
  ];

  const slotHandle = (e) => {
    e.preventDefault();

    const type = e.target.value;
    if (type === "Mid") {
      setSlot(midSlot);
    } else if (type === "Final") {
      setSlot(finalSlot);
    } else {
      setSlot([]);
    }
  };

  // onchange handle for getting all the query params to get the course list
  const queryHandle = (event) => {
    const filed = event.target.name;
    const value = event.target.value;
    const newQuery = { ...query };

    newQuery[filed] = value;
    setQuery(newQuery);
  };

  // for getting all the Course list according to the three params which are date, exam type & slot
  const getCourse = (e) => {
    e.preventDefault();

    const slot = e.target.value;

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

    if (courses.length > 0 && reqRooms.length > 0) {
      const temp_req_room = [];

      for (let i in courses) {
        let remaining_student = Math.ceil(courses[i].reg_students / 2);
        const room_need = {
          course: courses[i].course,
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
      // console.log(courses)
      setRoomAllocation(temp_req_room);
    }
  };

  const exportPdf = () => {
    console.log("exported as pdf");
    const doc = new jsPDF();

    autoTable(doc, { html: "#room_alloc_table" });

    doc.save("new_table.pdf");
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <Link to="/">
            <FaArrowLeft />
          </Link>
          <div>Total: {total ? total : "Not yet calculate"}</div>
          {/* <div>Total: {reqRooms ? reqRooms.map(room => <p>{room.total}</p>) : "Not yet calculate"}</div> */}
          <form className="space-y-4" onSubmit={submitHandle}>
            <legend className="text-center text-3xl font-bold underline">
              Room Allocation
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="font-medium text-gray-900">Date:</label>
                <input
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
                  onChange={getCourse}
                  id="slot"
                  name="slot"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                >
                  <option defaultValue="Choose Slot">
                    {slot.length > 0 ? "Choose Slot" : "Choose Exam type first"}
                  </option>
                  {slot.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
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
          <div className="table">
            <table id="room_alloc_table" className="mb-8">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Room No</th>
                  <th>Seats</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {roomAllocation.map((course) => {
                  return course.room.map((room, index) => {
                    return (
                      <tr key={room}>
                        {index === 0 && (
                          <td rowSpan={course.room.length}>{course.course}</td>
                        )}
                        <td>{room}</td>
                        <td>{course.student[index]}</td>
                        {index === 0 && (
                          <td rowSpan={course.room.length}>{course.total}</td>
                        )}
                      </tr>
                    );
                  });
                })}
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
