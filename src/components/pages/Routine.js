import React from 'react';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom';
// import { TeacherContext } from '../../context/InitialContext';

const Routine = () => {
    const [teachersInitial, setTeachersInitial] = useState();
    const [slot, setSlot] = useState([]);
    const [examInfo, setExamInfo] = useState([]);

    const navigate = useNavigate();

    // for courses
    useEffect(() => {
        fetch('http://localhost:3001/courses')
        .then(res => res.json())
        .then(data => setExamInfo(data))
        .catch(err => console.log(err));
    }, [])

    let courses = []
    for(let i = 0; i < examInfo.length; i++){
        courses.push(examInfo[i].course);
    }
    // setting teacher initail
    const initialHandle = (e) => {
        e.preventDefault();

        const course = e.target.value;
        for(let i = 0; i < courses.length; i++){
            if(examInfo[i].course === course){
                setTeachersInitial(examInfo[i].initial);
            }
        }
    }


    // handling exam slot
    const midSlot = ['Slot A: 9:00 - 10:30 am', 'Slot B: 11:30 - 1:00 pm', 'Slot C: 02:00 - 3:30 pm', 'Slot D: 06:00 - 8:30 pm'];
    const finalSlot = ['Slot A: 9:00 - 11:00 am', 'Slot B: 12:00 - 2:00 pm', 'Slot C: 03:00 - 5:00 pm', 'Slot D: 6:00 - 8:00 pm'];

    const slotHandle = (e) => {
        e.preventDefault();

        const type = e.target.value;
        if (type === 'Mid') {
            setSlot(midSlot)
        }
        else if (type === 'Final') {
            setSlot(finalSlot)
        }
        else {
            setSlot([])
        }
    }
    
    // handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const date = e.target.date.value;
        const exam_type = e.target.e_type.value;
        const slot = e.target.slot.value;
        const course_code = e.target.course_code.value;
        const teacherInitial = e.target.initial.value;

        const routine = {
            date: date,
            exam_type: exam_type,
            slot: slot,
            course_code: course_code,
            teacherInitial: teacherInitial
        }

        fetch('http://localhost:3001/routine', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(routine)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        navigate('/')
    }

    return (
        <div>
            <div>
                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <Link to='/'>
                                <FaArrowLeft />
                            </Link>

                            <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data" >
                                <legend className='text-center text-3xl font-bold underline'>Add Routine</legend>
                                <div className="grid grid-cols-1 gap-4 ">
                                    {/* Date */}
                                    <div>
                                        <label className='font-medium text-gray-900'>Date:</label>
                                        <input id="date" name='date' type='date' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4" />
                                    </div>

                                    {/* mid or final */}
                                    <div>
                                        <label className='font-medium text-gray-900'>Exam Type:</label>
                                        <select id="exam_type" name='e_type' onChange={slotHandle} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4">
                                            <option defaultValue={'Choose exam type'}>Choose exam type</option>
                                            <option value='Mid'>Mid</option>
                                            <option value="Final">Final</option>
                                        </select>
                                    </div>

                                    {/* slot */}
                                    <div>
                                        <label className='font-medium text-gray-900'>Slot:</label>
                                        <select id="slot" name='slot' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4">
                                            <option defaultValue={'choose slot'}>Choose Slot</option>
                                            {

                                                slot.map((slot, index) => (
                                                    <option key={index} value={slot}>{slot}</option>
                                                ))

                                            }

                                        </select>
                                    </div>

                                    {/* course code */}
                                    <div>
                                        <label className='font-medium text-gray-900'>Course Code:</label>
                                        <select onChange={initialHandle} id="course_code" name='course_code' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5">
                                            <option defaultValue={'Choose Course Code'}>Choose Course Code</option>
                                            {
                                                courses.length > 0 ? (
                                                    courses.map((course, index) => (
                                                        <option key={index} value={course}>{course}</option>
                                                    ))
                                                ) : 'Something Wrong'
                                            }
                                        </select>
                                    </div>

                                    {/* teacher initial */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Teacher Initial:</label>
                                        <input id="initial" value={teachersInitial ? teachersInitial : 'Select Course Code First'} disabled name='initial' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4" />
                                    </div>
                                </div>
                                {/* submit button */}
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

            </div>
        </div>
    );
}

export default Routine;
