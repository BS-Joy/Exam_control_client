import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const Courses = () => {
  let loadCourses = useLoaderData();
  const [courses, setCourses] = useState(loadCourses)
  console.log(courses);

  const deleteHanlde = (course_id) => {
    const agree = window.confirm('Are you sure you want to delete this course');
    // console.log(course_id)
    if(agree) {
        fetch(`https://exam-control-server.vercel.app/course_delete/${course_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0) {
                const remainCourses = courses.filter(course => course._id !== course_id);
                setCourses(remainCourses);
            }
        })
        .catch(err => console.log(err))
    } else {
        console.log('Null')
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-screen-xl p-2">
        <section className="container px-4 mx-auto">
            <h1 className="text-center text-2xl font-bold mb-5">Courses</h1>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <h2 className="text-lg font-medium text-gray-800">Total</h2>
                    <span className="px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    {courses.length} courses
                    </span>
                </div>
                <div>
                    <Link to='/add_course' className="btn btn-outline rounded btn-primary btn-sm">Add Course</Link>
                </div>
            </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                      <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500"
                        >
                          
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500"
                        >
                          <div className="flex items-center justify-center gap-x-3">
                            {/* <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded"
                            /> */}Course Title
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500"
                        >
                          Course Code
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500"
                        >
                          Level & Terms
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500"
                        >
                          Control
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            courses.map((course, index) => (
                                <tr key={course._id}>
                                    <td className="p-4 text-sm text-center font-medium text-gray-700 whitespace-nowrap">
                                    {index + 1}
                                    </td>
                                    <td className="p-4 text-sm text-center font-medium text-gray-700 whitespace-nowrap">
                                    {course.course_title}
                                    </td>
                                    <td className="p-4 text-sm text-center font-medium text-gray-700 whitespace-nowrap">
                                    {course.course_code}
                                    </td>
                                    <td className="p-4 text-sm text-center font-medium text-gray-700 whitespace-nowrap">
                                    {course.level_term}
                                    </td>
                                    <td className="p-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-x-6">
                                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 hover:text-yellow-500 focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            </button>
                                            <button onClick={() => deleteHanlde(course._id)} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 hover:text-red-500 focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Link
              href="#"
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </Link>

            <div className="items-center hidden lg:flex gap-x-3">
              <Link
                href="#"
                className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60"
              >
                1
              </Link>
              <Link
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                2
              </Link>
              <Link
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                3
              </Link>
              <Link
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                ...
              </Link>
              <Link
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                12
              </Link>
              <Link
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                13
              </Link>
              <Link
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                14
              </Link>
            </div>

            <Link
              href="#"
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Courses;
