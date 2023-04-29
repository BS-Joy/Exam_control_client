import React, { useContext } from "react";
import { RoomAllocSeatPlan } from "../context/RoomAlloc_SeatPlan_Context";

const RoomAllocationTable = ({
  roomAllocation,
  total,
  query,
  semester,
  examSlot,
  pre_seat_plan,
}) => {
  console.log(pre_seat_plan );
  const {exportRoomAllocation} = useContext(RoomAllocSeatPlan);
  return (
    <>
      <div className="overflow-x-auto mt-8 mb-8">
        <h1 className="text-center text-3xl font-bold mb-3">
          Room Allocation List
        </h1>
        <table
          id="room_alloc_table"
          className="mb-8 table table-compact w-full border rounded-md border-slate-900"
        >
          <thead>
            <tr>
              <th className="border-2 border-slate-900 text-center">Course</th>
              <th className="border-2 border-slate-900 text-center">
                Tech.Int
              </th>
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
                      <td
                        className="border-2 border-slate-900 text-center"
                        rowSpan={course.room.length}
                      >
                        {course.course}
                      </td>
                    )}
                    {index === 0 && (
                      <td
                        className="border-2 border-slate-900 text-center"
                        rowSpan={course.room.length}
                      >
                        {course.initial}
                      </td>
                    )}
                    {index === 0 && (
                      <td
                        className="border-2 border-slate-900 text-center"
                        rowSpan={course.room.length}
                      >
                        {course.section}
                      </td>
                    )}
                    <td className="border-2 border-slate-900 text-center">
                      {room}
                    </td>
                    <td className="border-2 border-slate-900 text-center">
                      {course.student[index]}
                    </td>
                    {index === 0 && (
                      <td
                        className="border-2 border-slate-900 text-center"
                        rowSpan={course.room.length}
                      >
                        {course.total}
                      </td>
                    )}
                  </tr>
                );
              });
            })}
            <tr>
              <td className="border-2 border-slate-900 text-center" colSpan="5">
                Total
              </td>
              <td className="border-2 border-slate-900 text-center">{total}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => exportRoomAllocation(query, semester, examSlot, total)}
          className="btn-primary px-8 py-3 rounded-md"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default RoomAllocationTable;
