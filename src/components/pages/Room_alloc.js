import { React, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RoomAlloc = () => {
    const [slot, setSlot] = useState([]);
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState({});
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState();

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


    // onchange handle
    const queryHandle = event => {
        const filed = event.target.name;
        const value = event.target.value;
        const newQuery = { ...query };

        newQuery[filed] = value;
        setQuery(newQuery);
    }

    // getCourse list
    const getCourse = e => {
        e.preventDefault();

        const slot = e.target.value;

        fetch(`http://localhost:3001/exams/${query.date}/${query.exam_type}/${slot}`)
            .then(res => res.json())
            .then(data => {
                const course = [];
                data.map(c => course.push(c.course_code))
                setCourses(...courses, course);
            })
    }

    // submit handling
    const submitHandle = async e => {
        e.preventDefault();

        const student = await Promise.all(courses.map(course => (
            fetch(`http://localhost:3001/students/${course}`)
                .then(res => res.json())
        )));
        const x = []
        student.map(stu => x.push(stu[0].reg_students))

        const y = x.map(str => parseInt(str));
        const total_student = y.reduce((a, b) => a+b, 0);
        setTotal(total_student)
        setStudents(...students, y);

    }

    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <Link to='/'>
                        <FaArrowLeft />
                    </Link>
                    <div>Total: {total ? total : ''}</div>
                    <form className="space-y-4" onSubmit={submitHandle}>
                        <legend className='text-center text-3xl font-bold underline'>Room Allocation</legend>
                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className='font-medium text-gray-900'>Date:</label>
                                <input onBlur={queryHandle} type='date' name='date' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4" />
                            </div>

                            {/* Exam type */}
                            <div>
                                <label className='font-medium text-gray-900'>Exam Type:</label>
                                <select onBlur={queryHandle} onMouseLeave={slotHandle} id="exam_type" name='exam_type' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4">
                                    <option defaultValue={'Choose exam type'}>Choose exam type</option>
                                    <option value='Mid'>Mid</option>
                                    <option value="Final">Final</option>
                                </select>
                            </div>

                            {/* slot */}
                            <div>
                                <label className='font-medium text-gray-900'>Slot:</label>
                                <select onChange={getCourse} id="slot" name='slot' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4">
                                    <option defaultValue='Choose Slot'>{slot.length > 0 ? 'Choose Slot' : 'Choose Exam type first'}</option>
                                    {
                                        slot.map((slot, index) => (
                                            <option key={index} value={slot}>{slot}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>

                        {/* submit */}
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
        </>
    );
}

export default RoomAlloc;
