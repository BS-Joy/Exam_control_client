import React, { createContext } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const RoomAllocSeatPlan = createContext();

export const RoomAllocSeatPlanProvider = ({children}) => {
    const exportRoomAllocPdf = (query, semester, examSlot, total) => {
        const doc = new jsPDF();
        console.log(examSlot)
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
    
        doc.save(
          `${query.exam_type} Term ${semester}-${new Date().getFullYear()}_${reverseDate}, Slot-${examSlot}.pdf`
        );
      };
    
    const RoomAllocSeatPlanData = {
        exportRoomAllocation: exportRoomAllocPdf
    }
    return (
        <RoomAllocSeatPlan.Provider value={RoomAllocSeatPlanData}>
            {children}
        </RoomAllocSeatPlan.Provider>
    )
}