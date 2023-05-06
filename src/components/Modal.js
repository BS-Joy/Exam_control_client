import React, { memo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Modal = ({ seat_plan, pre_plan, total, query, semester, examSlot }) => {

  console.log(seat_plan)
  const seeSeat = () => {
    const doc = new jsPDF();
    const reverseDate = query.date.split("-").reverse().join("-");
    autoTable(doc, {
      body: [
        [
          {
            content:
              `${query.exam_type} Term Examination, ${
                semester && semester
              }-${new Date().getFullYear()}` +
              `\n Date: ${reverseDate}    Slot: (${examSlot})` +
              `\n Total Seats: ${total}`+ 
              `\n ---------------------------------------------------------------------------------`+ 
              `\n ---------------------------------------------------------------------------------`,
            styles: {
              halign: "center",
              fontSize: 15,
              fillColor: null
            },
          },
        ],
      ],
    });
    for (let i = 0; i < seat_plan.length; i++) {

      autoTable(doc, {
        body: [
          [
            {
              title: `Room No: ${pre_plan[i].room.room_no}`,
              styles: {
                textColor: [0, 0, 0],
                fontSize: 15,
                fillColor: null
              }
            }
          ]
        ]
      })

      autoTable(doc, {
        margin: {top: -5},
        html: `#table-${i}`,
        theme: "grid",
        useCss: true,
        styles: {
          minCellWidth: 10
        }
      });
    }

    doc.save("Seat Allocation.pdf");
  };

  return (
    <>
      <div>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <label
              htmlFor="my-modal-5"
              className="btn btn-sm btn-circle absolute right-2 top-2 mb-10"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg text-center">Seat Plan</h3>
            <div className="plan-table">
              {seat_plan.map((room, index) => (
                <div className="overflow-x-auto" key={index}>
                  <h1 className="mb-2 text-lg font-bold">
                    Room No: {pre_plan[index].room.room_no}
                  </h1>
                  <table id={`table-${index}`} className="table w-full mb-10">
                    {/* head */}
                    <thead className="border border-gray-800">
                      <tr>
                        {room.map((data, index) => {
                          return (
                            <th
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              Col-{data.column}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="border">
                      {/* row 1 */}
                      <tr>
                        {room.map((data, index) => {
                          const courses = data.courses;
                          return courses.length > 1 ? (
                            <td
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              {courses.join(" + ")}
                            </td>
                          ) : courses.length < 0 ? (
                            <td
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              {"None"}
                            </td>
                          ) : (
                            <td
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              {courses}
                            </td>
                          );
                        })}
                      </tr>
                      {/* row 2 */}
                      <tr>
                        {room.map((data, index) => {
                          const students = data.students;
                          return students.length > 1 ? (
                            <td
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              {students.join("+")}
                            </td>
                          ) : students.length < 0 ? (
                            <td
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              {"Null"}
                            </td>
                          ) : (
                            <td
                              key={index}
                              className="text-center border border-gray-800"
                            >
                              {students}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={seeSeat}
                className="btn-primary px-8 py-3 rounded-md"
              >
                Download Seat Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
