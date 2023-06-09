import {React, createContext, useEffect, useState} from "react";

const TeacherContext = createContext();

function TeacherContextProvider({children}){
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/teacher')
        .then(res => res.json())
        .then(data => setTeachers(data))
        .catch(err => console.log(err));
    }, []);

    return (
        <TeacherContext.Provider value={teachers}>
            {children}
        </TeacherContext.Provider>
    );
}
export {TeacherContext, TeacherContextProvider};
