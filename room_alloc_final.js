const rooms = [
  { no: "1st room", total: 65, available: 65 },
  { no: "2nd room", total: 60, available: 60 },
  { no: "3rd room", total: 50, available: 50 },
  { no: "4th room", total: 60, available: 60 },
  { no: "5th room", total: 60, available: 60 },
];

const course = [
  { course: "1st course", student: 45 },
  { course: "2nd course", student: 45 },
  { course: "3rd course", student: 48 },
  { course: "4th course", student: 50 },
  { course: "5th course", student: 45 },
  { course: "6th course", student: 52 },
];

const req_room = [];

for (let i in course) {
  let remaining_student = Math.ceil(course[i].student / 2);
  const room_need = { course: course[i].course, room: [], student: [] };
  for (let j in rooms) {
    if (rooms[j].total !== 0 && remaining_student !== 0) {
      if (rooms[j].total > remaining_student) {
        room_need.room.push(rooms[j].no);
        room_need.student.push(remaining_student);
        rooms[j].total = rooms[j].total - remaining_student;
        remaining_student = course[i].student - remaining_student;
        course[i].student = remaining_student;
      } else {
        if (rooms[j].total >= 7) {
          course[i].student = course[i].student - rooms[j].total;
          remaining_student = course[i].student;
          room_need.room.push(rooms[j].no);
          room_need.student.push(rooms[j].total);
          rooms[j].total = 0;
        }else {
          remaining_student = course[i].student;
        }
      }
    }
  }
  req_room.push(room_need);
}

console.log(req_room);
