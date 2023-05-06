import React, { createContext } from "react";

export const AllocContext = createContext();

export const AllocContextProvider = ({children}) => {
    const planFunc = (pre_plan) => {
        const seatPlan = []
        for (let p in pre_plan) {
  
          // coloum seperation
          const columns = [];
          const keys = [];
    
          for (let i in pre_plan[p].room) {
            if (i.includes("column_")) {
              const columnNumber = i.replace("column_", "");
              keys.push(i);
              const obj = {};
              obj[i] = parseInt(pre_plan[p].room[i]);
              columns[columnNumber - 1] = obj;
            }
          }
    
          // seat distribution
          const seat_plan = [];
          for (let i in pre_plan[p].student) {
            if (pre_plan[p].student[i] > 0) {
              const column_info = {
                course: pre_plan[p].course[i],
                column: [],
                students: [],
              };
    
              for (let j = parseInt(i); j < columns.length; j += 2) {
                if (columns[j][keys[j]] > 0) {
                  if (pre_plan[p].student[i] > columns[j][keys[j]]) {
                    pre_plan[p].student[i] -= columns[j][keys[j]];
                    column_info.students.push(columns[j][keys[j]]);
                    column_info.column.push(keys[j]);
                    columns[j][keys[j]] = 0;
                  } else {
                    columns[j][keys[j]] -= pre_plan[p].student[i];
                    column_info.column.push(keys[j]);
                    column_info.students.push(pre_plan[p].student[i]);
                    pre_plan[p].student[i] = 0;
                  }
                }
              }
              seat_plan.push(column_info);
            }
          }
    
          for (let i in pre_plan[p].student) {
            if (pre_plan[p].student[i] > 0) {
              for (let j in columns) {
                if (columns[j][keys[j]] > 0) {
                  if (columns[j][keys[j]] > pre_plan[p].student[i]) {
                    seat_plan[i].column.push(keys[j]);
                    seat_plan[i].students.push(pre_plan[p].student[i]);
                    columns[j][keys[j]] -= pre_plan[p].student[i];
                    pre_plan[p].student[i] = 0;
                  } else {
                    seat_plan[i].column.push(keys[j]);
                    seat_plan[i].students.push(columns[j][keys[j]]);
                    pre_plan[p].student[i] -= columns[j][keys[j]];
                    columns[j][keys[j]] = 0;
                  }
                }
              }
            }
          }
    
          for (let i in seat_plan) {
            const students_length = seat_plan[i].students.length;
            if (seat_plan[i].students[students_length - 1] === 0) {
              seat_plan[i].column.pop();
              seat_plan[i].students.pop();
            }
          }
    
          // final seat plan
          const final_seat_plan = [];
          for (let i in columns) {
            const plan = {
              column: parseInt(i) + 1,
              courses: [],
              students: [],
            };
            for (let j in seat_plan) {
              for (let c in seat_plan[j].column) {
                if (seat_plan[j].column[c] === keys[i]) {
                  plan.courses.push(seat_plan[j].course);
                  plan.students.push(seat_plan[j].students[c]);
                }
              }
            }
            final_seat_plan.push(plan);
          }
  
          seatPlan.push(final_seat_plan)
          
        } // main loop end
        return seatPlan
      }
      
    return (
        <AllocContext.Provider value={planFunc}>
            {children}
        </AllocContext.Provider>
    )
}