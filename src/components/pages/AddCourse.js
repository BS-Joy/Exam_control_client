import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddCourse = () => {
  const [course, setCourse] = useState({});

  const navigate = useNavigate();

  const levelTerms = ['L1 T1', 'L1 T2', 'L2 T1', 'L2 T2', 'L3 T1', 'L3 T2', 'L4 T1', 'L4 T2', ]

  const inputHandle = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newCourse = { ...course };

    newCourse[field] = value;
    // console.log(newCourse)
    setCourse(newCourse);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    fetch("https://exam-control.onrender.com/add_courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    e.target.reset()
  };
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <Link to="/">
              <FaArrowLeft />
            </Link>
            <form className="space-y-4" onSubmit={submitHandle}>
              <legend className="text-center text-3xl font-bold underline">
                Add Course
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Course title */}
                <div>
                  <label className="font-medium text-gray-900">
                    Course Title:
                  </label>
                  <input
                    onBlur={inputHandle}
                    id="course_title"
                    type="text"
                    placeholder="Enter Course Title"
                    name="course_title"
                    required
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4"
                  />
                </div>
                {/* Course Code */}
                <div>
                  <label className="font-medium text-gray-900">
                    Course Code:
                  </label>
                  <input
                    required
                    onBlur={inputHandle}
                    type="text"
                    name="course_code"
                    placeholder="Enter Course Code"
                    className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm"
                  />
                </div>

                {/* Terms & Level */}
                <div>
                  <label className="font-medium text-gray-900">
                    Level & Terms:
                  </label>
                  <select
                    onBlur={inputHandle}
                    required
                    id="level_term"
                    name="level_term"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4">
                    <option defaultValue={"Choose Level & Terms"}>
                      Choose Level & Terms
                    </option>
                    {
                        levelTerms.map((lT, index) => (
                            <option key={index} value={`${lT}`}>{lT}</option>
                        ))
                    }
                  </select>
                </div>
              </div>

              {/* submit button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-3 text-white sm:w-auto">
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

export default AddCourse;
