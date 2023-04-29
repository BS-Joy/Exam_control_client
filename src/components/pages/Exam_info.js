import { React, useEffect, useState } from "react";

const ExamInfo = () => {
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setRoutines(data);
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <div className="container mx-auto max-w-screen-xl">
        <h1 className="text-center font-bold text-3xl pb-8">Exam Schedule</h1>
        <div className="flex justify-between">
          {/* <div className="flex justify-end items-center mb-3">
            <h2 className="text-xl font-bold">Search Course: &nbsp;</h2>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-info focus:outline-none w-full max-w-xs"
                />
                <button className="btn btn-outline btn-info py-4">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div> */}

          <div className="total">
            <h1 className="text-2xl">Total: {routines.length}</h1>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table id="info_table" className="table table-compact w-full">
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">Course Code</th>
                <th className="text-center">Slot</th>
                <th className="text-center">Teacher Initial</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((routine) => (
                <tr key={routine._id}>
                  <td className="text-center">{routine.date}</td>
                  <td className="text-center">{routine.course_code}</td>
                  <td className="text-center">{routine.slot}</td>
                  <td className="text-center">{routine.teacherInitial}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">Course Code</th>
                <th className="text-center">Slot</th>
                <th className="text-center">Teacher Initial</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamInfo;
