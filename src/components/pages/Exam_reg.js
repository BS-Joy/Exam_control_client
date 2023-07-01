import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TeacherContext } from "../../context/InitialContext";
import { useContext } from "react";
import { useReducer } from "react";

const initialState = {
  users: [],
  initial: "",
  teachersName: "",
  teachersInitial: "",
  levelTermInfo: [],
  sections: [],
  courses: [],
  students: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "got_user":
      return { ...state, users: action.result };
    case "Got_Initial":
      return { ...state, initial: action.result };
    case "got_teachersname":
      return { ...state, teachersName: action.result };
    case "Got_TeachersInitial":
      return { ...state, teachersInitial: action.result };
    case "Got_LevelTermInfo":
      return { ...state, levelTermInfo: action.result };
    case "courses":
      return {
        ...state,
        // sections: action.result.sections,
        courses: action.result,
        // students: action.result.students
      };
    default:
      return state;
  }
};

const ExamReg = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // fetching level & term information
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("https://exam-control.onrender.com/levelterm");
  //     const data = await response.json();
  //     console.log(data)
  //     dispatch({type: 'Got_LevelTermInfo', result: data});
  //   };

  //   fetchData();
  // }, []);

  // seperating only level & term from the levelTermInfo array
  const levelTerms = [
    "L1 T1",
    "L1 T2",
    "L2 T1",
    "L2 T2",
    "L3 T1",
    "L3 T2",
    "L4 T1",
    "L4 T2",
  ];
  // state.levelTermInfo.map((data) => LevelTerm.push(data.LVT));

  // lvt handling
  const getCourses = async (e) => {
    const lvt = e.target.value;
    const course_codes = [];
    try {
      await fetch(`https://exam-control.onrender.com/get_courses/${lvt}`)
        .then((res) => res.json())
        .then((data) =>
          data.map((course) => course_codes.push(course.course_code))
        );
    } catch (err) {
      console.log(err);
    }

    // console.log(course_codes)
    // dispatch({type: 'sections_courses_students', result: {sections: a.section, courses: a.course, students: a.Total_students}})
    dispatch({ type: "courses", result: course_codes });
  };

  // fetch teacher information

  // const teachers = useContext(TeacherContext);
  // useEffect(() => {
  //   if (teachers[0]) {
  //     dispatch({ type: "got_teachersname", result: teachers[0].Name });
  //     dispatch({ type: "Got_TeachersInitial", result: teachers[0].Initial });
  //   }
  // }, [teachers]);

  // handeling teacher names and initial
  // const nameHandle = (e) => {
  //   const name = e.target.value;
  //   const nameIndex = state.teachersName.indexOf(name);
  //   dispatch({ type: "Got_Initial", result: state.teachersInitial[nameIndex] });
  // };

  // handleing the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const initial = e.target.initial.value;
    const lvt = e.target.lvt.value;
    const section = e.target.section.value;
    const course = e.target.course.value;
    const reg_students = e.target.reg_students.value;
    const t_students = e.target.t_students.value;

    const exam = {
      name: name,
      initial: initial,
      lvt: lvt,
      section: section,
      course: course,
      reg_students: reg_students,
      total: t_students,
    };

    // console.log(exam);

    fetch("https://exam-control.onrender.com", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(exam),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    // const Nuser = [...state.users, data];
    // dispatch({ type: "got_user", result: Nuser });

    e.target.reset();
    // navigate("/home");
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <Link to="/">
              <FaArrowLeft />
            </Link>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <legend className="text-center text-3xl font-bold underline">
                Exam Registration
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="font-medium text-gray-900">Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                  />
                  {/* <select
                    onChange={nameHandle}
                    id="countries"
                    name="name"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  >
                    <option defaultValue={"Choose Your Name"}>
                      Choose Your Name
                    </option>
                    {state.teachersName
                      ? state.teachersName.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))
                      : "Choose Name first"}
                  </select> */}
                </div>
                {/* teacher initial */}
                <div>
                  <label className="font-medium text-gray-900">
                    Teacher Initial:
                  </label>
                  <input
                    type="text"
                    name="initial"
                    placeholder="Enter Your Name Intitial"
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                  />
                </div>

                {/* level and term */}
                <div>
                  <label className="font-medium text-gray-900">
                    Level & Term:
                  </label>
                  <select
                    onChange={getCourses}
                    id="countries"
                    name="lvt"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  >
                    <option defaultValue={"Choose level & term"}>
                      Choose level & term
                    </option>
                    {levelTerms.map((lvt, index) => (
                      <option key={index} value={lvt}>
                        {lvt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* section */}
                <div>
                  <label className="font-medium text-gray-900">Section:</label>
                  <input
                    type="text"
                    name="section"
                    placeholder="Enter Section"
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                  />
                  {/* <select
                    required
                    id="countries"
                    name="section"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  >
                    <option>
                      {state.sections.length > 0
                        ? "Choose section"
                        : "Choose level & term First"}
                    </option>
                    {state.sections.map((sec, index) => (
                      <option key={index} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select> */}
                </div>

                {/* course */}
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    className={`${
                      state.courses ? "" : "disabled"
                    }border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5`}
                  >
                    <option>
                      {state.courses.length > 0
                        ? "Choose course"
                        : "Choose level & term First"}
                    </option>
                    {state.courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {/* registered student */}
                <div>
                  <label className="font-medium text-gray-900">
                    Registerd Students:
                  </label>
                  <input
                    required
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                    type="text"
                    id="reg_students"
                    name="reg_students"
                    placeholder="Enter Registered Students"
                  />
                </div>

                {/* total student */}
                <div>
                  <label className="font-medium text-gray-900">
                    Total Student:
                  </label>
                  <input
                    name="t_students"
                    className={`w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm`}
                    type="text"
                    id="total_students"
                    placeholder="Enter Total Students"
                  />
                </div>
              </div>

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
        </div>
      </section>
    </>
  );
};

export default ExamReg;
