import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TeacherContext } from "../../context/InitialContext";
import { useContext } from "react";

const ExamReg = () => {
  const [users, setUsers] = useState([]);
  const [initial, setInitial] = useState("");
  const [teachersName, setTeachersName] = useState("");
  const [teachersInitial, setTeachersInitial] = useState("");

  const [levelTermInfo, setLevelTermInfo] = useState([]);

  // const [levelterm, setLevelTerm] = useState([]);
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState("");

  const navigate = useNavigate();

  // fetching level & term information
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/levelterm");
      const data = await response.json();
      setLevelTermInfo(data)
    }
    

    fetchData();
  }, []);

  let LevelTerm = [];
  console.log(levelTermInfo)

  levelTermInfo.map((data) => LevelTerm.push(data.LVT));

  // lvt handling
  const lvtHandle = (e) => {
    const lvt = e.target.value;

    const a = levelTermInfo.find((x) => x.LVT === lvt);
    setSections(a.section);
    setCourses(a.course);
    setStudents(a.Total_students);
  };

  // fetch teacher information

  const teachers = useContext(TeacherContext);
  useEffect(() => {
    if (teachers[0]) {
      setTeachersName(teachers[0].Name);
      setTeachersInitial(teachers[0].Initial);
    }
  }, [teachers, teachersName, teachersInitial]);

  // handeling teacher names and initial
  const nameHandle = (e) => {
    const name = e.target.value;
    const nameIndex = teachersName.indexOf(name);
    setInitial(teachersInitial[nameIndex]);
  };

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

    const user = {
      name: name,
      initial: initial,
      lvt: lvt,
      section: section,
      course: course,
      reg_students: reg_students,
      total: t_students,
    };

    fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const Nuser = [...users, data];
        setUsers(Nuser);
      })
      .catch((err) => console.log(err));

    navigate("/");
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
                  <select
                    onChange={nameHandle}
                    id="countries"
                    name="name"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  >
                    <option defaultValue={"Choose Your Name"}>
                      Choose Your Name
                    </option>
                    {teachersName
                      ? teachersName.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))
                      : "Choose Name first"}
                  </select>
                </div>
                {/* teacher initial */}
                <div>
                  <label className="font-medium text-gray-900">
                    Teacher Initial:
                  </label>
                  <input
                    type="text"
                    name="initial"
                    value={initial ? initial : "Select Your Name First"}
                    disabled
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                  />
                </div>

                {/* level and term */}
                <div>
                  <label className="font-medium text-gray-900">
                    Level & Term:
                  </label>
                  <select
                    onChange={lvtHandle}
                    id="countries"
                    name="lvt"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  >
                    <option defaultValue={"Choose level & term"}>
                      Choose level & term
                    </option>
                    {LevelTerm.map((lvt, index) => (
                      <option key={index} value={lvt}>
                        {lvt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* section */}
                <div>
                  <label className="font-medium text-gray-900">Section:</label>
                  <select
                    required
                    id="countries"
                    name="section"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  >
                    <option>
                      {sections.length > 0
                        ? "Choose section"
                        : "Choose level & term First"}
                    </option>
                    {sections.map((sec, index) => (
                      <option key={index} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
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
                      courses ? "" : "disabled"
                    }border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5`}
                  >
                    <option>
                      {courses.length > 0
                        ? "Choose course"
                        : "Choose level & term First"}
                    </option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {/* registered student */}
                <div>
                  <label className="font-medium text-gray-900">
                    Registerd Student:
                  </label>
                  <input
                    required
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                    type="text"
                    id="routine"
                    name="reg_students"
                  />
                </div>

                {/* total student */}
                <div className={`${students ? "block" : "hidden"}`}>
                  <label className="font-medium text-gray-900">
                    Total Student:
                  </label>
                  <input
                    disabled
                    name="t_students"
                    className={`w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm`}
                    type="text"
                    id="routine"
                    value={students ? students : ""}
                  />
                </div>
              </div>
              {/* <div>
                                <label for="message">Add CSV:</label>
                                <input
                                    className="w-full outline-dotted outline-1 rounded-lg focus:outline-slate-600 p-3 text-sm 
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                                    placeholder="Message"
                                    type="file"
                                    id="message"
                                ></input>
                            </div> */}

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
